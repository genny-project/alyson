import Attribute from 'app/BE/attribute'
import { includes, reduce, split } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import Pcm from '..'
import EvtButton from '../components/evt-button'

interface AttributeProps {
  size?: any
  mini?: any
  parentCode?: string
  variant?: any
  config?: {}
  styles?: any
}

const getPcmField = (code: string, mappedPcm: { [x: string]: string }, props?: AttributeProps) => (
  fn: (questionCode: string, attributeCode: string) => JSX.Element | undefined,
) => {
  const splitArr: string[] = split('_')(code)

  let prefix: string

  if (splitArr.length >= 1) {
    prefix = splitArr[0]
  } else {
    //Probably something better that could be done here
    prefix = 'NONE'
  }

  if (prefix === 'PCM') {
    return <Pcm code={code} />
  } else {
    const questionCode = mappedPcm.PRI_QUESTION_CODE
    const wholeData = useSelector(selectCode(questionCode, 'wholeData'))

    const ask: { [x: string]: any } = reduce(
      (acc, ask: { [x: string]: any }) => {
        if (includes(code)(ask.attributeCode)) {
          acc = ask
        }
        return acc
      },
      {},
      wholeData || [],
    )

    if (prefix === 'EVT') {
      return (
        <EvtButton
          key={code}
          questionCode={questionCode}
          childCode={ask?.questionCode}
          iconId={ask?.question?.icon}
        />
      )
    } else {
      return fn ? (
        fn(ask?.questionCode || '', code)
      ) : (
        <Attribute
          key={code}
          attribute={code}
          code={ask?.targetCode}
          size={props?.size}
          mini={props?.mini}
          parentCode={props?.parentCode}
          variant={props?.variant}
          config={props?.config}
          styles={props?.styles}
        />
      )
    }
  }
}
export default getPcmField
