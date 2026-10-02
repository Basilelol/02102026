import { ArrowDown, ArrowRight, Compass, DraftingCompass, Rocket } from 'lucide-react'
import ContactForm from '../components/ContactForm.jsx'

const steps = [
  { icon: <Compass size={19} />, number: '01', title: 'Ascoltiamo', text: 'Capire il lavoro, le persone coinvolte e ciò che oggi fa perdere tempo.' },
  { icon: <DraftingCompass size={19} />, number: '02', title: 'Disegniamo', text: 'Definire insieme la soluzione più utile, prima di scrivere codice.' },
  { icon: <Rocket size={19} />, number: '03', title: 'Costruiamo', text: 'Sviluppare, integrare e migliorare lo strumento nel suo contesto reale.' },
]

function TailorLabPage() {
  return (
    <main className="inner-page tailor-page">
      <section className="page-intro tailor-intro page-gutter"><span className="eyebrow">ONE TECH / TAILOR LAB</span><span className="tailor-stamp">UN LABORATORIO<br />PER IDEE CONCRETE</span><h1>La tecnologia<br />ti sta <span>stretta?</span></h1><p>Tailor Lab è il laboratorio di ONE Tech: trasformiamo un problema operativo in software o agenti AI fatti per il tuo modo di lavorare.</p><a href="#processo" className="text-link">Guarda il percorso <ArrowDown size={16} /></a></section>
      <section className="tailor-process page-gutter" id="processo"><div className="section-heading"><div><span className="eyebrow">UN PERCORSO CHIARO</span><h2>Da un problema<br />a qualcosa che funziona.</h2></div><p>Non devi arrivare con una specifica tecnica. Ci bastano il contesto e le persone che conoscono il lavoro.</p></div><div className="process-list">{steps.map((step) => <article key={step.number} className="process-row"><span className="principle-icon">{step.icon}</span><span className="product-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p><ArrowRight className="process-arrow" size={18} /></article>)}</div></section>
      <section className="project-intake page-gutter" id="richiesta"><div className="intake-aside"><span className="eyebrow">IL PRIMO PASSO</span><h2>Spiegacelo<br />come lo spiegheresti<br />a un collega.</h2><p>Una persona del team leggerà la richiesta e ti ricontatterà per una prima conversazione, senza impegno.</p><span className="intake-note">NESSUNA SPECIFICA TECNICA RICHIESTA ↗</span></div><ContactForm kind="project" /></section>
    </main>
  )
}

export default TailorLabPage