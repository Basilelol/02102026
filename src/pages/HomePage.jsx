import { ArrowDown, ArrowRight, ArrowUpRight, Braces, FileSearch, MessageSquareText, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const flow = [
  { icon: <MessageSquareText size={18} />, label: 'Una richiesta', sub: 'arriva da ogni canale', tone: 'flow-coral' },
  { icon: <FileSearch size={18} />, label: 'Il lavoro si muove', sub: 'documenti, dati, decisioni', tone: 'flow-yellow' },
  { icon: <Sparkles size={18} />, label: 'La risposta è pronta', sub: 'alle persone giuste', tone: 'flow-blue' },
]

function WorkflowDiagram() {
  return (
    <div className="workflow-scene" aria-label="Una richiesta viene raccolta, elaborata e consegnata alla persona giusta">
      <div className="scene-topline"><span>IL FLUSSO, IN TRE MOSSE</span><span className="live-indicator"><i /> SISTEMA ATTIVO</span></div>
      <div className="workflow-track">
        {flow.map((step, index) => (
          <div
            className={`flow-node ${step.tone}`}
            key={step.label}
            style={{ '--flow-index': index }}
          >
            <span className="flow-icon">{step.icon}</span>
            <strong>{step.label}</strong>
            <small>{step.sub}</small>
            {index < flow.length - 1 && <span className="flow-arrow" aria-hidden="true"><ArrowRight size={17} /></span>}
          </div>
        ))}
      </div>
      <div className="scene-footline"><span><Braces size={14} /> SOFTWARE CHE SI ADATTA AL TUO LAVORO</span><span>NON IL CONTRARIO ↗</span></div>
      <span className="scene-index">OT / 001</span>
    </div>
  )
}

function HomePage() {
  return (
    <main>
      <section className="home-hero page-gutter">
        <div className="hero-copy">
          <span className="eyebrow"><i className="eyebrow-dot" /> TECNOLOGIA FATTA PER LE PERSONE</span>
          <h1>Il tuo lavoro<br />ha un <span>modo migliore.</span></h1>
          <p>Software, intelligenza artificiale e automazioni disegnati intorno a come lavora davvero la tua azienda.</p>
          <div className="hero-actions"><Link className="button button-dark" to="/tailor-lab">Partiamo da un’idea <ArrowRight size={17} /></Link><Link className="text-link" to="/prodotti">Esplora i prodotti <ArrowUpRight size={16} /></Link></div>
          <a className="scroll-cue" href="#come-lavoriamo"><ArrowDown size={15} /> SCOPRI COME</a>
        </div>
        <WorkflowDiagram />
        <div className="hero-stamp" aria-hidden="true"><span>SU<br />MISURA</span><span>°</span></div>
      </section>

      <section className="belief-band page-gutter" id="come-lavoriamo">
        <span className="eyebrow">LA NOSTRA IDEA, IN UNA RIGA</span>
        <h2>Il software deve seguire il lavoro.<br /><span>Non il contrario.</span></h2>
        <p>Partiamo da quello che oggi rallenta il tuo team. Poi progettiamo la tecnologia perché si inserisca nei processi, negli strumenti e nelle abitudini che già esistono.</p>
        <Link className="text-link" to="/chi-siamo">Conosci ONE Tech <ArrowRight size={16} /></Link>
      </section>

      <section className="products-preview page-gutter">
        <div className="section-heading"><div><span className="eyebrow">UN MOTORE, PIÙ POSSIBILITÀ</span><h2>Strumenti con un lavoro<br />ben preciso.</h2></div><Link className="text-link" to="/prodotti">Tutti i prodotti <ArrowUpRight size={17} /></Link></div>
        <div className="product-rail">
          <Link className="product-row" to="/prodotti#kore"><span className="product-number">01</span><span className="product-name">KORE</span><span className="product-desc">Credito, dall’inizio alla firma.</span><span className="product-category">FINTECH</span><ArrowUpRight size={19} /></Link>
          <Link className="product-row" to="/prodotti#argo"><span className="product-number">02</span><span className="product-name">ARGO</span><span className="product-desc">I documenti diventano dati.</span><span className="product-category">DOCUMENT INTELLIGENCE</span><ArrowUpRight size={19} /></Link>
          <Link className="product-row" to="/prodotti#allmessage"><span className="product-number">03</span><span className="product-name">ALL MESSAGE</span><span className="product-desc">Una chat, ogni canale.</span><span className="product-category">CONVERSAZIONI</span><ArrowUpRight size={19} /></Link>
          <Link className="product-row" to="/prodotti#milo"><span className="product-number">04</span><span className="product-name">MILO</span><span className="product-desc">Un agente AI, dalla parte del cliente.</span><span className="product-category">AI AGENT</span><ArrowUpRight size={19} /></Link>
        </div>
      </section>

      <section className="closing-band page-gutter"><span className="eyebrow">NON SERVE AVERE GIÀ LA RISPOSTA</span><h2>Portaci il problema.<br />Il resto lo costruiamo insieme.</h2><Link className="button button-paper" to="/contatti">Parliamo del tuo progetto <ArrowRight size={17} /></Link><span className="closing-mark" aria-hidden="true">OT.</span></section>
    </main>
  )
}

export default HomePage