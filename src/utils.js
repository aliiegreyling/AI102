// Fisher–Yates shuffle (returns a new array)
export function shuffle(arr) {
  const r = [...arr]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

// A random permutation of [0..n-1] that is NOT the identity (so a drag question never starts solved)
export function shufPerm(n) {
  const base = [...Array(n).keys()]
  if (n < 2) return base
  let s
  do {
    s = shuffle(base)
  } while (s.every((v, i) => v === i))
  return s
}

// Letter shown for an option ("A. Foo" -> "A"), falling back to index
export function letterOf(opt, i) {
  const m = /^\s*([A-Z])[.)]/.exec(opt)
  return m ? m[1] : String.fromCharCode(65 + i)
}

// Strip a leading "A. " / "B) " label from an option for display
export function stripLetter(opt) {
  return opt.replace(/^\s*[A-Z][.)]\s*/, '')
}

export const DOMAINS = [
  'Plan & Manage',
  'Generative AI',
  'Agentic',
  'Computer Vision',
  'NLP & Speech',
  'Knowledge Mining & Doc Intelligence',
]

export const TYPE_NAMES = {
  single: 'Single choice',
  multi: 'Multi-select',
  yesno: 'Yes / No',
  hotspot: 'Hotspot',
  sequence: 'Drag & drop',
}
