export function secondsTo(secs) {
  const min = Math.floor(secs / 60)
  const sec = Math.floor(secs % 60)

  const minStr = min ? (min === 1 ? `${min}min` : `${min}mins`) : ''
  const secStr = sec <= 1 ? `${sec}sec` : `${sec}secs`

  const res = `${minStr} ${secStr}`.trim()
  return res
}
