import { ArrowRight, ArrowUpRight, Scissors, Target, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'

const principles = [
  { icon: <Target size={19} />, title: 'Partiamo dal perché', text: 'Prima di scegliere una tecnologia, capiamo quale lavoro deve fare e per chi.' },
  { icon: <Wrench size={19} />, title: 'Ci adattiamo al contesto', text: 'Ci integriamo con gli strumenti presenti, senza chiedere all’azienda di ricominciare da zero.' },
  { icon: <Scissors size={19} />, title: 'Costruiamo su misura', text: 'Quando il prodotto giusto non esiste, lo progettiamo insieme a chi quel lavoro lo fa ogni giorno.' },
]

function AboutPage() {
  return (
    <main className="inner-page">
      <section className="page-intro page-gutter">
        <span className="eyebrow">ONE TECH / CHI SIAMO</span>
        <h1>Nessun business<br />è <span>uguale a un altro.</span></h1>
        <p>Per questo il software non dovrebbe costringere tutti a lavorare allo stesso modo.</p>
      </section>
      <section className="about-manifesto page-gutter">
        <div className="manifesto-index">01 — 03<br />IL NOSTRO PUNTO DI PARTENZA</div>
        <div><h2>Prima le persone.<br />Poi la tecnologia.</h2><p>ONE Tech progetta software, agenti AI e automazioni per problemi concreti. Non iniziamo da una lista di funzionalità: ascoltiamo chi svolge il lavoro, osserviamo i passaggi e cerchiamo il punto in cui un processo può diventare più semplice.</p><p>Il risultato può essere un prodotto già pronto, integrato nel tuo ecosistema, o uno strumento creato apposta. La tecnologia cambia. Il punto di partenza resta il tuo lavoro.</p></div>
      </section>
      <section className="principles-section page-gutter"><span className="eyebrow">COME LAVORIAMO</span><h2>Tre cose che non<br />mettiamo in discussione.</h2><div className="principles-list">{principles.map((item, index) => <article className="principle-row" key={item.title}><span className="principle-icon">{item.icon}</span><span className="product-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
      <section className="about-cta page-gutter"><div><span className="eyebrow">IL LABORATORIO DI ONE TECH</span><h2>La tecnologia<br />prende forma in Tailor Lab.</h2></div><Link className="button button-dark" to="/tailor-lab">Scopri come funziona <ArrowRight size={17} /></Link></section>
      <div className="page-end-note"><span>ONE TECH · MILANO</span><a href="https://www.linkedin.com/company/otech-one/" target="_blank" rel="noreferrer">Seguici su LinkedIn <ArrowUpRight size={14} /></a></div>
    </main>
  )
}

export default AboutPage