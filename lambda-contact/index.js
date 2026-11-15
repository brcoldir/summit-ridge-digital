const ALLOWED_FIELDS = new Set([
  'name', 'email', 'business', 'phone', 'message', 'source', 'attribution', 'website', 'submission_id'
])
const ATTRIBUTION_FIELDS = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'landing_path', 'referrer'
])
const DEFAULT_ORIGINS = new Set([
  'https://summitridgedigital.com',
  'https://www.summitridgedigital.com',
])
const LOCALHOST_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4174',
]
let sesClient
let SendEmailCommand

function configuredOrigins() {
  const configured = [process.env.ALLOW_ORIGIN, process.env.ALLOWED_ORIGINS]
    .filter(Boolean)
    .flatMap((value) => value.split(','))
    .map((value) => value.trim())
    .filter(Boolean)
  const localhost = process.env.ALLOW_LOCALHOST_ORIGINS === 'true' ? LOCALHOST_ORIGINS : []
  return new Set([...DEFAULT_ORIGINS, ...localhost, ...configured])
}

function corsHeaders(origin) {
  if (!origin || !configuredOrigins().has(origin)) return {}
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    Vary: 'Origin',
  }
}

function response(statusCode, body, origin) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin),
    },
    body: body === undefined ? '' : JSON.stringify(body),
  }
}

function header(headers, name) {
  const match = Object.entries(headers || {}).find(([key]) => key.toLowerCase() === name)
  return match?.[1]
}

function boundedString(value, label, maxLength, required = false, allowNewlines = false) {
  if (value == null || value === '') {
    return required ? { error: `${label} is required` } : { value: '' }
  }
  if (typeof value !== 'string') return { error: `${label} must be text` }
  const trimmed = value.trim()
  if (!trimmed && required) return { error: `${label} is required` }
  if (trimmed.length > maxLength) return { error: `${label} is too long` }
  if (!allowNewlines && /[\r\n]/.test(trimmed)) return { error: `${label} contains invalid characters` }
  return { value: trimmed }
}

function validateLead(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { ok: false, error: 'Invalid request body' }
  for (const key of Object.keys(body)) {
    if (!ALLOWED_FIELDS.has(key)) return { ok: false, error: `Unrecognized field: ${key}` }
  }

  const name = boundedString(body.name, 'Name', 200, true)
  const email = boundedString(body.email, 'Email', 320, true)
  const business = boundedString(body.business, 'Business', 500)
  const phone = boundedString(body.phone, 'Phone', 100)
  const message = boundedString(body.message, 'Message', 5000, true, true)
  const source = boundedString(body.source, 'Source', 500, true)
  const website = boundedString(body.website, 'Website', 500)
  const submissionId = boundedString(body.submission_id, 'Submission ID', 200, true)
  for (const field of [name, email, business, phone, message, source, website, submissionId]) {
    if (field.error) return { ok: false, error: field.error }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return { ok: false, error: 'Email is invalid' }
  if (!/^lead_[a-z0-9][a-z0-9_-]{7,199}$/i.test(submissionId.value)) return { ok: false, error: 'Submission ID is invalid' }

  const attribution = {}
  if (body.attribution != null) {
    if (typeof body.attribution !== 'object' || Array.isArray(body.attribution)) return { ok: false, error: 'Attribution must be an object' }
    for (const [key, value] of Object.entries(body.attribution)) {
      if (!ATTRIBUTION_FIELDS.has(key)) return { ok: false, error: `Unrecognized attribution field: ${key}` }
      const normalized = boundedString(value, `Attribution ${key}`, 500)
      if (normalized.error) return { ok: false, error: normalized.error }
      if (normalized.value) attribution[key] = normalized.value
    }
  }

  return {
    ok: true,
    lead: {
      name: name.value,
      email: email.value,
      business: business.value,
      phone: phone.value,
      message: message.value,
      source: source.value,
      website: website.value,
      // Correlation only. Durable deduplication belongs to the upcoming lead-store task.
      submissionId: submissionId.value,
      attribution,
    },
  }
}

function emailText(lead) {
  const attribution = Object.entries(lead.attribution)
    .map(([key, value]) => `${key}: ${value}`)
  return [
    `Name: ${lead.name}`,
    `Business: ${lead.business || '-'}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || '-'}`,
    `Source: ${lead.source}`,
    `Submission ID: ${lead.submissionId}`,
    '',
    'Attribution:',
    ...(attribution.length ? attribution : ['-']),
    '',
    'Message:',
    lead.message,
  ].join('\n')
}

function sesDependencies() {
  if (!sesClient || !SendEmailCommand) {
    const ses = require('@aws-sdk/client-ses')
    sesClient = sesClient || new ses.SESClient({ region: process.env.AWS_REGION })
    SendEmailCommand = SendEmailCommand || ses.SendEmailCommand
  }
  return { sesClient, SendEmailCommand }
}

async function sendLeadEmail(lead) {
  const ses = sesDependencies()
  const subject = `New Summit Ridge Digital lead: ${lead.name}${lead.business ? ` (${lead.business})` : ''}`
  const command = new ses.SendEmailCommand({
    Destination: { ToAddresses: [process.env.TO_EMAIL] },
    Message: {
      Subject: { Data: subject, Charset: 'UTF-8' },
      Body: { Text: { Data: emailText(lead), Charset: 'UTF-8' } },
    },
    Source: process.env.FROM_EMAIL,
    ReplyToAddresses: [lead.email],
  })
  await ses.sesClient.send(command)
}

function requestMethod(event) {
  return event.requestContext?.http?.method || event.httpMethod || 'POST'
}

function isJsonContentType(value) {
  return typeof value === 'string' && /^application\/json(?:\s*;|\s*$)/i.test(value)
}

async function handler(event) {
  const origin = header(event.headers, 'origin')
  const originAllowed = !origin || configuredOrigins().has(origin)
  if (!originAllowed) return response(403, { ok: false, error: 'Origin not allowed' }, origin)

  const method = requestMethod(event)
  if (method === 'OPTIONS') return response(204, undefined, origin)
  if (method !== 'POST') return response(405, { ok: false, error: 'Method not allowed' }, origin)
  if (!isJsonContentType(header(event.headers, 'content-type'))) {
    return response(415, { ok: false, error: 'Content-Type must be application/json' }, origin)
  }

  let body
  try {
    body = event.body ? JSON.parse(event.body) : {}
  } catch {
    return response(400, { ok: false, error: 'Invalid JSON body' }, origin)
  }
  const result = validateLead(body)
  if (!result.ok) return response(400, { ok: false, error: result.error }, origin)
  if (result.lead.website) return response(200, { ok: true }, origin)

  try {
    await sendLeadEmail(result.lead)
    return response(200, { ok: true }, origin)
  } catch (error) {
    console.error('[contact] send error:', error instanceof Error ? error.message : String(error))
    return response(500, { ok: false, error: 'Server error' }, origin)
  }
}

exports.handler = handler
exports.validateLead = validateLead
exports.corsHeaders = corsHeaders
exports.emailText = emailText
