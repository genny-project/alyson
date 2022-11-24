import { equals, isEmpty, not } from 'ramda'

import Attribute from 'app/BE/attribute'
import EvtButton from '../evt-button'
import debugOut from 'utils/debug-out'
import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'
import showTemplateNames from 'utils/helpers/show-template-names'
import Ask from 'app/ASKS/ask'
import QuestionEvents from 'app/ASKS/question-events'

const NonPcmPcmField = props => {
  const { prefix, child, code, mappedPcm, config, evtValue } = props
  const questionGroupCode = mappedPcm?.PRI_QUESTION_CODE || ''
  const { ask, isChildAsk } = getAskFromAttribute(questionGroupCode)(code)
  const isEvt = equals(prefix, 'EVT') || equals(prefix, 'QQQ')
  const isQueEvent = equals(code, 'QUE_EVENTS')
  const renderEventButton = isEvt && !child
  const renderChild = not(renderEventButton) && !!child
  const isReadOnly = config?.readonly ?? ask?.readonly ?? true
  const renderAttribute = not(renderChild) && !isEvt && !child && isReadOnly
  const renderAsk = not(renderChild) && !isEvt && !child && not(isReadOnly)
  if (isEmpty(ask)) {
    debugOut.error(`NonPcmPcmField got an empty ask for ${props.code}! Returning a blank div`)
    return showTemplateNames ? <div>Empty ask for {props.code}</div> : <div />
  }
  if (isQueEvent) {
    return <QuestionEvents mappedPcm={mappedPcm} />
  }

  return renderEventButton ? (
    <EvtButton
      key={code}
      questionCode={questionGroupCode}
      childCode={isChildAsk ? ask?.questionCode : 'raw'}
      iconId={ask?.question?.icon}
      vert={false}
      value={evtValue}
      isNotChildAsk={!isChildAsk}
    />
  ) : renderChild ? (
    child({
      fieldCode: code,
      ask: ask,
      question: ask?.question,
      props: config,
    })
  ) : renderAttribute ? (
    <Attribute
      key={code}
      attribute={code}
      code={config?.parentCode || ask?.targetCode}
      size={config?.size}
      mini={config?.mini}
      parentCode={config?.parentCode || ask?.targetCode}
      variant={config?.variant}
      config={config?.config}
      styles={config?.styles}
      hasIndicatorIcon={config?.hasIndicatorIcon}
    />
  ) : renderAsk ? (
    <Ask
      key={code}
      parentCode={isChildAsk ? questionGroupCode ?? ask?.parentCode : ask?.questionCode}
      questionCode={isChildAsk ? ask?.questionCode : 'raw'}
      config={config?.config}
      noLabel={undefined}
      secondaryColor={undefined}
      onFinish={undefined}
      passedAskData={undefined}
      passedTargetCode={config?.parentCode ?? ask?.targetCode}
      answerCallback={config?.answerCallback}
      skipRedux={config?.skipRedux ?? false}
    />
  ) : (
    <div />
  )
}

export default NonPcmPcmField
