const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Test Prices', href: '#prices' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function Footer({ labName, address, contactNumber }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__block">
          <h2 className="footer__title">{labName}</h2>
          <p>{address}</p>
          <p>
            <a href={`tel:+91${contactNumber}`}>{contactNumber}</a>
          </p>
        </div>

        <nav className="footer__block" aria-label="Footer">
          <h2 className="footer__title">Quick Links</h2>
          <ul className="footer__links">
            {FOOTER_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>
            &copy; {year} {labName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer