import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import ContactForm from '../components/ContactForm.jsx'

function ContactPage() {
  const [searchParams] = useSearchParams()
  const topic = searchParams.get('argomento')
  const initialInterest = topic === 'partnership' ? 'partnership' : topic ? 'prodotti' : ''
  return (
    <main className="inner-page contact-page">
      <section className="page-intro page-gutter"><span className="eyebrow">ONE TECH / CONTATTI</span><h1>Come possiamo<br /><span>aiutarti?</span></h1><p>Una demo, una partnership o un’idea ancora da mettere a fuoco. La prima conversazione è semplice.</p></section>
      <section className="contact-layout page-gutter">
        <div className="contact-details"><span className="eyebrow">CONTATTI DIRETTI</span><a className="contact-method" href="mailto:sales@otech.one"><span><Mail size={18} /></span><span><small>EMAIL</small>sales@otech.one</span><ArrowUpRight size={17} /></a><a className="contact-method" href="https://wa.me/393522102370" target="_blank" rel="noreferrer"><span><MessageCircle size={18} /></span><span><small>WHATSAPP</small>Scrivici in chat</span><ArrowUpRight size={17} /></a><div className="contact-method location-row"><span><MapPin size={18} /></span><span><small>CI TROVI A</small>Via Gustavo Fara 35<br />20124 Milano, Italia</span></div><div className="contact-other"><span className="footer-label">ALTRE RICHIESTE</span><a href="mailto:partnerships@otech.one">Partnerships <ArrowUpRight size={14} /></a><a href="mailto:press@otech.one">Ufficio stampa <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/company/otech-one/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a></div></div>
        <div className="contact-form-wrap">{topic && <p className="topic-note">Hai scelto <strong>{topic.toUpperCase()}</strong>. Raccontaci cosa ti serve.</p>}<ContactForm initialInterest={initialInterest} /></div>
      </section>
    </main>
  )
}

export default ContactPage