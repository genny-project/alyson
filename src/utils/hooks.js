import { useBreakpointValue } from '@chakra-ui/media-query'
import { identity } from 'ramda'
import { useEffect, useRef, useState } from 'react'

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

export const useUserMedia = (requestedMedia, setError = identity) => {
  const [mediaStream, setMediaStream] = useState(null)

  useEffect(() => {
    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia)
        setMediaStream(stream)
      } catch (err) {
        setError(err?.message)
      }
    }

    if (!mediaStream) {
      enableStream()
    } else {
      return () => {
        if (mediaStream) {
          mediaStream.getTracks().forEach(track => {
            track.stop()
          })
        }
      }
    }
  }, [mediaStream, requestedMedia, setError])

  return mediaStream
}

export const useIsMobile = () => {
  const isMobile = useBreakpointValue({ base: true, sm: true, md: true, lg: true, xl: false })

  return isMobile
}

export const useMobileValue = ([mobile, base]) => {
  const isMobile = useBreakpointValue({ base: true, sm: true, md: true, lg: true, xl: false })

  return isMobile ? mobile : base
}

export const useIsValid = value => pattern => RegExp(pattern).test(value)
