import { useCallback, useEffect, useRef, useState } from 'react'
import { MapPinIcon, PhoneIcon, UserIcon } from './Icons.jsx'
import './About.css'

// ---- ADD YOUR IMAGE LINKS HERE ----
// Leave src empty ('') to show a blank placeholder.
// Tip: put images in /public/images and use '/images/lab-1.jpg'.
const OWNER_PHOTO = 'https://scontent.fccu10-1.fna.fbcdn.net/v/t39.30808-6/522935864_2615616158784668_4365334626748243727_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1080&ctp=s1080x1080&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=--yig3WbHuIQ7kNvwFF-4Cf&_nc_oc=AdqEzLyfWIxpUPFj10oJYIMuywmIQOt-1gFNgsla0XScqMMsgdo-322HQdRkwcQ3_oM&_nc_zt=23&_nc_ht=scontent.fccu10-1.fna&_nc_gid=RS-EMqgqJHJ3sdX-9twxLw&_nc_ss=7b2a8&oh=00_AQNuuyem5Hib5ajtEPt-Y5SEaf5t4-nH7TUWWFv6ipA8XQ&oe=6AE27B13'

const LAB_PHOTOS = [
  { src: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RDezVjw3xZAHwF9zShAPsY99Ivx7q2Uuks2YH6jiBmgkNlDlPpGNLlqaisAgvqJoCW3QmlKtUXbuftRT5Lkn8Cez1x3Xodg5Up6Gu4d42Gt2vCWe77ESlGYNfBwHHPyS6746XgeODH0hg=s1360-w1360-h1020-rw', alt: 'Front of the laboratory', caption: 'Our laboratory' },
  { src: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9R2xxxa_PKBMdc8X-vyqRCamC7xpIpKbHvRVci_eubslOFMglhW6FpgH-V86cKDPaobzvaEPbEo3L9ay79lsBql-22JPvDDG60qfNI-dJ5oC7-5hAJF8mgvMbZ7nGzJfkRlrHn8HXcdCPC4=s1360-w1360-h1020-rw', alt: 'Sample collection area', caption: 'Sample collection' },
  { src: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Q4uicZMy1IGXjBCAnnHvaMHy8sK_TaT7BkKQGiNw-7B-9Hgp9AqbcLsm0SmoV9geaNvbQOvo_1J0l-f2lE9JMy8XgFIUz5MeZvUWIvEZZ1ZTg1KR_Wb9vuxrPkoE2NLNRMM7yUVuRMoGOE=s1360-w1360-h1020-rw', alt: 'Testing equipment in the lab', caption: 'Testing equipment' },
  { src: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RDezVjw3xZAHwF9zShAPsY99Ivx7q2Uuks2YH6jiBmgkNlDlPpGNLlqaisAgvqJoCW3QmlKtUXbuftRT5Lkn8Cez1x3Xodg5Up6Gu4d42Gt2vCWe77ESlGYNfBwHHPyS6746XgeODH0hg=s1360-w1360-h1020-rw', alt: 'Reception and waiting area', caption: 'Reception' },
]

// Edit this short message from the owner.
const OWNER_NOTE =
  'Careful Testing. Clear Prices. Your Trust, Our Responsibility.'

const STEPS = [
  { title: 'Check the price', text: 'Search the rate chart online.' },
  { title: 'Visit the lab', text: 'Come in for sample collection.' },
  { title: 'Get your report', text: 'Collect it from the lab.' },
]

function Photo({ src, alt, label }) {
  if (src) return <img className="abt__img" src={src} alt={alt} loading="lazy" />
  return (
    <div className="abt__placeholder" role="img" aria-label={`${alt} (photo coming soon)`}>
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.8" />
        <path d="M21 17l-5-5-9 8" />
      </svg>
      <span>{label}</span>
    </div>
  )
}

function About({ labName, owner, address, phoneUrl, contactNumber, testCount }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef(null)

  const goTo = useCallback((i) => {
    const track = trackRef.current
    if (!track) return
    const next = (i + LAB_PHOTOS.length) % LAB_PHOTOS.length
    track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' })
  }, [])

  // Keep the dots in sync when the user swipes
  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    setIndex(Math.round(track.scrollLeft / track.clientWidth))
  }

  // Auto-advance, unless paused or the user prefers reduced motion
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || reduce) return undefined
    const timer = setInterval(() => goTo(index + 1), 4500)
    return () => clearInterval(timer)
  }, [index, paused, goTo])

  return (
    <section id="about" className="section abt" aria-labelledby="about-title">
      <div className="container">
        <div className="abt__top">
          <div>
            <p className="abt__eyebrow">Who we are</p>
            <h2 id="about-title" className="section__title">
              About {labName}
            </h2>
            <p className="abt__lead">
              {labName} is a trusted pathology laboratory committed to accurate diagnostics and
              clear, honest pricing. Browse our full rate chart online so you know the cost of
              every test before you visit.
            </p>
          </div>

         
        </div>

        <div className="abt__grid">
          {/* Lab photo carousel */}
          <div
            className="abt__carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Photos of the laboratory"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="abt__track" ref={trackRef} onScroll={onScroll}>
              {LAB_PHOTOS.map((photo, i) => (
                <figure
                  key={photo.caption}
                  className="abt__slide"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${LAB_PHOTOS.length}`}
                >
                  <Photo src={photo.src} alt={photo.alt} label={photo.caption} />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>

            <div className="abt__controls">
              <button type="button" className="abt__arrow" onClick={() => goTo(index - 1)}
                aria-label="Previous photo">
                ‹
              </button>
              <div className="abt__dots">
                {LAB_PHOTOS.map((photo, i) => (
                  <button
                    key={photo.caption}
                    type="button"
                    className={`abt__dot${i === index ? ' is-active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === index}
                  />
                ))}
              </div>
              <button type="button" className="abt__arrow" onClick={() => goTo(index + 1)}
                aria-label="Next photo">
                ›
              </button>
            </div>
          </div>

          {/* Owner card */}
          <article className="abt__owner">
            <div className="abt__owner-photo">
              <Photo src={OWNER_PHOTO} alt={`Portrait of ${owner}`} label="Owner photo" />
            </div>
            <span className="abt__stamp">Owner</span>
            <h3 className="abt__owner-name">{owner}</h3>
            <p className="abt__owner-note">“{OWNER_NOTE}”</p>
          </article>
        </div>

        {/* How it works */}
        <ol className="abt__steps">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="abt__step-no">{i + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </div>
            </li>
          ))}
        </ol>

        {/* Contact details */}
        <dl className="abt__details">
          <div className="abt__row">
            <dt><UserIcon size={20} /> Owner</dt>
            <dd>{owner}</dd>
          </div>
          <div className="abt__row">
            <dt><MapPinIcon size={20} /> Address</dt>
            <dd>{address}</dd>
          </div>
          <div className="abt__row">
            <dt><PhoneIcon size={20} /> Phone</dt>
            <dd><a href={phoneUrl}>{contactNumber}</a></dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export default About