import { Avatar, Badge, Bubble, Check, Stage, Text, Thread, type Act } from '../../kit'
import '../onpay-look/look.css'
import './onpay-expert.css'

// A named payroll specialist answering a real question. The live-support card
// from OnPay's dashboard mock, opened into the conversation it promises: an
// owner asks about a first hire in a new state, Dana types and answers, the
// two registrations she named appear on the account and check off, and the
// owner says thanks. A person with a name and a role, no bot, no sparkles.
//
// Real strings: Dana's name and role, the three messages, the setup card's
// title and two rows.

type S = { n: number; typing: boolean; card: boolean; done: [boolean, boolean] }
const START: S = { n: 0, typing: false, card: false, done: [false, false] }
const DONE: S = { n: 3, typing: false, card: true, done: [true, true] }

const ASK = 'We just hired our first employee in Ohio. What do we set up?'
const ANSWER = 'Congrats! You need Ohio withholding and unemployment accounts. I’ll add both to your setup now.'
const THANKS = 'Thank you, Dana!'
const ROWS = ['State withholding', 'Unemployment (SUTA)']

const script = async (a: Act<S>) => {
  await a.wait(500)
  a.mark('ask')
  a.put({ n: 1 })
  await a.wait(1100)
  a.mark('typing')
  a.put({ typing: true, n: 2 })
  await a.wait(1700)
  a.mark('answer')
  a.put({ typing: false })
  await a.wait(1300)
  a.mark('setup')
  a.put({ card: true })
  await a.wait(700)
  await a.stagger([0, 1], (i) => a.set((s) => ({ done: s.done.map((v, j) => v || j === i) as [boolean, boolean] })), 520)
  await a.wait(900)
  a.mark('thanks')
  a.put({ n: 3 })
  await a.wait(3000)
}

export default function OnPayExpert() {
  return (
    <Stage<S>
      width={560}
      height={560}
      compact={{ below: 520, width: 358, height: 560 }}
      initial={START}
      poster={DONE}
      script={script}
      play="once"
      fidelity="realistic"
      className="look-onpay ope"
    >
      {(s) => (
        <>
          <section className="ope-chat">
            <div className="ope-head">
              <Avatar name="Dana" size={44} tone="accent" />
              <span className="ope-who">
                <Text className="ope-name">Dana Ruiz</Text>
                <Text className="ope-role">Payroll specialist, US-based</Text>
              </span>
              <Badge tone="success">Live</Badge>
            </div>
            <div className="ope-body">
              <Thread>
                {s.n >= 1 && <Bubble from="me">{ASK}</Bubble>}
                {s.n >= 2 && (
                  <Bubble from="them" typing={s.typing}>
                    {ANSWER}
                  </Bubble>
                )}
                {s.n >= 3 && <Bubble from="me">{THANKS}</Bubble>}
              </Thread>
            </div>
          </section>

          <section className="ope-setup" data-in={s.card || undefined}>
            <Text className="ope-setup-title">Ohio setup</Text>
            {ROWS.map((r, i) => (
              <span key={r} className="ope-row">
                <Check on={s.done[i]} size={18} />
                <Text>{r}</Text>
              </span>
            ))}
          </section>
        </>
      )}
    </Stage>
  )
}
