const allowedCategories = new Set([
  'harmfulOrDangerous',
  'hateOrHarassment',
  'sexualContent',
  'childSafety',
  'selfHarm',
  'illegalOrDeceptive',
  'falseOrMisleading',
  'other',
])

const allowedFields = new Set([
  'reportId',
  'category',
  'assistantResponse',
  'timestamp',
  'appVersion',
  'modelTier',
  'userPrompt',
  'additionalDetails',
])

export const reportRetentionSeconds = 30 * 24 * 60 * 60

export function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

export function hasReportingEnvironment() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim()
      && process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
      && process.env.RATE_LIMIT_SALT?.trim(),
  )
}

export async function redis(command) {
  const response = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  })
  const body = await response.json()
  if (!response.ok || body.error) {
    throw new Error(body.error || `Redis returned HTTP ${response.status}`)
  }
  return body.result
}

export async function hashRateLimitKey(request) {
  const forwarded = request.headers.get('x-forwarded-for') || ''
  const ip = forwarded.split(',')[0].trim()
    || request.headers.get('x-real-ip')
    || 'unknown'
  const hour = new Date().toISOString().slice(0, 13)
  const source = new TextEncoder().encode(
    `${ip}:${process.env.RATE_LIMIT_SALT}:${hour}`,
  )
  const digest = await crypto.subtle.digest('SHA-256', source)
  const hash = [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
  return `ratelimit:${hash}`
}

export function validateReport(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Payload must be a JSON object'
  }
  const unknownField = Object.keys(body).find((key) => !allowedFields.has(key))
  if (unknownField) return `Unknown field '${unknownField}'`

  if (
    typeof body.reportId !== 'string'
    || body.reportId.length > 100
    || !/^[a-zA-Z0-9_-]+$/.test(body.reportId)
  ) return 'Invalid or missing reportId'
  if (!allowedCategories.has(body.category)) return 'Invalid report category'
  if (
    typeof body.assistantResponse !== 'string'
    || !body.assistantResponse.trim()
    || body.assistantResponse.length > 4000
  ) return 'Invalid assistantResponse'
  if (
    typeof body.appVersion !== 'string'
    || !body.appVersion.trim()
    || body.appVersion.length > 50
  ) return 'Invalid appVersion'
  if (
    typeof body.modelTier !== 'string'
    || !body.modelTier.trim()
    || body.modelTier.length > 100
  ) return 'Invalid modelTier'
  if (
    body.userPrompt !== undefined
    && (typeof body.userPrompt !== 'string' || body.userPrompt.length > 2000)
  ) return 'Invalid userPrompt'
  if (
    body.additionalDetails !== undefined
    && (
      typeof body.additionalDetails !== 'string'
      || body.additionalDetails.length > 1000
    )
  ) return 'Invalid additionalDetails'

  const timestamp = Date.parse(body.timestamp)
  if (!Number.isFinite(timestamp)) return 'Invalid timestamp'
  const now = Date.now()
  if (timestamp < now - 7 * 24 * 60 * 60 * 1000 || timestamp > now + 5 * 60 * 1000) {
    return 'Timestamp is outside the accepted range'
  }
  return null
}
