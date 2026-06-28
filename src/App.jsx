import { useState, useEffect, useMemo, useCallback } from 'react'
import questions from './data/questions.json'
import { shuffle } from './utils.js'
import Controls from './components/Controls.jsx'
import QuestionCard from './components/QuestionCard.jsx'

const LS_KEY = 'ai102quiz_react_v1'

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || {}
  } catch {
    return {}
  }
}

export default function App() {
  const saved = loadState()
  const [answers, setAnswers] = useState(saved.answers || {})
  const [flags, setFlags] = useState(saved.flags || {})
  const [orderIds, setOrderIds] = useState(() => questions.map((q) => q.id))
  const [pos, setPos] = useState(0)
  const [activeDomain, setActiveDomain] = useState('All')
  const [filterMode, setFilterMode] = useState('all')

  // Persist progress
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ answers, flags }))
    } catch {
      /* storage unavailable */
    }
  }, [answers, flags])

  const byId = useMemo(() => Object.fromEntries(questions.map((q) => [q.id, q])), [])
  const counts = useMemo(() => {
    const c = {}
    questions.forEach((q) => { c[q.domain] = (c[q.domain] || 0) + 1 })
    return c
  }, [])

  const view = useMemo(
    () =>
      orderIds.filter((id) => {
        const q = byId[id]
        if (activeDomain !== 'All' && q.domain !== activeDomain) return false
        const a = answers[id]
        if (filterMode === 'unanswered') return !(a && (a.revealed || a.checked))
        if (filterMode === 'incorrect') return a && a.correct === false
        if (filterMode === 'flagged') return !!flags[id]
        if (filterMode === 'autograded') return q.autograded
        if (filterMode === 'sequence') return q.type === 'sequence'
        return true
      }),
    [orderIds, activeDomain, filterMode, answers, flags, byId]
  )

  // Keep position in range when the view shrinks
  useEffect(() => {
    if (pos >= view.length) setPos(Math.max(0, view.length - 1))
  }, [view.length, pos])

  const stats = useMemo(() => {
    const ids = orderIds.filter(
      (id) => (activeDomain === 'All' || byId[id].domain === activeDomain) && byId[id].autograded
    )
    let answered = 0
    let correct = 0
    ids.forEach((id) => {
      const a = answers[id]
      if (a && a.correct !== null && a.correct !== undefined) {
        answered++
        if (a.correct) correct++
      }
    })
    return {
      answered,
      correct,
      accuracy: answered ? Math.round((correct / answered) * 100) + '%' : '—',
    }
  }, [orderIds, activeDomain, answers, byId])

  const setAnswer = useCallback((id, ans) => setAnswers((prev) => ({ ...prev, [id]: ans })), [])
  const toggleFlag = useCallback((id) => setFlags((prev) => ({ ...prev, [id]: !prev[id] })), [])

  const resetAll = () => {
    if (window.confirm('Clear all your answers and flags?')) {
      setAnswers({})
      setFlags({})
    }
  }
  const doShuffle = () => { setOrderIds(shuffle(questions.map((q) => q.id))); setPos(0) }
  const inOrder = () => { setOrderIds(questions.map((q) => q.id)); setPos(0) }
  const onDomain = (d) => { setActiveDomain(d); setPos(0) }
  const onFilter = (f) => { setFilterMode(f); setPos(0) }
  const onJump = (n) => { if (n >= 1 && n <= view.length) setPos(n - 1) }

  const current = view.length ? byId[view[pos]] : null

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return
      if (e.key === 'ArrowRight') setPos((p) => Math.min(p + 1, view.length - 1))
      else if (e.key === 'ArrowLeft') setPos((p) => Math.max(p - 1, 0))
      else if ((e.key === 'f' || e.key === 'F') && current) toggleFlag(current.id)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [view.length, current, toggleFlag])

  return (
    <div className="wrap">
      <header>
        <div>
          <h1>AI-102 Practice Quiz</h1>
          <p className="sub">
            Designing &amp; Implementing a Microsoft Azure AI Solution · {questions.length} questions ·
            answers verified against Microsoft Learn
          </p>
        </div>
        <div className="pill">Practice mode</div>
      </header>

      <div className="banner">
        ⚠️ AI-102 retires <b>30 June 2026</b>. Answers cross-checked against Microsoft docs; where a
        source&apos;s mark conflicted with documentation, the documented answer is used and noted.{' '}
        <b>Drag &amp; drop:</b> reorder the tiles (drag, or use ▲▼) then press <b>Check order</b>.
      </div>

      <Controls
        counts={counts}
        total={questions.length}
        activeDomain={activeDomain}
        onDomain={onDomain}
        filterMode={filterMode}
        onFilter={onFilter}
        onShuffle={doShuffle}
        onOrder={inOrder}
        onReset={resetAll}
        onJump={onJump}
        viewLen={view.length}
        pos={pos}
        stats={stats}
      />

      {current ? (
        <QuestionCard
          key={current.id}
          q={current}
          answer={answers[current.id]}
          flagged={!!flags[current.id]}
          onAnswer={(ans) => setAnswer(current.id, ans)}
          onFlag={() => toggleFlag(current.id)}
        />
      ) : (
        <div className="card">
          <div className="qtext">No questions match this filter.</div>
        </div>
      )}

      <div className="foot">
        <div className="small">
          Tip: <span className="kbd">←</span>/<span className="kbd">→</span> navigate ·{' '}
          <span className="kbd">F</span> flag · click options / drag tiles to answer
        </div>
        <div className="nav">
          <button className="btn" onClick={() => setPos((p) => Math.max(p - 1, 0))}>← Prev</button>
          <button className="btn primary" onClick={() => setPos((p) => Math.min(p + 1, view.length - 1))}>
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
