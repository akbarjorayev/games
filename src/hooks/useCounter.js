import { useEffect, useState } from 'react'

export function useCounter(stop = false, initialCount = 0, interval = 1000) {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    if (stop) return
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
    }, interval)

    return () => clearInterval(intervalId)
  }, [stop, initialCount, interval])

  return [count]
}
