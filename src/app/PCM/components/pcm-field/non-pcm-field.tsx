import { equals, isEmpty, not } from 'ramda'

import Attribute from 'app/BE/attribute'
import EvtButton from '../evt-button'
import React from 'react'
import debugOut from 'utils/debug-out'
import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'
import { NonPcmPcmFieldProps } from 'app/PCM/components/pcm-field/types'

const NonPcmPcmField: React.FC<NonPcmPcmFieldProps> = (props): JSX.Element => {
  const { prefix, child, code, mappedPcm, config } = props
  const questionGroupCode = mappedPcm?.PRI_QUESTION_CODE || ''
  const ask = getAskFromAttribute(questionGroupCode)(code)
  const isEvt = equals(prefix, 'EVT')
  const renderEventButton = isEvt && !child
  const renderChild = not(renderEventButton) && !!child
  const renderAttribute = not(renderChild) && !isEvt && !child

  if (isEmpty(ask)) {
    debugOut.error(`NonPcmPcmField got an empty ask for ${props.code}! Returning a blank div`)
    return <div />
  }

  return renderEventButton ? (
    <EvtButton
      key={code}
      questionCode={questionGroupCode}
      childCode={ask?.questionCode}
      iconId={ask?.question?.icon}
      vert={false}
    />
  ) : renderChild ? (
    child({
      fieldCode: code,
      ask: ask,
      question: ask.question,
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
  ) : (
    <div />
  )
}

export default NonPcmPcmField
