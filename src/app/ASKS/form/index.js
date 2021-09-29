import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

import { useIsMobile } from 'utils/hooks'
import FormMobileView from 'app/ASKS/form/mobile_view'
import FormDesktopView from 'app/ASKS/form/desktop_view'
import VideoModules from './variations/video_modules'

const AsksForm = ({ questionCode, onFinish, dialog }) => {
  const childAsks = useSelector(selectCode(questionCode)) || []
  const title = useSelector(selectCode(questionCode, 'title'))
  const config = useSelector(selectCode(questionCode, 'config'))
  const isMobile = useIsMobile()

  if (
    questionCode === 'QUE_MENTEE_TRAINING_MODULE_ONE_GRP' ||
    questionCode === 'QUE_MENTOR_TRAINING_MODULE_ONE_GRP'
  )
    return <VideoModules questionCode={questionCode} />

  return isMobile() || dialog ? (
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
