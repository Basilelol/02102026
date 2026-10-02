import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import CookieConsent from './CookieConsent.jsx'

const navigation = [
  { to: '/chi-siamo', label: 'Chi siamo' },
  { to: '/prodotti', label: 'Prodotti' },
  { to: '/tailor-lab', label: 'Tailor Lab' },
]

function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="ONE Tech, home" onClick={() => setMenuOpen(false)}>
          <span>ONE</span><span className="wordmark-dot">.</span><span>TECH</span>
        </Link>
        <button
          className="mobile-menu-toggle icon-button"
          type="button"
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navigazione principale">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <Link className="nav-contact" to="/contatti" onClick={() => setMenuOpen(false)}>
            Parliamone <ArrowUpRight size={15} />
          </Link>
        </nav>
      </header>
      <Outlet />
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-prompt">
            <span className="eyebrow">IL PROSSIMO PASSO È SEMPLICE</span>
            <p>Hai un processo da ripensare?</p>
            <Link className="text-link" to="/tailor-lab#richiesta">
              Raccontacelo <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="footer-links">
            <div><span className="footer-label">ESPLORA</span><Link to="/chi-siamo">Chi siamo</Link><Link to="/prodotti">Prodotti</Link><Link to="/tailor-lab">Tailor Lab</Link></div>
            <div><span className="footer-label">CONTATTI</span><a href="mailto:sales@otech.one">sales@otech.one</a><span>Via Gustavo Fara 35<br />20124 Milano</span></div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ONE Tech · Milano</span>
          <div><Link to="/privacy">Privacy & cookie</Link><button type="button" onClick={() => window.dispatchEvent(new Event('onetech:cookie-settings'))}>Preferenze cookie</button></div>
          <span className="footer-signoff">Difficile? Non per noi.</span>
        </div>
      </footer>
      <CookieConsent />
    </>
  )
}

export default SiteLayout