import { useState } from 'react'
import { letterOf, stripLetter, TYPE_NAMES } from '../utils.js'
import DragOrder from './DragOrder.jsx'

function MultipleChoice({ q, answer, onAnswer }) {
  const [picked, setPicked] = useState([])

  if (answer) {
    return (
      <>
        <div>
          {q.options.map((opt, i) => {
            const L = letterOf(opt, i)
            const isCorrect = q.correct.includes(L)
            const chosen = answer.picked && answer.picked.includes(L)
            let cls = 'opt static'
            if (isCorrect) cls += ' correct'
            else if (chosen) cls += ' wrong'
            if (chosen) cls += ' sel'
            return (
              <div key={L} className={cls}>
                <div className="mk">{L}</div>
                <div>{stripLetter(opt)}</div>
              </div>
            )
          })}
        </div>
        <div className={'feedback ' + (answer.correct ? 'good' : 'bad')}>
          {answer.correct ? '✓ Correct' : '✗ Incorrect — correct: ' + q.correct.join(', ')}
        </div>
      </>
    )
  }

  const toggle = (L) => {
    if (q.type === 'multi') setPicked((p) => (p.includes(L) ? p.filter((x) => x !== L) : [...p, L]))
    else setPicked([L])
  }
  const check = () => {
    if (!picked.length) return
    const arr = [...picked].sort()
    const correct = arr.length === q.correct.length && arr.every((x) => q.correct.includes(x))
    onAnswer({ picked: arr, correct, revealed: true, mc: true })
  }

  return (
    <>
      <div>
        {q.options.map((opt, i) => {
          const L = letterOf(opt, i)
          return (
            <div
              key={L}
              className={'opt' + (picked.includes(L) ? ' sel' : '')}
              onClick={() => toggle(L)}
            >
              <div className="mk">{L}</div>
              <div>{stripLetter(opt)}</div>
            </div>
          )
        })}
      </div>
      <div className="row" style={{ marginTop: 6 }}>
        <button className="btn primary" onClick={check}>Check answer</button>
        {q.type === 'multi' && <span className="small">Select all that apply</span>}
      </div>
    </>
  )
}

function RevealOnly({ q, answer, onAnswer }) {
  const revealed = answer && answer.revealed
  return (
    <>
      {q.options && q.options.length > 0 && (
        <>
          <div className="small" style={{ marginBottom: 4 }}>Choices / segments:</div>
          <div>
            {q.options.map((opt, i) => (
              <div key={i} className="opt static">
                <div className="mk">{letterOf(opt, i)}</div>
                <div>{stripLetter(opt)}</div>
              </div>
            ))}
          </div>
        </>
      )}
      {!revealed && (
        <div className="row">
          <button
            className="btn primary"
            onClick={() => onAnswer({ ...(answer || {}), revealed: true, mc: false, correct: null })}
          >
            Reveal answer
          </button>
          <span className="small">{TYPE_NAMES[q.type]} — self-assess against the model answer</span>
        </div>
      )}
    </>
  )
}

export default function QuestionCard({ q, answer, flagged, onAnswer, onFlag }) {
  let body
  let showAns = false

  if (q.mc) {
    body = <MultipleChoice q={q} answer={answer} onAnswer={onAnswer} />
    showAns = !!answer
  } else if (q.type === 'sequence' && q.order) {
    body = <DragOrder q={q} answer={answer} onAnswer={onAnswer} />
    showAns = !!(answer && answer.checked)
  } else {
    body = <RevealOnly q={q} answer={answer} onAnswer={onAnswer} />
    showAns = !!(answer && answer.revealed)
  }

  return (
    <div className="card">
      <div className="meta">
        <span className="badge dom">{q.domain}</span>
        <span className="badge typ">{TYPE_NAMES[q.type] || q.type}</span>
        {q.label && <span className="badge">{q.label}</span>}
        <span className="badge">PDF p.{q.page}</span>
        <span style={{ flex: 1 }} />
        <button className={'btn flag' + (flagged ? ' on' : '')} onClick={onFlag}>
          {flagged ? '⚑ Flagged' : '⚐ Flag'}
        </button>
      </div>

      <div className="qtext">{q.question}</div>

      {body}

      {showAns && (
        <div className="reveal">
          {q.type === 'sequence' && q.order ? (
            <div className="ans">
              <b>Correct order:</b>
              {'\n' + q.order.map((s, i) => `${i + 1}. ${s}`).join('\n')}
            </div>
          ) : q.correctText ? (
            <div className="ans"><b>Answer:</b> {q.correctText}</div>
          ) : q.mc ? (
            <div className="ans"><b>Answer:</b> {q.correct.join(', ')}</div>
          ) : null}
          {q.explanation && <div className="expl"><b>Why:</b> {q.explanation}</div>}
          {q.mlUrl && (
            <a className="ml" href={q.mlUrl} target="_blank" rel="noopener noreferrer">
              📘 {q.mlTitle || 'Microsoft Learn'} ↗
            </a>
          )}
        </div>
      )}
    </div>
  )
}
