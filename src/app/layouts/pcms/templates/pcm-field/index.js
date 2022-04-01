import { split } from 'ramda'
import Pcms from '../..'
import AttributeField from './attribute-field'

const PcmField = ({ code, ...props }) => {
  if (code === undefined) {
    return <div>{code}</div>
  }

  const splitArr = split('_')(code)

  var prefix = 'none'

  if (splitArr.length > 1) {
    prefix = splitArr[0]
  }

  switch (prefix) {
    case 'PCM':
      return <Pcms code={code} />
    case 'PRI':
      return <AttributeField code={code} {...props} />
    default:
      return <div>{code}</div>
  }
}

export default PcmField
