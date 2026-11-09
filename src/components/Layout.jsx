import { useEffect, useState } from 'react'
import { EVENT, NAV_LINKS } from '../data/content'

export function Preloader() {
  const [opacity, setOpacity] = useState(1)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const start = setTimeout(() => setOpacity(0), 400)
    const end = setTimeout(() => setHidden(true), 700)
    return () => { clearTimeout(start); clearTimeout(end) }
  }, [])

  if (hidden) return null
  return <div className="tb-preloader" style={{ opacity, pointerEvents: opacity === 0 ? 'none' : 'auto' }} />
}

export function Fab() {
  return (
    <div className="fab-wrapper">
      <input id="fabCheckbox" type="checkbox" className="fab-checkbox" />
      <label className="fab" htmlFor="fabCheckbox">
        <span className="fab-dots fab-dots-1" />
        <span className="fab-dots fab-dots-2" />
        <span className="fab-dots fab-dots-3" />
      </label>
      <div className="fab-wheel">
        <a className="fab-action fab-action-1 green-color" href="https://wa.me/+918050203399" target="_blank" rel="noreferrer">
          <i className="tf-ion-social-whatsapp" />
        </a>
        <a className="fab-action fab-action-2 red-color" href="https://www.instagram.com/gdg_belgaum/" target="_blank" rel="noreferrer">
          <i className="tf-ion-social-instagram" />
        </a>
        <a className="fab-action fab-action-3 yellow-color" href={EVENT.registerUrl} target="_blank" rel="noreferrer">
          <i className="tf-ion-clipboard" />
        </a>
        <a className="fab-action fab-action-4 blue-color" href={EVENT.eventPage} target="_blank" rel="noreferrer">
          <i className="tf-ion-ios-more-outline" />
        </a>
      </div>
    </div>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="header-bar">
      <nav className="navbar navbar-expand-lg main-nav fixed-top" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="/images/2026/logo-lockup-2026.png" style={{ width: 210 }} alt="DevFest 2026" className="img-fluid logo-b" />
          </a>
          <button className="navbar-toggler" type="button" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
            <span className="tf-ion-android-menu" />
          </button>
          <div className={`collapse navbar-collapse text-center${open ? ' show' : ''}`}>
            <ul className="navbar-nav mx-auto">
              {NAV_LINKS.map((l) => (
                <li className="nav-item" key={l.label}>
                  <a className="nav-link" href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export function Footer() {
  const link = { color: 'var(--color1)' }
  return (
    <section className="footer section">
      <div className="container">
        <div className="row justify-content-center" style={{ paddingBottom: 30 }}>
          <div className="col-lg-6 text-center">
            <img src="/images/icons/GDG BELGAUM Dark Horizontal-Logo.png" style={{ width: 250, paddingRight: 20 }} alt="GDG Belgaum" />
            <img src="/images/2026/logo-lockup-2026.png" className="footer-devfest-logo" alt="DevFest 2026" />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <p className="mt-3 text-white-50">
              Disclaimer: GDG Belgaum is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation. To learn more about the GDG program, visit{' '}
              <a href="https://developers.google.com/community/gdg" style={link} target="_blank" rel="noreferrer">https://developers.google.com/community/gdg</a>
            </p>
            <p className="text-white-50">
              By participating in any events planned and controlled by{' '}
              <a style={link} href="https://gdg.community.dev/gdg-belgaum/" target="_blank" rel="noreferrer">GDG BELGAUM</a>, you agree to the following{' '}
              <a href="https://developers.google.com/community-guidelines" style={link} target="_blank" rel="noreferrer">Community Guidelines</a>
            </p>
            <ul className="list-inline footer-socails">
              <li className="list-inline-item"><a href="https://wa.me/+916366136498" target="_blank" rel="noreferrer"><i className="tf-ion-social-whatsapp" /></a></li>
              <li className="list-inline-item"><a href="mailto:gdgbgm2022@gmail.com"><i className="tf-ion-android-mail" /></a></li>
              <li className="list-inline-item"><a href="https://www.instagram.com/gdg_belgaum/" target="_blank" rel="noreferrer"><i className="tf-ion-social-instagram" /></a></li>
              <li className="list-inline-item"><a href="https://www.linkedin.com/company/gdg-belgaum/" target="_blank" rel="noreferrer"><i className="tf-ion-social-linkedin" /></a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center mt-5">
            <p className="copy border-top pt-4 text-white-50 mb-0">
              Designed with ❤️ by Tech team{' '}
              <a style={link} href="https://gdg.community.dev/gdg-belgaum/" target="_blank" rel="noreferrer">GDG BELGAUM</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Section heading with the big outlined word + red-lined title. */
export function Heading({ stroke, strokeColor, title, text, light }) {
  return (
    <div className="heading">
      <span className="stroke-text" style={{ WebkitTextStrokeColor: strokeColor }}>{stroke}</span>
      {(title || text) && (
        <div className="pl-90">
          {title && <h2 className="mt-2" style={light ? { color: '#fff' } : undefined}>{title}</h2>}
          {text && <p>{text}</p>}
        </div>
      )}
    </div>
  )
}


/** Decorative scattered DevFest 2026 "bold glyph" stickers. */
export function StickerField({ stickers }) {
  return (
    <div className="sticker-field" aria-hidden="true">
      {stickers.map(({ name, w, r = 0, hideSm, ...pos }, i) => (
        <img key={name} src={`/images/2026/stickers/${name}.png`} alt=""
          className={`sticker${hideSm ? ' d-none d-lg-block' : ''}`}
          style={{ ...pos, width: w, '--r': `${r}deg`, animationDelay: `${(i % 5) * 0.6}s` }} />
      ))}
    </div>
  )
}

/** Monoline DevFest 2026 glyph used as a section decoration. */
export function Mono({ name, className = '', style }) {
  return <img src={`/images/2026/mono/${name}.png`} alt="" aria-hidden="true" className={`mono ${className}`} style={style} />
}