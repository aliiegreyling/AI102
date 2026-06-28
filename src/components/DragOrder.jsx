import { useRef, useEffect } from 'react'
import { shufPerm } from '../utils.js'

/**
 * Interactive drag-and-drop ordering question.
 * `q.order` is the list of step texts IN THE CORRECT ORDER.
 * `answer.order` holds the user's current arrangement as indices into q.order.
 */
export default function DragOrder({ q, answer, onAnswer }) {
  const dragSrc = useRef(null)

  // Initialize with a shuffled (never-solved) order the first time we see this question.
  useEffect(() => {
    if (!answer || !answer.order) {
      onAnswer({ order: shufPerm(q.order.length), checked: false, correct: null, mc: true, revealed: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!answer || !answer.order) return null

  const order = answer.order
  const checked = answer.checked

  const move = (from, to) => {
    if (to < 0 || to >= order.length) return
    const a = [...order]
    const [x] = a.splice(from, 1)
    a.splice(to, 0, x)
    onAnswer({ ...answer, order: a, checked: false, correct: null })
  }
  const check = () =>
    onAnswer({ ...answer, checked: true, correct: order.every((o, p) => o === p), mc: true })
  const reshuffle = () =>
    onAnswer({ order: shufPerm(q.order.length), checked: false, correct: null, mc: true, revealed: false })

  const nCorrect = order.filter((o, p) => o === p).length
  const allOk = nCorrect === order.length

  return (
    <div>
      <div className="small" style={{ marginBottom: 4 }}>
        Arrange the steps in the correct order, then Check:
      </div>
      <div>
        {order.map((orig, p) => (
          <div
            key={orig}
            className={'tile' + (checked ? (orig === p ? ' ok' : ' no') : '')}
            draggable
            onDragStart={() => { dragSrc.current = p }}
            onDragEnd={(e) => e.currentTarget.classList.remove('dragging')}
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('over') }}
            onDragLeave={(e) => e.currentTarget.classList.remove('over')}
            onDrop={(e) => {
              e.preventDefault()
              e.currentTarget.classList.remove('over')
              const from = dragSrc.current
              dragSrc.current = null
              if (from != null && from !== p) move(from, p)
            }}
          >
            <div className="grip" title="drag">⠿</div>
            <div className="pos">{p + 1}</div>
            <div className="txt">{q.order[orig]}</div>
            <div className="mv">
              <button onClick={() => move(p, p - 1)} aria-label="move up">▲</button>
              <button onClick={() => move(p, p + 1)} aria-label="move down">▼</button>
            </div>
          </div>
        ))}
      </div>
      {!checked ? (
        <div className="row" style={{ marginTop: 6 }}>
          <button className="btn primary" onClick={check}>Check order</button>
          <button className="btn" onClick={reshuffle}>↻ Shuffle</button>
        </div>
      ) : (
        <>
          <div className={'feedback ' + (allOk ? 'good' : 'bad')}>
            {allOk ? '✓ Correct order!' : `✗ ${nCorrect}/${order.length} steps in the right place`}
          </div>
          <div className="row" style={{ marginTop: 6 }}>
            <button className="btn" onClick={reshuffle}>↻ Try again</button>
          </div>
        </>
      )}
    </div>
  )
}
