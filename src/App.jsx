import { useMemo, useState } from 'react'
import labData from './data/price.json'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TestSearch from './components/TestSearch.jsx'
import TestList from './components/TestList.jsx'
import Footer from './components/Footer.jsx'
import { MapPinIcon, PhoneIcon, UserIcon, WhatsAppIcon } from './components/Icons.jsx'
import './App.css'
import About from './components/About.jsx'

const { lab, document: rateChartTitle, address, owner, contact_number: contactNumber, tests } =
  labData

// Copy of the tests with an id for React keys. The JSON itself is untouched.
const allTests = tests.map((test, index) => ({ ...test, id: index }))

// Google Maps searches for this exact text when the map button is clicked
const mapsQuery = 'NEXUS Pathology Lab Shyamsundar Thanamore, West Bengal 713424'
// Tests shown on the hero test tubes. Names are looked up in price.json, so prices stay in sync.
const FEATURED_TEST_NAMES = ['CBC', 'SUGAR FASTING', 'LIPID PROFILE', 'VITAMIN D3']
const featuredTests = FEATURED_TEST_NAMES.map((name) =>
  allTests.find((test) => test.test_name === name),
).filter(Boolean)

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
const phoneUrl = `tel:+91${contactNumber}`
const whatsappUrl = `https://wa.me/91${contactNumber}`

function App() {
  const [query, setQuery] = useState('')

  const visibleTests = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (needle === '') return allTests
    return allTests.filter((test) => test.test_name.toLowerCase().includes(needle))
  }, [query])

  const resetSearch = () => setQuery('')

  return (
    <>
      <Navbar labName={lab} />
      <main>
        <Hero
          labName={lab}
          address={address}
          owner={owner}
          testCount={allTests.length}
          featuredTests={featuredTests}
        />

        <section id="prices" className="section section--paper" aria-labelledby="prices-title">
          <div className="container">
            <h2 id="prices-title" className="section__title">
              Diagnostic Test Price List
            </h2>

            <TestSearch
              query={query}
              onQueryChange={setQuery}
              onReset={resetSearch}
              resultCount={visibleTests.length}
              totalCount={allTests.length}
            />

            <div className="slip">
              <div className="slip__head">
                <p className="slip__title">{rateChartTitle}</p>
                <p className="slip__lab">{lab}</p>
              </div>
              <TestList tests={visibleTests} onReset={resetSearch} />
            </div>
          </div>
        </section>

        <About
          labName={lab}
          owner={owner}
          address={address}
          phoneUrl={phoneUrl}
          contactNumber={contactNumber}
          testCount={allTests.length}
        />

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="container contact__inner">
            <h2 id="contact-title">Call or visit the lab</h2>
            <a href={phoneUrl} className="contact__phone">
              {contactNumber}
            </a>
            <p className="contact__address">{address}</p>
            <div className="contact__actions">
              <a href={phoneUrl} className="btn btn--light">
                <PhoneIcon size={18} /> Call now
              </a>
              <a
                href={whatsappUrl}
                className="btn btn--whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={18} /> WhatsApp
              </a>
              <a
                href={mapsUrl}
                className="btn btn--outline-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPinIcon size={18} /> Open in Google Maps
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer labName={lab} address={address} contactNumber={contactNumber} />
    </>
  )
}

export default App