import Attribute from 'app/BE/attribute'
import { split } from 'ramda'
import Pcm from '../..'
import EvtButton from '../evt-button'

const PcmField = ({ code, ...props }) => {
  if (code === undefined) {
    return <div>{code}</div>
  }

  const splitArr = split('_')(code)

  var prefix
  /// Suffix could be used in that question group idea jasper was discussing
  //var suffix

  if (splitArr.length > 1) {
    prefix = splitArr[0]
    //suffix = splitArr[splitArr.length - 1]
  }

  if (prefix === 'PCM') {
    return <Pcm code={code} />
  } else {
    if (prefix === 'EVT') {
      return <EvtButton />
    } else {
      return <Attribute attribute={code} code={props.parentCode} {...props} />
    }
  }
}

export default PcmField
