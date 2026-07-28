import {
  hasReportingEnvironment,
  hashRateLimitKey,
  json,
  redis,
  reportRetentionSeconds,
  validateReport,
} from './_reporting.js'

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405)
    }
    if (!hasReportingEnvironment()) {
      return json({ error: 'Reporting service is not configured' }, 503)
    }
    if (!(request.headers.get('content-type') || '').includes('application/json')) {
      return json({ error: 'Content-Type must be application/json' }, 400)
    }
    const declaredLength = Number(request.headers.get('content-length') || 0)
    if (declaredLength > 64 * 1024) {
      return json({ error: 'Payload is too large' }, 413)
    }

    try {
      const rawBody = await request.text()
      if (rawBody.length > 64 * 1024) {
        return json({ error: 'Payload is too large' }, 413)
      }
      const body = JSON.parse(rawBody)
      const validationError = validateReport(body)
      if (validationError) return json({ error: validationError }, 400)

      const rateKey = await hashRateLimitKey(request)
      const count = Number(await redis(['INCR', rateKey]))
      if (count === 1) await redis(['EXPIRE', rateKey, 3700])
      if (count > 10) {
        return json({ error: 'Too many reports. Try again later.' }, 429)
      }

      const report = {
        ...body,
        userPrompt: body.userPrompt || null,
        additionalDetails: body.additionalDetails || null,
        serverReceivedAt: new Date().toISOString(),
      }
      const stored = await redis([
        'SET',
        `report:${body.reportId}`,
        JSON.stringify(report),
        'NX',
        'EX',
        reportRetentionSeconds,
      ])
      if (stored !== 'OK') {
        return json({ error: 'A report with this ID already exists' }, 409)
      }
      return json({ success: true, reportId: body.reportId }, 201)
    } catch (error) {
      console.error('Finn AI report submission failed', error)
      return json({ error: 'The report could not be stored' }, 500)
    }
  },
}
