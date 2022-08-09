import { equals, isEmpty } from 'ramda'

import Attribute from 'app/BE/attribute'
import EvtButton from '../evt-button'
import React from 'react'
import debugOut from 'utils/debug-out'
import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'
import { NonPcmPcmFieldProps } from 'app/PCM/components/pcm-field/types'

const NonPcmPcmField: React.FC<NonPcmPcmFieldProps> = (props): JSX.Element => {
  const { prefix, child, code, mappedPcm, config } = props

  const questionGroupCode = mappedPcm.PRI_QUESTION_CODE || ''
  const ask = getAskFromAttribute(questionGroupCode)(code)

  if (isEmpty(ask)) {
    debugOut.error(`NonPcmPcmField got an empty ask for ${props.code}! Returning a blank div`)
    return <div />
  }

  const isEvt = equals(prefix, 'EVT')

  return (
    <>
      {isEvt && !child && (
        <EvtButton
          key={code}
          questionCode={questionGroupCode}
          childCode={ask?.questionCode}
          iconId={ask?.question?.icon}
          vert={false}
        />
      )}
      {!!child &&
        child({
          fieldCode: code,
          ask: ask,
          question: ask.question,
          props: config,
        })}
      {!isEvt && !child && (
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
      )}
    </>
  )
}

export default NonPcmPcmField
