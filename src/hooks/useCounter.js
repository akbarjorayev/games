import { useEffect, useState } from 'react'

export function useCounter(initialCount = 0, interval = 1000) {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
    }, interval)

    return () => clearInterval(intervalId)
  }, [interval])

  return [count]
}
