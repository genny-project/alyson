import { useCallback, useEffect, useRef, useState } from 'react'

const useIsMountedRef = () => {
  const ref = useRef(null)
  ref.current = true

  useEffect(() => {
    return () => {
      ref.current = false
    }
  })

  return ref
}

const useStateMounted = (...args) => {
  const isMountedRef = useIsMountedRef()

  const [state, originalSetState] = useState(...args)

  const setState = useCallback(
    (...args) => {
      if (isMountedRef.current) {
        originalSetState(...args)
      }
    },
    [isMountedRef],
  )

  return [state, setState]
}

export default useStateMounted
