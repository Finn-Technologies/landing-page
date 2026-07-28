import {
  hasReportingEnvironment,
  json,
  redis,
} from './_reporting.js'

export default {
  async fetch(request) {
    if (request.method !== 'GET') {
      return json({ error: 'Method not allowed' }, 405)
    }
    if (!hasReportingEnvironment()) {
      return json({ status: 'unconfigured' }, 503)
    }
    try {
      const result = await redis(['PING'])
      return result === 'PONG'
        ? json({ status: 'ok' })
        : json({ status: 'unavailable' }, 503)
    } catch (error) {
      console.error('Finn AI reporting health check failed', error)
      return json({ status: 'unavailable' }, 503)
    }
  },
}
