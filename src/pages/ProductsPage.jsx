import { useEffect } from 'react'
import { ArrowRight, ArrowUpRight, ScanText, MessagesSquare, Bot, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'

const products = [
  { id: 'kore', number: '01', icon: <Workflow size={20} />, type: 'CREDITO · FINTECH', name: 'KORE', headline: 'Non serve nascere fintech. Basta KORE.', description: 'Un ecosistema plug and play per agenti e mediatori creditizi. Coordina l’intero percorso della richiesta di prestito, dal primo contatto alla gestione della pratica.', detail: 'Per chi gestisce il credito al consumo', tone: 'product-coral' },
  { id: 'argo', number: '02', icon: <ScanText size={20} />, type: 'DOCUMENT INTELLIGENCE', name: 'ARGO', headline: 'Legge. Estrae. Da solo.', description: 'Trasforma documenti eterogenei in dati strutturati secondo le esigenze del tuo business. Si collega al gestionale o al CRM, oppure si usa via WebApp.', detail: 'Per i team che lavorano con molti documenti', tone: 'product-yellow' },
  { id: 'allmessage', number: '03', icon: <MessagesSquare size={20} />, type: 'CONVERSAZIONI', name: 'ALL MESSAGE', headline: 'Ogni canale. Una sola conversazione.', description: 'Riunisce WhatsApp, Instagram, Facebook ed email in un unico spazio, così il contesto resta con il cliente anche quando cambia canale.', detail: 'Per i team che parlano con i clienti ogni giorno', tone: 'product-blue' },
  { id: 'milo', number: '04', icon: <Bot size={20} />, type: 'AI AGENT', name: 'MILO', headline: 'Parla con i clienti. E porta risultati.', description: 'Un agente AI che dialoga con i clienti, raccoglie le informazioni necessarie e li accompagna nel percorso, lasciando al team conversazioni pronte da gestire.', detail: 'Per automatizzare conversazioni e passaggi ripetitivi', tone: 'product-violet' },
]

function ProductsPage() {
  useEffect(() => {
    const productId = window.location.hash.slice(1)
    if (productId) document.getElementById(productId)?.scrollIntoView()
  }, [])

  return (
    <main className="inner-page products-page">
      <section className="page-intro page-gutter"><span className="eyebrow">ONE TECH / PRODOTTI</span><h1>Il motore è uno.<br /><span>La forma cambia.</span></h1><p>Quattro strumenti, ognuno costruito per togliere attrito da un lavoro reale.</p></section>
      <nav className="product-index page-gutter" aria-label="Indice prodotti">{products.map((product) => <a key={product.id} href={`#${product.id}`}><span>{product.number}</span>{product.name}<ArrowUpRight size={15} /></a>)}</nav>
      <div className="product-detail-list">{products.map((product) => <article className={`product-detail ${product.tone}`} id={product.id} key={product.id}>
        <div className="product-detail-top"><span className="product-number">{product.number} / 04</span><span className="product-detail-type">{product.icon}{product.type}</span></div>
        <div className="product-detail-content"><div><span className="eyebrow">{product.detail}</span><h2>{product.headline}</h2></div><p>{product.description}</p></div>
        <div className="product-detail-bottom"><span className="product-wordmark">{product.name}</span><Link to={`/contatti?argomento=${product.id}`} aria-label={`Chiedi informazioni su ${product.name}`}>Parliamone <ArrowRight size={16} /></Link></div>
      </article>)}</div>
      <section className="tailor-callout page-gutter"><div><span className="eyebrow">E SE IL PRODOTTO NON ESISTE ANCORA?</span><h2>Lo disegniamo<br />insieme a te.</h2></div><Link className="button button-dark" to="/tailor-lab">Entra in Tailor Lab <ArrowRight size={17} /></Link></section>
    </main>
  )
}

export default ProductsPage