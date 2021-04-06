import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

import { useIsMobile } from 'utils/hooks'
import FormMobileView from 'app/ASKS/form/mobile_view'
import FormDesktopView from 'app/ASKS/form/desktop_view'

const AsksForm = ({ questionCode, onFinish, shadow }) => {
  const childAsks = useSelector(selectCode(questionCode)) || []
  const title = useSelector(selectCode(questionCode, 'title'))

  const isMobile = useIsMobile()

  return isMobile ? (
    <FormMobileView
      shadow={shadow}
      title={title}
      childAsks={childAsks}
      onFinish={onFinish}
      questionCode={questionCode}
    />
  ) : (
    <FormDesktopView
      shadow={shadow}
      title={title}
      childAsks={childAsks}
      onFinish={onFinish}
      questionCode={questionCode}
    />
  )
}

export default AsksForm
