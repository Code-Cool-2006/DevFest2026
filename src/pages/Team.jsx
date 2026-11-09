import team from '../data/team.json'
import { Heading, StickerField } from '../components/Layout'

const PLACEHOLDER_IMG = '/images/speaker/person.jpg'

export default function Team() {
  return (
    <>
      <section id="hero" className="page-header page-header-2026">
        <StickerField stickers={[
          { name: 'braces', top: '18%', left: '6%', w: 90 },
          { name: 'chevrons', bottom: '14%', left: '18%', w: 90, hideSm: true },
          { name: 'equals', top: '20%', right: '18%', w: 60, hideSm: true },
          { name: 'semicolon', bottom: '16%', right: '6%', w: 40 },
        ]} />
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="content text-center">
                <h1 className="mb-3 text-capitalize letter-spacing">VOLUNTEER TEAM</h1>
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
            <div className="col-lg-6">
              <Heading stroke="TEAM" strokeColor="var(--color2)" />
            </div>
          </div>

          {team.map((group) => (
            <div key={group.title}>
              <div className="row section-heading">
                <div className="col-lg-6">
                  <div className="heading">
                    <div className="pl-90"><h2>{group.title}</h2></div>
                  </div>
                </div>
              </div>
              <div className="row">
                {group.members.map((m, idx) => (
                  <div className="col-lg-3 col-sm-6" key={m.name || idx}>
                    <div className="speaker-block style-2 mb-5">
                      <div className="img-block">
                        <img src={PLACEHOLDER_IMG} alt={m.name} className="img-fluid rounded-circle team-photo" />
                      </div>
                      <div className="speaker-info text-center">
                        <h4 className="mb-0 mt-3">{m.name}</h4>
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
