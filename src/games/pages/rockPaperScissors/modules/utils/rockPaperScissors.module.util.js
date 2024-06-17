export function findWinner(movers, ids) {
  const [r, p, s] = ['🪨', '📄', '✂️']

  if (movers[0] === movers[1]) return 'tie'

  const winningConditions = {
    [r]: s,
    [p]: r,
    [s]: p,
  }

  return winningConditions[movers[0]] === movers[1] ? ids[0] : ids[1]
}
