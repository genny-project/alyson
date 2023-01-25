import { useState, useEffect } from 'react'

const useIsMobileView = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    isMobileView: width < 768,
  }
}

export default useIsMobileView
