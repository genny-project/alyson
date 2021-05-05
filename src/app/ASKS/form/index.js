import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

import { useIsMobile } from 'utils/hooks'
import FormMobileView from 'app/ASKS/form/mobile_view'
import FormDesktopView from 'app/ASKS/form/desktop_view'

const AsksForm = ({ questionCode, onFinish, dialog }) => {
  const childAsks = useSelector(selectCode(questionCode)) || []
  const title = useSelector(selectCode(questionCode, 'title'))
  const config = useSelector(selectCode(questionCode, 'config'))

  return useIsMobile() || dialog ? (
    <FormMobileView
      title={title}
      childAsks={childAsks}
      onFinish={onFinish}
      questionCode={questionCode}
      config={config}
    />
  ) : (
    <FormDesktopView
      title={title}
      childAsks={childAsks}
      onFinish={onFinish}
      questionCode={questionCode}
      config={config}
    />
  )
}

export default AsksForm
