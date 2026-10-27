import { useState } from 'react'
import { MenuIcon, CloseIcon } from './Icons.jsx'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Test Prices', href: '#prices' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function Navbar({ labName = 'Nexus Pathology Lab' }) {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <a href="#home" className="navbar__brand" onClick={closeMenu}>
          <img
            src="/logo.png"
            alt=""
            className="navbar__logo-img"
            width="64"
            height="64"
          />
          <span className="navbar__name">{labName}</span>
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <nav
          id="primary-navigation"
          className={`navbar__links${isOpen ? ' navbar__links--open' : ''}`}
          aria-label="Primary"
        >
          <ul>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} onClick={closeMenu}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar