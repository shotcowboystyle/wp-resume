import { Avatar, Badge, Bar, Button, Icon, Roll, Stage, States, Text, type Act } from '../../kit'
import '../onpay-look/look.css'
import './onpay-dashboard.css'

// OnPay's 2026 dashboard mock, brought to life. A blue ground, the app with
// its sidebar and three pay cards, and three satellites around it, as the
// marketing mock composes them. The story is one pay period:
// "Let's run payroll" drops in, Start is pressed, the pay cards roll forward a
// period, then a time-off request is approved and live support offers help.
// Poster: everything done, so a still or reduced motion tells the same story.
//
// Real strings: the greeting, the three card titles and their dates, the
// three satellites. The sidebar keeps OnPay's nav because it is how the
// product is recognized; names under the avatars are filler.

type S = { payroll: boolean; ran: boolean; timeoff: boolean; approved: boolean; support: boolean }
const START: S = { payroll: false, ran: false, timeoff: false, approved: false, support: false }
const DONE: S = { payroll: true, ran: true, timeoff: true, approved: true, support: true }

const NAV = ['Dashboard', 'Workers', 'Payroll', 'HR', 'Time', 'Benefits', 'Resources', 'Company']
const TEAM = ['Marisa', 'Douglas', 'Eliana', 'Jessica']

// January 2027 starts on a Friday; OnPay's mock draws a month starting Wednesday,
// kept here so the range and the two marked days sit where the mock has them.
const LEAD = 3
const DAYS = 31

const script = async (a: Act<S>) => {
  await a.wait(500)
  a.mark('payroll')
  a.put({ payroll: true })
  await a.wait(1100)
  a.mark('start')
  await a.click('start')
  await a.set({ ran: true })
  await a.wait(1500)
  a.mark('timeoff')
  await a.move('rest')
  a.put({ timeoff: true })
  await a.wait(1300)
  await a.set({ approved: true })
  await a.wait(900)
  a.mark('support')
  a.put({ support: true })
  await a.wait(3200)
}

function Day({ d }: { d: number }) {
  const kind = d === 6 || d === 10 ? 'cap' : d > 6 && d < 10 ? 'band' : d === 22 ? 'ok' : d === 23 ? 'warn' : d === 20 ? 'soft' : undefined
  return (
    <span className="opd-day" data-kind={kind}>
      <span>{d}</span>
    </span>
  )
}

export default function OnPayDashboard() {
  return (
    <Stage<S>
      width={960}
      height={660}
      compact={{ below: 640, width: 358, height: 590 }}
      initial={START}
      poster={DONE}
      script={script}
      play="once"
      fidelity="realistic"
      cursor={{ at: 'rest' }}
      className="look-onpay opd"
    >
      {(s) => (
        <>
          <section className="opd-app">
            <div className="opd-top">
              <span className="opd-logo">onpay</span>
              <span className="opd-search">
                <Bar w={14} h={14} r={7} tone={2} />
              </span>
              <span className="opd-icons">
                <Bar w={14} h={14} r={4} tone={2} />
                <Bar w={14} h={14} r={4} tone={2} />
                <Bar w={14} h={14} r={7} tone={2} />
              </span>
              <span className="opd-me">
                <Avatar plain size={30} />
                <span className="opd-me-lines">
                  <Bar w={110} h={7} r={4} tone={2} />
                  <Bar w={140} h={6} r={3} tone={1} />
                </span>
              </span>
            </div>
            <div className="opd-side">
              {NAV.map((n, i) => (
                <span key={n} className="opd-nav" data-on={i === 0 || undefined}>
                  {n}
                </span>
              ))}
            </div>
            <div className="opd-main">
              <Text className="opd-hello">Good evening, Michelle</Text>
              <div className="opd-team">
                {TEAM.map((n) => (
                  <span key={n} className="opd-person">
                    <Avatar name={n} size={52} />
                    <Bar w={64} h={6} r={3} tone={2} />
                  </span>
                ))}
              </div>
              <div className="opd-cards">
                <section className="opd-card">
                  <Text className="opd-card-title">Recent pay run</Text>
                  <span className="opd-date">
                    <span className="opd-month">{s.ran ? 'Feb' : 'Jan'}</span>
                    <Roll className="opd-dom">{s.ran ? '5th' : '22nd'}</Roll>
                  </span>
                  <span className="opd-lines">
                    <Bar w={90} h={6} r={3} tone={1} />
                    <Bar w={90} h={6} r={3} tone={1} />
                  </span>
                  <span className="opd-actions">
                    <span className="opd-outline" data-strong>
                      Summary
                    </span>
                    <span className="opd-outline">Checks</span>
                  </span>
                </section>
                <section className="opd-card">
                  <Text className="opd-card-title">Pay schedule</Text>
                  <div className="opd-cal">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                      <span key={i} className="opd-dow">
                        {d}
                      </span>
                    ))}
                    {Array.from({ length: LEAD }, (_, i) => (
                      <span key={`e${i}`} />
                    ))}
                    {Array.from({ length: DAYS }, (_, i) => (
                      <Day key={i} d={i + 1} />
                    ))}
                  </div>
                </section>
                <section className="opd-card">
                  <Text className="opd-card-title">Next pay run</Text>
                  <span className="opd-date">
                    <span className="opd-month">Feb</span>
                    <Roll className="opd-dom">{s.ran ? '19th' : '5th'}</Roll>
                  </span>
                  <span className="opd-sched">Bi-weekly</span>
                  <span className="opd-actions">
                    <span className="opd-outline" data-strong>
                      Start run
                    </span>
                  </span>
                </section>
              </div>
              <span className="opd-rest" data-target="rest" />
            </div>
          </section>

          <section className="opd-sat opd-payroll" data-in={s.payroll || undefined}>
            <div className="opd-sat-copy">
              <Badge tone="accent">Bi-weekly</Badge>
              <Text className="opd-sat-title">Let’s run payroll</Text>
              <Text className="opd-sat-sub">Jan 21st – Feb 3rd</Text>
            </div>
            <Button variant="primary" size="large" className="opd-btn" data-target="start" icon={s.ran ? <Icon name="check" size={14} stroke={2.2} /> : undefined}>
              {s.ran ? 'Submitted' : 'Start'}
            </Button>
          </section>

          <section className="opd-sat opd-support" data-in={s.support || undefined}>
            <Avatar name="Dana" size={72} tone="accent" />
            <div className="opd-sat-copy">
              <Badge tone="warning">Live support</Badge>
              <Text className="opd-sat-title">Need help? Let’s chat.</Text>
              <Button variant="primary" size="large" className="opd-btn">
                Get support
              </Button>
            </div>
          </section>

          <section className="opd-sat opd-timeoff" data-in={s.timeoff || undefined}>
            <Avatar name="Marcus" size={64} />
            <div className="opd-sat-copy">
              <States
                value={s.approved ? 'approved' : 'pending'}
                align="start"
                states={{ pending: <Badge tone="warning">Pending</Badge>, approved: <Badge tone="success">Approved</Badge> }}
              />
              <Text className="opd-sat-title">Time off request</Text>
              <Text className="opd-sat-sub">May 24 – May 31</Text>
            </div>
          </section>
        </>
      )}
    </Stage>
  )
}
