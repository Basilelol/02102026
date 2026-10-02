import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import SiteLayout from './components/SiteLayout.jsx'
import './App.css'

// Keep secondary pages out of the first download; they are fetched only when visited.
const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const ProductsPage = lazy(() => import('./pages/ProductsPage.jsx'))
const TailorLabPage = lazy(() => import('./pages/TailorLabPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<main className="page-loading" aria-label="Caricamento pagina" />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chi-siamo" element={<AboutPage />} />
            <Route path="/prodotti" element={<ProductsPage />} />
            <Route path="/tailor-lab" element={<TailorLabPage />} />
            <Route path="/contatti" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App