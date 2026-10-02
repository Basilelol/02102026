import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CONSENT_KEY = 'onetech-cookie-consent-v1'

function readConsent() {
  try {
    return JSON.parse(window.localStorage.getItem(CONSENT_KEY) || 'null')
  } catch {
    return null
  }
}

function CookieConsent() {
  const [choice, setChoice] = useState(readConsent)
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const [analytics, setAnalytics] = useState(() => readConsent()?.analytics === true)

  useEffect(() => {
    const openPreferences = () => setPreferencesOpen(true)
    window.addEventListener('onetech:cookie-settings', openPreferences)
    return () => window.removeEventListener('onetech:cookie-settings', openPreferences)
  }, [])

  function saveConsent(allowAnalytics) {
    const savedChoice = {
      necessary: true,
      analytics: allowAnalytics,
      updatedAt: new Date().toISOString(),
    }

    try { window.localStorage.setItem(CONSENT_KEY, JSON.stringify(savedChoice)) } catch { /* The choice still applies for this visit. */ }
    setChoice(savedChoice)
    setAnalytics(allowAnalytics)
    setPreferencesOpen(false)
  }

  return (
    <>
      {!choice && !preferencesOpen && (
        <aside className="cookie-banner" aria-label="Preferenze cookie">
          <div className="cookie-copy">
            <span className="eyebrow">UNA SCELTA, LA TUA</span>
            <p>Usiamo solo ciò che serve a far funzionare il sito. Nessun tracciamento è attivo.</p>
            <Link to="/privacy">Leggi privacy e cookie</Link>
          </div>
          <div className="cookie-actions">
            <button className="button button-quiet" type="button" onClick={() => saveConsent(false)}>Solo necessari</button>
            <button className="button button-dark" type="button" onClick={() => saveConsent(true)}>Accetta tutti</button>
            <button className="cookie-settings" type="button" onClick={() => setPreferencesOpen(true)}>Personalizza</button>
          </div>
        </aside>
      )}
      {preferencesOpen && (
        <div className="preferences-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPreferencesOpen(false)
        }}>
          <section className="preferences-panel" role="dialog" aria-modal="true" aria-labelledby="preferences-title">
            <span className="eyebrow">PREFERENZE</span>
            <h2 id="preferences-title">Decidi tu, con calma.</h2>
            <p>I cookie necessari mantengono attiva la scelta. In questa versione non carichiamo strumenti di analisi.</p>
            <div className="preference-row"><span><strong>Necessari</strong><small>Memorizzano la tua scelta. Sempre attivi.</small></span><span className="always-on">Sempre attivi</span></div>
            <label className="preference-row" htmlFor="analytics-consent"><span><strong>Analisi</strong><small>Misurazione anonima, solo se attivata.</small></span><input id="analytics-consent" type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /></label>
            <div className="preferences-actions"><button className="button button-quiet" type="button" onClick={() => saveConsent(false)}>Rifiuta opzionali</button><button className="button button-dark" type="button" onClick={() => saveConsent(analytics)}>Salva scelta</button></div>
          </section>
        </div>
      )}
    </>
  )
}

export default CookieConsent