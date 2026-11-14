import { useCallback, useEffect, useRef, useState } from 'react'
import { LumenCta } from '@designcodeio/threeui/components/LumenCta'
import { RibbonFieldBackground } from '@designcodeio/threeui/components/RibbonFieldBackground'
import { EVENT, NAV_LINKS } from '../data/content'
import { Preloader, ShaderSafeBoundary } from './Preloader'
export { Preloader }

// ThreeUI ArticleHeadings cyber-glyph scramble pool & quadratic ease-out curve
const DECODE_POOL = '#%&@$/\\<>*+=~ABCDEFGHKMNPRSTUVWXYZ0123456789'
const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
const easeOutQuad = (t) => 1 - Math.pow(1 - t, 2)

/**
 * Interactive scramble-decode text component powered by ThreeUI's articleHeadingDecode algorithm.
 * Automatically decodes when scrolled into view and replays on pointer enter.
 */
export function DecodeText({
  text,
  as: Tag = 'span',
  className = '',
  duration = 620,
  scrambleLength = 10,
  preserveChance = 0.28,
  tailChance = 0.16,
  style,
}) {
  const elRef = useRef(null)
  const rafRef = useRef(0)

  const runDecode = useCallback(() => {
    const node = elRef.current
    if (!node || typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = text
      return
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const start = performance.now()
    const total = text.length

    const step = (now) => {
      const target = elRef.current
      if (!target) return
      const progress = clamp((now - start) / Math.max(1, duration), 0, 1)
      const locked = Math.floor(easeOutQuad(progress) * total)

      if (progress >= 1 || locked >= total) {
        target.textContent = text
        rafRef.current = 0
        return
      }

      let out = text.slice(0, locked)
      const activeSpan = Math.min(total - locked, scrambleLength)
      for (let i = 0; i < activeSpan; i += 1) {
        const ch = text[locked + i]
        out +=
          ch === ' ' || Math.random() < preserveChance
            ? ch
            : DECODE_POOL[(Math.random() * DECODE_POOL.length) | 0]
      }
      out += text
        .slice(locked + activeSpan)
        .replace(/\S/g, (ch) =>
          Math.random() < tailChance
            ? DECODE_POOL[(Math.random() * DECODE_POOL.length) | 0]
            : ch
        )

      target.textContent = out
      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
  }, [text, duration, scrambleLength, preserveChance, tailChance])

  useEffect(() => {
    const node = elRef.current
    if (!node) return undefined
    node.textContent = text
    let hasTriggered = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasTriggered) {
          hasTriggered = true
          runDecode()
        } else if (!entry?.isIntersecting) {
          hasTriggered = false
        }
      },
      { threshold: 0.2 }
    )
    io.observe(node)
    return () => {
      io.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      node.textContent = text
    }
  }, [text, runDecode])

  return (
    <Tag
      ref={elRef}
      className={`df-decode-text ${className}`.trim()}
      onMouseEnter={runDecode}
      data-article-heading="true"
      style={style}
    >
      {text}
    </Tag>
  )
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
    <section className="footer section position-relative overflow-hidden">
      <ShaderSafeBoundary>
        <div className="threeui-section-bg threeui-section-bg--footer" aria-hidden="true">
          <RibbonFieldBackground
            speed={0.75}
            pointerAmount={0.85}
            brightness={0.95}
            opacity={0.32}
            hue={205}
            saturation={1.15}
          />
        </div>
      </ShaderSafeBoundary>
      <div className="container position-relative" style={{ zIndex: 2 }}>
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
            <div className="mb-3 d-flex justify-content-center">
              <ShaderSafeBoundary>
                <LumenCta
                  variant="ghost"
                  mode="dark"
                  label="↻ Replay Agentic Intro"
                  ring
                  hue={210}
                  onClick={() => window.dispatchEvent(new CustomEvent('devfest:replay-preloader'))}
                />
              </ShaderSafeBoundary>
            </div>
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

/**
 * Interactive 3D Kinetic Section Heading powered by ThreeUI's cyber-decode engine,
 * replacing the legacy boxy .stroke-text + .pl-90 block.
 */
export function Heading({
  stroke,
  strokeColor = 'var(--color1)',
  title,
  text,
  light = false,
  index,
  tag,
  align = 'left',
}) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / Math.max(1, rect.width)
    const y = (e.clientY - rect.top) / Math.max(1, rect.height)
    const rx = (0.5 - y) * 7
    const ry = (x - 0.5) * 9
    el.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
    el.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
    el.style.setProperty('--glow-x', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--glow-y', `${(y * 100).toFixed(1)}%`)
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  const badgeLabel = tag || stroke || 'DEVFEST 2026'
  const watermarkText = stroke || tag || ''

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`df-heading ${light ? 'df-heading--light' : ''} ${
        align === 'center' ? 'df-heading--center' : ''
      }`.trim()}
      style={{ '--heading-accent': strokeColor }}
    >
      {watermarkText && (
        <span className="df-heading__watermark" aria-hidden="true">
          {watermarkText}
        </span>
      )}

      <div className="df-heading__eyebrow">
        <span className="df-heading__pill">
          <span className="df-heading__led" />
          {index && <span className="df-heading__index">{index}</span>}
          <span className="df-heading__tag">{badgeLabel}</span>
          <svg
            viewBox="0 0 28 16"
            className="df-heading__brackets"
            aria-hidden="true"
          >
            <path
              d="M9 2L2 8L9 14"
              stroke="#EA4335"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M19 2L26 8L19 14"
              stroke="#34A853"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </span>
        <span className="df-heading__rail" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>

      {title && (
        <h2 className="df-heading__title">
          <DecodeText text={title} />
        </h2>
      )}

      <div className="df-heading__spectrum" aria-hidden="true">
        <span className="df-heading__spectrum-bar" />
        <span className="df-heading__spectrum-spark" />
      </div>

      {text && <p className="df-heading__desc">{text}</p>}
    </div>
  )
}

/**
 * Interactive 3D Sub-Heading Ribbon used for Team groups and sub-tracks.
 */
export function SubHeading({ index, title, count, accentColor = 'var(--color1)' }) {
  return (
    <div className="df-subheading" style={{ '--sub-accent': accentColor }}>
      <div className="df-subheading__badge">
        <span className="df-subheading__dot" />
        <span className="df-subheading__idx">{index}</span>
      </div>
      <h3 className="df-subheading__title">
        <DecodeText text={title} duration={520} />
      </h3>
      <div className="df-subheading__line" aria-hidden="true" />
      {typeof count === 'number' && (
        <span className="df-subheading__count">
          {String(count).padStart(2, '0')} MEMBERS
        </span>
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