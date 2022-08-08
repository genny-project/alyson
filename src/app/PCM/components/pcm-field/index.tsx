import { equals, isEmpty, split } from 'ramda'

import Attribute from 'app/BE/attribute'
import EvtButton from '../evt-button'
import Pcm from 'app/PCM'
import React from 'react'
import debugOut from 'utils/debug-out'
import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'

interface AttributeProps {
  size?: any
  mini?: any
  parentCode?: string
  variant?: any
  config?: {}
  styles?: any
  hasIndicatorIcon?: any
}

interface PcmFieldParameters {
  fieldCode: string
  ask: any
  question: any
  props?: AttributeProps
}

interface PcmFieldProps {
  code: string
  mappedPcm: { [x: string]: string }
  config?: AttributeProps
  properties?: any
  child: (parameters: PcmFieldParameters) => JSX.Element
}

interface NonPcmPcmFieldProps {
  code: string
  mappedPcm: { [x: string]: string }
  config?: AttributeProps
  properties?: any
  prefix: string
  child: (parameters: PcmFieldParameters) => JSX.Element
}

const PcmField: React.FC<PcmFieldProps> = ({
  code,
  mappedPcm,
  properties,
  child,
  config,
}): JSX.Element => {
  const splitArr: string[] = split('_')(code) || ''
  const prefix: string = splitArr.length === 0 ? 'NONE' : splitArr[0]

  return equals(prefix)('PCM') ? (
    <Pcm code={code} properties={properties} />
  ) : (
    <NonPcmPcmField
      code={code}
      mappedPcm={mappedPcm}
      config={config}
      properties={properties}
      prefix={prefix}
      child={child}
    />
  )
}

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

export default PcmField
