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
  props?: AttributeProps
  properties?: any
  child: (parameters: PcmFieldParameters) => JSX.Element | undefined
}

interface NonPcmPcmFieldProps {
  code: string
  mappedPcm: { [x: string]: string }
  props?: AttributeProps
  properties?: any
  prefix: string
  child: (parameters: PcmFieldParameters) => JSX.Element | undefined
}

const PcmField: React.FC<PcmFieldProps> = (props): JSX.Element => {
  const splitArr: string[] = split('_')(props?.code) || ''
  const prefix: string = splitArr.length === 0 ? 'NONE' : splitArr[0]

  return equals(prefix, 'PCM') ? (
    <Pcm code={props.code} properties={props.properties} />
  ) : (
    <NonPcmPcmField
      code={props.code}
      mappedPcm={props.mappedPcm}
      props={props.props}
      properties={props.properties}
      prefix={prefix}
      child={props.child}
    />
  )
}

const NonPcmPcmField: React.FC<NonPcmPcmFieldProps> = (props): JSX.Element => {
  const questionGroupCode = props.mappedPcm.PRI_QUESTION_CODE || ''
  const ask = getAskFromAttribute(questionGroupCode)(props.code)

  if (isEmpty(ask)) {
    debugOut.error(`NonPcmPcmField got an empty ask for ${props.code}! Returning a blank div`)
    return <div />
  }

  const isEvt = equals(props.prefix, 'EVT')
  const childUndefined = !props.child

  return (
    <>
      {isEvt && childUndefined && (
        <EvtButton
          key={props.code}
          questionCode={questionGroupCode}
          childCode={ask?.questionCode}
          iconId={ask?.question?.icon}
          vert={false}
        />
      )}
      {!childUndefined &&
        props.child({
          fieldCode: props.code,
          ask: ask,
          question: ask.question,
          props: props.props,
        })}
      {!isEvt && childUndefined && (
        <Attribute
          key={props.code}
          attribute={props.code}
          code={props.props?.parentCode || ask?.targetCode}
          size={props.props?.size}
          mini={props.props?.mini}
          parentCode={props.props?.parentCode || ask?.targetCode}
          variant={props.props?.variant}
          config={props.props?.config}
          styles={props.props?.styles}
          hasIndicatorIcon={props.props?.hasIndicatorIcon}
        />
      )}
    </>
  )
}

export default PcmField
