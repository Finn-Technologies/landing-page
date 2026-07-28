import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'

import healthHandler from '../api/health.js'
import reportHandler from '../api/reports.js'

const originalFetch = globalThis.fetch
const originalEnvironment = {
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
  salt: process.env.RATE_LIMIT_SALT,
}

afterEach(() => {
  globalThis.fetch = originalFetch
  restoreEnvironment('UPSTASH_REDIS_REST_URL', originalEnvironment.url)
  restoreEnvironment('UPSTASH_REDIS_REST_TOKEN', originalEnvironment.token)
  restoreEnvironment('RATE_LIMIT_SALT', originalEnvironment.salt)
})

function restoreEnvironment(name, value) {
  if (value === undefined) delete process.env[name]
  else process.env[name] = value
}

function configureEnvironment() {
  process.env.UPSTASH_REDIS_REST_URL = 'https://redis.example.test'
  process.env.UPSTASH_REDIS_REST_TOKEN = 'secret-token'
  process.env.RATE_LIMIT_SALT = 'long-random-test-salt'
}

test('health is fail-closed without storage configuration', async () => {
  delete process.env.UPSTASH_REDIS_REST_URL
  delete process.env.UPSTASH_REDIS_REST_TOKEN
  delete process.env.RATE_LIMIT_SALT

  const response = await healthHandler.fetch(
    new Request('https://finn-org.vercel.app/health'),
  )

  assert.equal(response.status, 503)
  assert.deepEqual(await response.json(), { status: 'unconfigured' })
})

test('health verifies the Redis connection', async () => {
  configureEnvironment()
  globalThis.fetch = async () => Response.json({ result: 'PONG' })

  const response = await healthHandler.fetch(
    new Request('https://finn-org.vercel.app/health'),
  )

  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { status: 'ok' })
})

test('reporting rejects unknown payload fields before storage', async () => {
  configureEnvironment()
  let storageCalled = false
  globalThis.fetch = async () => {
    storageCalled = true
    return Response.json({ result: 'OK' })
  }

  const response = await reportHandler.fetch(new Request(
    'https://finn-org.vercel.app/v1/reports',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reportId: 'report_invalid',
        category: 'other',
        assistantResponse: 'Response',
        timestamp: new Date().toISOString(),
        appVersion: '1.0.0',
        modelTier: 'Bonsai 1.7B',
        unexpected: true,
      }),
    },
  ))

  assert.equal(response.status, 400)
  assert.equal(storageCalled, false)
})

test('valid reports are rate-limited and stored with expiry', async () => {
  configureEnvironment()
  const commands = []
  globalThis.fetch = async (_url, options) => {
    const command = JSON.parse(options.body)
    commands.push(command)
    if (command[0] === 'INCR') return Response.json({ result: 1 })
    return Response.json({ result: 'OK' })
  }

  const response = await reportHandler.fetch(new Request(
    'https://finn-org.vercel.app/v1/reports',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '203.0.113.10',
      },
      body: JSON.stringify({
        reportId: 'report_valid',
        category: 'falseOrMisleading',
        assistantResponse: 'Reported response',
        timestamp: new Date().toISOString(),
        appVersion: '1.0.0',
        modelTier: 'Bonsai 1.7B',
      }),
    },
  ))

  assert.equal(response.status, 201)
  assert.deepEqual(await response.json(), {
    success: true,
    reportId: 'report_valid',
  })
  assert.equal(commands[0][0], 'INCR')
  assert.equal(commands[1][0], 'EXPIRE')
  assert.equal(commands[2][0], 'SET')
  assert.equal(commands[2][3], 'NX')
  assert.equal(commands[2][4], 'EX')
  assert.equal(commands[2][5], 2592000)
})
