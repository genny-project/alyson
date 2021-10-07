import { selectAttributes, selectCode } from 'redux/db/selectors'

import LogRocket from 'logrocket'
import getUserType from 'utils/helpers/get-user-type'
import { isDev } from 'utils/developer'
import showLogs from 'utils/helpers/show-logs'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const LogrocketIdentifier = () => {
  const showConsoleLogs = showLogs()
  const code = useSelector(selectCode('USER'))
  const [nameData, emailData] = useSelector(selectAttributes(code, ['PRI_NAME', 'PRI_EMAIL']))
  const type = getUserType(useSelector(selectCode(code)))

  useEffect(() => {
    if (code) {
      const name = nameData?.value
      const email = emailData?.value
      if (showConsoleLogs) {
        console.log('logrocket identified')
      }
      LogRocket.identify(email, { code, name, email, type, isDev })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  return null
}

export default LogrocketIdentifier
