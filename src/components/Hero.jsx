import { useState } from 'react'
import { formatPrice } from '../utils/formatPrice.js'


const TUBE_STYLES = [
  { level: 62, color: 'hsl(214 72% 44%)' },
  { level: 80, color: 'hsl(190 70% 40%)' },
  { level: 48, color: 'hsl(166 62% 42%)' },
  { level: 70, color: 'hsl(150 60% 42%)' },
]


const BUBBLES = [
  { left: 24, size: 6, delay: 0, dur: 3.4 },
  { left: 56, size: 4, delay: 1.1, dur: 2.8 },
  { left: 72, size: 7, delay: 2.2, dur: 3.9 },
  { left: 40, size: 3, delay: 0.6, dur: 2.4 },
]

const BRAND_MAIN = 'NEXUS'
const BRAND_SUB = 'PATHOLOGY LAB'

function Hero({ labName, address, owner, featuredTests }) {
  const [active, setActive] = useState(null)

  return (
    <section id="home" className="hero">
      <div className="hero__molecules" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <span key={n} style={{ '--n': n }} />
        ))}
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="brand" aria-label="Nexus Pathology Lab">
            <span className="brand__main" aria-hidden="true">
              {BRAND_MAIN.split('').map((ch, k) => (
                <span
                  key={k}
                  className={`brand__letter${ch === 'X' ? ' brand__letter--x' : ''}`}
                  style={{ '--k': k }}
                >
                  {ch}
                </span>
              ))}
              <span className="brand__scan" />
            </span>

            <span className="brand__sub" aria-hidden="true">
              {BRAND_SUB.split('').map((ch, k) => (
                <span
                  key={k}
                  className={`brand__sub-letter${ch === ' ' ? ' brand__sub-letter--gap' : ''}`}
                  style={{ '--k': k }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
              <span className="brand__cursor" />
            </span>

            <svg className="brand__helix" viewBox="0 0 300 24" aria-hidden="true" focusable="false">
              {Array.from({ length: 15 }, (_, n) => (
                <g key={n} style={{ '--n': n }} className="brand__rung">
                  <line x1={10 + n * 20} y1="4" x2={10 + n * 20} y2="20" />
                  <circle cx={10 + n * 20} cy="4" r="3" />
                  <circle cx={10 + n * 20} cy="20" r="3" />
                </g>
              ))}
            </svg>
          </h1>

          <p className="hero__text">
            {labName} is a pathology laboratory in {address}. Check the price of any of our
            diagnostic tests before you visit.
          </p>
          <p className="hero__owner">
            <span className="hero__owner-label">Owner:</span> {owner}
          </p>
          <div className="hero__actions">
            <a href="#prices" className="btn btn--primary">
              Explore Test Prices
            </a>
            <a href="#contact" className="btn btn--outline">
              Contact Laboratory
            </a>
          </div>
        </div>

        <figure
          className={`rack${active !== null ? ' has-active' : ''}`}
          aria-label="Sample test prices"
          style={{ '--count': featuredTests.length }}
          onMouseLeave={() => setActive(null)}
        >
          <ul className="rack__tubes">
            {featuredTests.map((test, index) => {
              const style = TUBE_STYLES[index % TUBE_STYLES.length]
              return (
                <li
                  key={test.id}
                  className={`tube${active === index ? ' is-active' : ''}`}
                  style={{ '--tube-color': style.color, '--level': `${style.level}%`, '--i': index }}
                  onMouseEnter={() => setActive(index)}
                >
                  <span className="tube__cap" aria-hidden="true" />
                  <span className="tube__glass">
                    <span className="tube__liquid" aria-hidden="true">
                      {BUBBLES.map((b, n) => (
                        <i
                          key={n}
                          className="tube__bubble"
                          style={{
                            '--b-left': `${b.left}%`,
                            '--b-size': `${b.size}px`,
                            '--b-delay': `${b.delay + index * 0.3}s`,
                            '--b-dur': `${b.dur}s`,
                          }}
                        />
                      ))}
                    </span>
                    <span className="tube__label">{test.test_name}</span>
                  </span>
                </li>
              )
            })}
          </ul>

          <div className="rack__base" aria-hidden="true" />

          <ul className="rack__prices">
            {featuredTests.map((test, index) => (
              <li
                key={test.id}
                className={`price-tag${active === index ? ' is-active' : ''}`}
                style={{ '--tube-color': TUBE_STYLES[index % TUBE_STYLES.length].color, '--i': index }}
                onMouseEnter={() => setActive(index)}
              >
                <span className="visually-hidden">{test.test_name}: </span>
                {formatPrice(test.price)}
              </li>
            ))}
          </ul>
        </figure>
      </div>

      <svg
        className="hero__pulse"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <polyline
          pathLength="1"
          points="0,34 380,34 420,34 440,10 462,54 484,22 500,34 800,34 840,34 860,14 882,52 904,26 920,34 1200,34"
        />
      </svg>
    </section>
  )
}

export default Hero