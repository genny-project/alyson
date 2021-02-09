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

export const useUserMedia = (requestedMedia, setError) => {
  const [mediaStream, setMediaStream] = useState(null)

  useEffect(() => {
    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia)
        setMediaStream(stream)
      } catch (err) {
        setError(err)
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

export default useUserMedia
