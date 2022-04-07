import { split } from 'ramda'
import Pcm from '..'
import EvtButton from '../components/evt-button'

const getPcmField = (
  code: string,
  fn: (questionCode: string, attributeCode: string, askCode: string) => JSX.Element | undefined,
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
    ////

    if (prefix === 'EVT') {
      return (
        <EvtButton
          questionCode={undefined}
          childCode={undefined}
          onClick={undefined}
          iconId={undefined}
        />
      )
    } else {
      return fn ? fn('HI', 'BYE', 'NO') : <div>UNDEFINED FN</div>
    }
  }
}
export default getPcmField
