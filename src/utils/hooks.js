import { useEffect, useRef } from 'react'

export const useInterval = (cb, delay) => {
  const savedCb = useRef()

  useEffect(() => {
    savedCb.current = cb
  }, [cb])

  useEffect(() => {
    const tick = () => {
      savedCb.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id)
      }
    }
  }, [cb, delay])
}
