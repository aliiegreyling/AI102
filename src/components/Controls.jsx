import { DOMAINS } from '../utils.js'

export default function Controls({
  counts, total, activeDomain, onDomain,
  filterMode, onFilter, onShuffle, onOrder, onReset, onJump,
  viewLen, pos, stats,
}) {
  return (
    <div className="controls">
      <div className="row">
        <div
          className={'chip' + (activeDomain === 'All' ? ' active' : '')}
          onClick={() => onDomain('All')}
        >
          All <span className="n">{total}</span>
        </div>
        {DOMAINS.filter((d) => counts[d]).map((d) => (
          <div
            key={d}
            className={'chip' + (activeDomain === d ? ' active' : '')}
            onClick={() => onDomain(d)}
          >
            {d} <span className="n">{counts[d]}</span>
          </div>
        ))}
      </div>

      <div className="row">
        <span className="small">Show:</span>
        <select value={filterMode} onChange={(e) => onFilter(e.target.value)}>
          <option value="all">All questions</option>
          <option value="unanswered">Only unanswered</option>
          <option value="incorrect">Only incorrect</option>
          <option value="flagged">Only flagged ⚑</option>
          <option value="autograded">Only auto-graded (MC + ordering)</option>
          <option value="sequence">Only drag &amp; drop</option>
        </select>
        <button className="btn" onClick={onShuffle}>🔀 Shuffle</button>
        <button className="btn" onClick={onOrder}>↕ In order</button>
        <button className="btn ghost" onClick={onReset}>↺ Reset progress</button>
        <span className="small">Jump to #</span>
        <input
          className="jump"
          type="number"
          min="1"
          max={viewLen}
          onChange={(e) => onJump(parseInt(e.target.value, 10))}
        />
      </div>

      <div className="row stats">
        <div className="bar">
          <i style={{ width: (viewLen ? ((pos + 1) / viewLen) * 100 : 0) + '%' }} />
        </div>
        <div>Q <b>{viewLen ? pos + 1 : 0}</b>/<b>{viewLen}</b></div>
        <div>Answered <b>{stats.answered}</b></div>
        <div>Correct <b>{stats.correct}</b></div>
        <div>Accuracy <b>{stats.accuracy}</b></div>
      </div>
    </div>
  )
}
