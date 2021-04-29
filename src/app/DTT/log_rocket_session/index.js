import LogRocket from 'logrocket'
import { useEffect } from 'react'

const Write = ({ onSendAnswer }) => {
  useEffect(() => {
    LogRocket.getSessionURL(onSendAnswer)
    LogRocket.captureMessage('Help triggered!')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

const LogRocketSession = {
  Write,
}

export default LogRocketSession
