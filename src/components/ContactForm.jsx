import { useState } from 'react'
import { ArrowRight, Check, LoaderCircle } from 'lucide-react'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(name, value) {
  const cleanValue = value.trim()
  if (name === 'name' && cleanValue.length < 2) return 'Inserisci nome e cognome.'
  if (name === 'email' && !emailPattern.test(cleanValue)) return 'Inserisci un indirizzo email valido.'
  if (name === 'company' && cleanValue.length < 2) return 'Scrivi il nome della tua azienda.'
  if (name === 'message' && cleanValue.length < 20) return 'Aggiungi qualche dettaglio in più (almeno 20 caratteri).'
  return ''
}

function ContactForm({ kind = 'contact', initialInterest = '' }) {
  const [values, setValues] = useState({ name: '', email: '', company: '', interest: initialInterest, message: '', privacy: false, website: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [delivery, setDelivery] = useState('')
  const fields = ['name', 'email', 'company', 'message']
  const copy = kind === 'project'
    ? { eyebrow: 'INIZIA UN PROGETTO', title: 'Da dove partiamo?', button: 'Invia il progetto' }
    : { eyebrow: 'CONTATTI', title: 'Parliamone.', button: 'Invia il messaggio' }

  function updateField(event) {
    const { name, value, checked, type } = event.target
    const nextValues = { ...values, [name]: type === 'checkbox' ? checked : value }
    setValues(nextValues)
    if (errors[name]) setErrors((current) => ({ ...current, [name]: validateField(name, String(nextValues[name])) }))
    if (status !== 'idle') setStatus('idle')
  }

  async function submitForm(event) {
    event.preventDefault()
    const nextErrors = Object.fromEntries(fields.map((field) => [field, validateField(field, values[field])]).filter(([, error]) => error))
    if (!values.interest) nextErrors.interest = 'Scegli l’argomento che ti interessa.'
    if (!values.privacy) nextErrors.privacy = 'Per inviare la richiesta, leggi e accetta l’informativa privacy.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setStatus('sending')
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, kind }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Invio non riuscito. Riprova tra poco.')
      setDelivery(result.delivery)
      setStatus('sent')
    } catch (error) {
      setStatus('error')
      setErrors((current) => ({ ...current, form: error.message === 'Failed to fetch' ? 'Il servizio non è raggiungibile. Riprova tra poco o scrivici via email.' : error.message }))
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span className="success-mark"><Check size={22} /></span>
        <h2>È arrivata.</h2>
        <p>{delivery === 'sent' ? 'La tua richiesta è stata inviata al team ONE Tech.' : delivery === 'email-pending' ? 'La tua richiesta è stata registrata; il team completerà il recapito email.' : 'La richiesta è stata registrata. Il recapito email è in configurazione per questa demo.'} Ti ricontatteremo all’indirizzo che hai indicato.</p>
        <button type="button" className="text-link" onClick={() => { setValues({ name: '', email: '', company: '', interest: initialInterest, message: '', privacy: false, website: '' }); setStatus('idle') }}>Invia un’altra richiesta <ArrowRight size={16} /></button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={submitForm} noValidate>
      <span className="eyebrow">{copy.eyebrow}</span>
      <h2>{copy.title}</h2>
      <p className="form-intro">Bastano pochi dettagli. Una persona del team ti risponde per capire insieme il prossimo passo.</p>
      <div className="form-grid">
        <FormField label="Nome e cognome" name="name" value={values.name} onChange={updateField} onBlur={updateField} error={errors.name} autoComplete="name" />
        <FormField label="Email di lavoro" name="email" type="email" value={values.email} onChange={updateField} onBlur={updateField} error={errors.email} autoComplete="email" />
        <FormField label="Azienda" name="company" value={values.company} onChange={updateField} onBlur={updateField} error={errors.company} autoComplete="organization" />
        <label className="form-field" htmlFor="interest">
          <span>Di cosa vuoi parlare?</span>
          <select id="interest" name="interest" value={values.interest} onChange={updateField} aria-invalid={Boolean(errors.interest)}>
            <option value="">Scegli un argomento</option>
            <option value="prodotti">Un prodotto ONE Tech</option>
            <option value="progetto">Un software o agente AI su misura</option>
            <option value="partnership">Una partnership</option>
            <option value="altro">Altro</option>
          </select>
          {errors.interest && <small className="field-error">{errors.interest}</small>}
        </label>
        <label className="form-field form-field-wide" htmlFor="message">
          <span>{kind === 'project' ? 'Quale processo vuoi migliorare?' : 'Il tuo messaggio'}</span>
          <textarea id="message" name="message" rows="4" minLength="20" maxLength="2000" value={values.message} onChange={updateField} onBlur={updateField} aria-invalid={Boolean(errors.message)} placeholder="Raccontaci il contesto, senza tecnicismi." />
          {errors.message && <small className="field-error">{errors.message}</small>}
        </label>
      </div>
      <input className="honeypot" name="website" value={values.website} onChange={updateField} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="privacy-check" htmlFor="privacy">
        <input id="privacy" name="privacy" type="checkbox" checked={values.privacy} onChange={updateField} aria-invalid={Boolean(errors.privacy)} />
        <span>Ho letto l’<a href="/privacy" target="_blank" rel="noreferrer">informativa privacy</a> e chiedo di essere ricontattato per questa richiesta.</span>
      </label>
      {errors.privacy && <small className="field-error privacy-error">{errors.privacy}</small>}
      {errors.form && <p className="form-error" role="alert">{errors.form}</p>}
      <button className="button button-dark form-submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? <><LoaderCircle className="spinner" size={17} /> Invio in corso</> : <>{copy.button} <ArrowRight size={17} /></>}
      </button>
      <p className="form-footnote">I tuoi dati vengono usati solo per rispondere. Niente newsletter, niente giri strani.</p>
    </form>
  )
}

function FormField({ label, name, type = 'text', value, onChange, onBlur, error, autoComplete }) {
  return (
    <label className="form-field" htmlFor={name}>
      <span>{label}</span>
      <input id={name} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur} autoComplete={autoComplete} maxLength={120} aria-invalid={Boolean(error)} />
      {error && <small className="field-error">{error}</small>}
    </label>
  )
}

export default ContactForm