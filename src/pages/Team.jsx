import { DotMatrixBackground } from '@designcodeio/threeui/components/DotMatrixBackground'
import team from '../data/team.json'
import { DecodeText, Heading, StickerField, SubHeading } from '../components/Layout'
import { ShaderSafeBoundary } from '../components/Preloader'

const PLACEHOLDER_IMG = '/images/speaker/person.jpg'
const GROUP_ACCENTS = ['var(--color1)', 'var(--color2)', 'var(--color3)', 'var(--color4)']

export default function Team() {
  return (
    <>
      <section id="hero" className="page-header page-header-2026 position-relative">
        <ShaderSafeBoundary>
          <div className="threeui-section-bg threeui-section-bg--team" aria-hidden="true">
            <DotMatrixBackground
              speed={1.0}
              gridScale={48}
              mouseAmount={0.06}
              pulseSpeed={0.5}
              radius={0.2}
              opacity={0.38}
              hue={42}
            />
          </div>
        </ShaderSafeBoundary>
        <StickerField stickers={[
          { name: 'braces', top: '18%', left: '6%', w: 90 },
          { name: 'chevrons', bottom: '14%', left: '18%', w: 90, hideSm: true },
          { name: 'equals', top: '20%', right: '18%', w: 60, hideSm: true },
          { name: 'semicolon', bottom: '16%', right: '6%', w: 40 },
        ]} />
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="content text-center">
                <div className="hero-tagline mb-3">
                  <span className="hero-tagline__dot" />
                  <DecodeText text="GDG BELGAUM // CREW ROSTER" duration={480} />
                </div>
                <h1 className="mb-3 text-capitalize letter-spacing">
                  <span className="hero-title__plate">
                    <DecodeText text="VOLUNTEER TEAM" duration={640} />
                  </span>
                </h1>
                <div className="divider mx-auto mb-4" />
                <ul className="list-inline">
                  <li className="list-inline-item"><a href="/">HOME</a></li>
                  <li className="list-inline-item">/</li>
                  <li className="list-inline-item"><a href="/team">TEAM</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="speaker-2 section bg-gray">
        <div className="container">
          <div className="row section-heading">
            <div className="col-lg-9">
              <Heading
                index="01"
                stroke="TEAM"
                tag="COMMUNITY BUILDERS"
                strokeColor="var(--color2)"
                title="The Minds Behind DevFest Belgaum"
                text="Meet the organizers, technical leads, and dedicated volunteers orchestrating Belgaum's largest developer conference."
              />
            </div>
          </div>

          {team.map((group, gIdx) => (
            <div key={group.title} className="mb-4">
              <div className="row section-heading mb-4">
                <div className="col-lg-12">
                  <SubHeading
                    index={String(gIdx + 1).padStart(2, '0')}
                    title={group.title}
                    count={group.members.length}
                    accentColor={GROUP_ACCENTS[gIdx % GROUP_ACCENTS.length]}
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                {group.members.map((m, idx) => (
                  <div className="col-lg-3 col-sm-6 mb-4 d-flex" key={m.name || idx}>
                    <div
                      className="team-card-2026 w-100 d-flex flex-column align-items-center text-center p-4 mb-3"
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: 20,
                        border: 'var(--outline)',
                        boxShadow: '5px 5px 0 var(--black-02)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      }}
                    >
                      <div className="img-block mb-3">
                        <img
                          src={m.img || PLACEHOLDER_IMG}
                          alt={m.name}
                          className="rounded-circle team-photo"
                          style={{
                            objectPosition: m.objectPosition || 'center top',
                          }}
                          onError={(e) => {
                            e.currentTarget.src = PLACEHOLDER_IMG
                          }}
                        />
                      </div>
                      <div className="team-info d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100 mt-2">
                        <h4 className="team-name mb-1" style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--black-02)' }}>
                          {m.name}
                        </h4>
                        {m.role && (
                          <p className="team-role mb-0" style={{ fontSize: '0.85rem', color: 'var(--color1)', fontWeight: 700 }}>
                            {m.role}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
