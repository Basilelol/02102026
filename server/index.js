import { randomUUID } from 'node:crypto'
import { appendFile, mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import express from 'express'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
try {
  process.loadEnvFile(path.resolve(currentDirectory, '..', '.env'))
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}

const dataDirectory = path.join(currentDirectory, 'data')
const requestsFile = path.join(dataDirectory, 'requests.ndjson')
const retentionMs = 90 * 24 * 60 * 60 * 1000
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const allowedInterests = new Set(['prodotti', 'progetto', 'partnership', 'altro'])
const app = express()

app.disable('x-powered-by')
app.use(express.json({ limit: '20kb' }))
app.use('/api/requests', rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: 'draft-8', legacyHeaders: false }))
app.use('/api/requests', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_request, response) => response.status(429).json({ message: 'Hai inviato troppe richieste. Riprova tra 15 minuti.' }),
}))

app.get('/api/health', (_request, response) => response.json({ status: 'ok' }))

app.post('/api/requests', async (request, response) => {
  const body = request.body || {}
  if (typeof body.website === 'string' && body.website.trim()) {
    return response.status(200).json({ ok: true, delivery: 'saved' })
  }

  const fields = ['name', 'email', 'company', 'interest', 'message']
  const values = Object.fromEntries(fields.map((field) => [field, typeof body[field] === 'string' ? body[field].trim() : '']))
  const errors = {}

  if (values.name.length < 2 || values.name.length > 120) errors.name = 'Controlla il nome inserito.'
  if (values.email.length > 254 || !emailPattern.test(values.email)) errors.email = 'Inserisci un indirizzo email valido.'
  if (values.company.length < 2 || values.company.length > 120) errors.company = 'Controlla il nome dell’azienda.'
  if (!allowedInterests.has(values.interest)) errors.interest = 'Scegli un argomento valido.'
  if (values.message.length < 20 || values.message.length > 2000) errors.message = 'Il messaggio deve contenere da 20 a 2000 caratteri.'
  if (body.privacy !== true) errors.privacy = 'È necessario confermare la presa visione dell’informativa.'
  if (!['contact', 'project'].includes(body.kind)) errors.kind = 'Tipo di richiesta non valido.'

  if (Object.keys(errors).length) {
    return response.status(400).json({ message: 'Controlla i campi evidenziati e riprova.', errors })
  }

  const savedRequest = {
    id: randomUUID(),
    ...values,
    kind: body.kind,
    privacyConfirmedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }

  try {
    await mkdir(dataDirectory, { recursive: true })
    await appendFile(requestsFile, `${JSON.stringify(savedRequest)}\n`, { encoding: 'utf8', mode: 0o600 })
  } catch (error) {
    console.error('Could not save contact request:', error.message)
    return response.status(500).json({ message: 'Non è stato possibile registrare la richiesta. Riprova più tardi.' })
  }

  let delivery = 'saved'
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
    const recipient = values.interest === 'partnership'
      ? (process.env.PARTNERSHIPS_EMAIL || 'partnerships@otech.one')
      : (process.env.CONTACT_EMAIL || 'sales@otech.one')

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || SMTP_USER,
        to: recipient,
        replyTo: values.email,
        subject: `[ONE Tech] ${body.kind === 'project' ? 'Nuovo progetto' : 'Nuovo contatto'} · ${values.interest}`,
        text: `Nome: ${values.name}\nAzienda: ${values.company}\nEmail: ${values.email}\nArgomento: ${values.interest}\nTipo: ${body.kind}\n\n${values.message}`,
      })
      delivery = 'sent'
    } catch (error) {
      delivery = 'email-pending'
      console.error('Request saved but email delivery failed:', error.message)
    }
  }

  return response.status(201).json({ ok: true, id: savedRequest.id, delivery })
})

async function pruneExpiredRequests() {
  try {
    const contents = await readFile(requestsFile, 'utf8')
    const cutoff = Date.now() - retentionMs
    const activeRequests = contents.split('\n').filter(Boolean).flatMap((line) => {
      try {
        const entry = JSON.parse(line)
        return Date.parse(entry.createdAt) >= cutoff ? [JSON.stringify(entry)] : []
      } catch {
        return []
      }
    })
    const temporaryFile = `${requestsFile}.tmp`
    await writeFile(temporaryFile, activeRequests.length ? `${activeRequests.join('\n')}\n` : '', { encoding: 'utf8', mode: 0o600 })
    await rename(temporaryFile, requestsFile)
  } catch (error) {
    if (error.code !== 'ENOENT') console.error('Could not apply request retention:', error.message)
  }
}

const port = Number(process.env.PORT || 3001)
await mkdir(dataDirectory, { recursive: true })
await pruneExpiredRequests()
setInterval(() => { pruneExpiredRequests() }, 24 * 60 * 60 * 1000).unref()
app.listen(port, () => console.log(`ONE Tech contact API listening on http://localhost:${port}`))