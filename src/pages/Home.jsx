import { useEffect, useState } from 'react'
import { DotMatrixBackground } from '@designcodeio/threeui/components/DotMatrixBackground'
import { PredictiveArcCanvas } from '@designcodeio/threeui/components/PredictiveArcCanvas'
import { StructureFlowCollection } from '@designcodeio/threeui/components/StructureFlowCollection'
import { EVENT, FEATURES, SCHEDULE, SPEAKERS } from '../data/content'
import { DecodeText, Heading, Mono, StickerField } from '../components/Layout'
import { ShaderSafeBoundary } from '../components/Preloader'

function getRemaining() {
  if (!EVENT.date) return null
  const diff = Math.max(0, EVENT.date - Date.now())
  const s = Math.floor(diff / 1000)
  return { days: Math.floor(s / 86400), hours: Math.floor(s / 3600) % 24, minutes: Math.floor(s / 60) % 60, seconds: s % 60 }
}

function Countdown() {
  const [t, setT] = useState(getRemaining)
  useEffect(() => {
    if (!EVENT.date) return
    const id = setInterval(() => setT(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])
  const fmt = (type, v) => (t ? (type === 'day' ? v : String(v).padStart(2, '0')) : '--')
  const cells = [['day', 'days', t?.days], ['hour', 'hours', t?.hours], ['minute', 'minutes', t?.minutes], ['second', 'seconds', t?.seconds]]
  return (
    <div className="syotimer">
      <div className="syotimer__body">
        {cells.map(([type, unit, v]) => (
          <div key={type} className={`syotimer-cell syotimer-cell_type_${type}`}>
            <div className="syotimer-cell__value">{fmt(type, v)}</div>
            <div className="syotimer-cell__unit">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const HERO_STICKERS = [
  { name: 'brackets', top: '14%', left: '4%', w: 90, r: -8 },
  { name: 'arrow', top: '62%', left: '3%', w: 150, r: 0 },
  { name: 'slashes', top: '10%', right: '6%', w: 90, r: 0 },
  { name: 'cloud', bottom: '8%', right: '4%', w: 220, r: 0 },
  { name: 'plus-red', top: '40%', left: '12%', w: 70, r: 12, hideSm: true },
  { name: 'hash', top: '44%', right: '12%', w: 80, r: -10, hideSm: true },
  { name: 'half-circle', bottom: '6%', left: '22%', w: 60, r: 90, hideSm: true },
  { name: 'cross', top: '8%', left: '28%', w: 55, r: 0, hideSm: true },
  { name: 'c-shape', top: '30%', right: '24%', w: 55, r: 0, hideSm: true },
  { name: 'dots', bottom: '22%', right: '22%', w: 110, r: 0, hideSm: true },
  { name: 'plus-blue', bottom: '30%', left: '26%', w: 45, r: 0, hideSm: true },
  { name: 'quotes', top: '22%', left: '18%', w: 70, r: 0, hideSm: true },
]

function Hero() {
  return (
    <section id="home" className="section-banner hero-2026 d-flex align-items-center position-relative">
      <ShaderSafeBoundary>
        <div className="threeui-section-bg threeui-section-bg--hero" aria-hidden="true">
          <DotMatrixBackground
            speed={1.1}
            gridScale={52}
            mouseAmount={0.06}
            pulseSpeed={0.55}
            radius={0.22}
            opacity={0.42}
            hue={210}
          />
        </div>
      </ShaderSafeBoundary>
      <StickerField stickers={HERO_STICKERS} />
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="banner-content text-center">
          <img src="/images/icons/GDG BELGAUM Light Horizontal-Logo.png" style={{ width: 230 }} alt="GDG Belgaum" />
          <div className="hero-tagline">
            <span className="hero-tagline__dot" />
            <DecodeText text="BELGAUM'S LARGEST DEVELOPERS CONFERENCE" duration={520} />
          </div>
          <img src="/images/2026/devfest-braces.png" className="hero-wordmark" alt="DevFest" />
          <div className="hero-pills">
            <span className="pill pill-location">{EVENT.city}</span>
            <span className="pill pill-year">{EVENT.year}</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-title__plate">
              <DecodeText text="TODAY, MEET TOMORROW'S BELGAUM" duration={700} />
            </span>
          </h1>
          <div className="hero-meta">
            <a href={EVENT.venueMapHero} target="_blank" rel="noreferrer">
              <i className="tf-ion-ios-location" /> {EVENT.venueShort}
            </a>
            <span><i className="tf-ion-android-calendar" /> {EVENT.dateLabel}</span>
          </div>
          <a href={EVENT.registerUrl} target="_blank" rel="noreferrer" className="btn btn-hero2 btn-rounded">REGISTER NOW</a>
        </div>
      </div>
    </section>
  )
}

function Counter() {
  return (
    <section id="counter" className="overflow-hidden counter-wrapper pt-4 pb-5" style={{ backgroundColor: 'var(--color3)' }}>
      <div className="container">
        <div className="counter-inner">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="counter-stat">
                <span className="counter-stat__badge">
                  <span className="counter-stat__dot" />
                  T-MINUS // LAUNCH CLOCK
                </span>
                <h2 className="counter-stat__title">
                  <span className="font-weight-bold">
                    <DecodeText text="Count the day" duration={480} />
                  </span>
                  <span className="counter-stat__sub">until conference start</span>
                </h2>
              </div>
            </div>
            <Countdown />
          </div>
        </div>
      </div>
    </section>
  )
}

function What() {
  return (
    <section id="what" className="section about position-relative" style={{ backgroundColor: 'var(--color3)', paddingTop: 0 }}>
      <Mono name="asterisk" className="deco" style={{ right: '4%', bottom: 40, width: 90 }} />
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-5">
            <div className="about-img position-relative">
              <img src="/images/about/what/devfest2022.JPG" alt="" className="img-fluid w-100" />
              <div className="img-block">
                <img src="/images/about/what/devfest2022_2.JPG" alt="" className="img-fluid" />
              </div>
              <img src="/images/2026/sticker-gdg.png" className="what-sticker-badge" alt="DevFest 2026" />
            </div>
          </div>
          <div className="col-lg-7 col-md-7">
            <div className="about-content-wrap mt-5 mt-md-0">
              <Heading
                index="01"
                stroke="WHAT"
                tag="ABOUT THE SUMMIT"
                strokeColor="var(--color2)"
                title="What is DevFest ?"
              />
              <div className="df-about-body mt-3">
                <p><b>DevFest is a community led tech conference, hosted by the Google Developer Groups (GDG) with a strong focus on knowledge exchange, networking, and learning about Google technologies to nurture the needs and interests of local-dev community.</b></p>
                <p><b>DevFest Belgaum 2026 is an initiative by GDG Belgaum with a strong focus on knowledge exchange, networking and learning about technologies to nurture the needs and interests of local developer community ecosystem.</b></p>
                <a href={EVENT.registerUrl} className="btn btn-hero btn-rounded mt-3" target="_blank" rel="noreferrer">REGISTER NOW</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Why() {
  return (
    <section id="why" className="section-schedule section-bottom position-relative" style={{ paddingTop: 50, paddingBottom: 0 }}>
      <Mono name="globe" className="deco" style={{ right: '6%', top: 60, width: 130 }} />
      <div className="container">
        <div className="row section-heading">
          <div className="col-lg-9">
            <Heading
              index="02"
              stroke="WHY"
              tag="WHY ATTEND"
              strokeColor="var(--color4)"
              title="Grab The Opportunity"
              text="You get to meet a lot of inspirational people, you will find yourself around a lot of people having similar interests."
            />
          </div>
        </div>
      </div>
      <section id="section-feature" className="section-bottom">
        <div className="container">
          <div className="row">
            {FEATURES.map((f) => (
              <div className="col-lg-4 col-md-6" key={f.title}>
                <div className="feature-box mb-md-3 mt-3" style={{ backgroundColor: f.color }}>
                  <i className={f.icon} />
                  <h4 className="mt-3 mb-3">{f.title}</h4>
                  <div className="divider" />
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}

function Schedule() {
  return (
    <section id="schedule" className="section-schedule section-bottom position-relative overflow-hidden" style={{ backgroundColor: 'var(--color1)', paddingTop: 50 }}>
      <ShaderSafeBoundary>
        <div className="threeui-section-bg threeui-section-bg--schedule" aria-hidden="true">
          <StructureFlowCollection
            speed={1.2}
            pointSize={0.11}
            opacity={0.55}
            maskStart={0.05}
            maskSolid={0.35}
          />
        </div>
      </ShaderSafeBoundary>
      <Mono name="braces" className="deco deco-light" style={{ right: '6%', top: 50, width: 150, zIndex: 1 }} />
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row section-heading" style={{ marginBottom: 0 }}>
          <div className="col-lg-9">
            <Heading
              index="03"
              stroke="SCHEDULE"
              tag="EVENT TIMELINE"
              strokeColor="#ffba00"
              title="Exclusive events, priceless memories"
              light
            />
          </div>
        </div>
      </div>
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-12">
            <ul className="mt-5 time-table pl-0 list-unstyled">
              {SCHEDULE.map((s) => (
                <li key={s.time} className="d-md-flex align-items-center justify-content-between bg-light p-4 mb-3"
                  style={{ border: `20px solid ${s.color}`, borderRadius: 40 }}>
                  <h4 className="time text-color">{s.time}</h4>
                  <div className="content">
                    <h3 className="mb-3">{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                  <div className="content-img text-lg-right">
                    <img src={s.img} alt="" className="img-fluid" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Speakers() {
  return (
    <section id="speakers" className="speaker-2 section position-relative overflow-hidden" style={{ backgroundColor: 'var(--pastel-green)' }}>
      <ShaderSafeBoundary>
        <div className="threeui-section-bg threeui-section-bg--speakers" aria-hidden="true">
          <PredictiveArcCanvas
            variant="data-pixel"
            mode="light"
            speed={0.9}
            pixelSize={10}
            arcCenter={0.35}
            arcDrop={0.85}
            thickness={0.4}
            brightness={1.05}
          />
        </div>
      </ShaderSafeBoundary>
      <Mono name="squiggle" className="deco" style={{ right: '6%', top: 60, width: 50, zIndex: 1 }} />
      <Mono name="heart" className="deco" style={{ right: '12%', top: 90, width: 90, zIndex: 1 }} />
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row section-heading">
          <div className="col-lg-9">
            <Heading
              index="04"
              stroke="SPEAKERS"
              tag="EXPERT LINEUP"
              strokeColor="var(--color2)"
              title="Who're speaking"
              text="The individuals that speak at DevFest often drive technical conversations within their companies, cities, countries, and worldwide."
            />
          </div>
        </div>
        <div className="row">
          {SPEAKERS.map((s) => (
            <div className="col-lg-3 col-sm-6" key={s.name}>
              <div className="speaker-block style-2 mb-5">
                <div className="img-block">
                  <img src={s.img} alt={s.name} className="img-fluid rounded-circle" />
                </div>
                <div className="speaker-info text-center">
                  <h4 className="mb-0 mt-3">{s.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Venue() {
  return (
    <section id="venu" className="cta-2 section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="cta-img">
              <img src="/images/bg/venue.webp" alt="Venue" className="img-fluid" />
              <div className="contact-info box-shadow">
                <div className="module-border-wrap">
                  <div className="module">
                    <h5 className="text-uppercase letter-spacing mb-4">Venue location</h5>
                    <h6 className="text-color mb-3">{EVENT.dateLabel}</h6>
                    <p className="lead">
                      KLS Gogte Institute of Technology,<br /> "Jnana Ganga",<br /> Udyambag, Belagavi,<br /> Karnataka 590008
                    </p>
                    <a href={EVENT.venueMap} target="_blank" rel="noreferrer">
                      <i className="tf-ion-ios-location mr-2" />View Map location
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Counter />
      <What />
      <Why />
      <Schedule />
      <Speakers />
      <Venue />
    </>
  )
}
