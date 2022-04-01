import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { Image } from '@chakra-ui/react'

const AttributeField = ({ code, ...props }) => {
  const dataType = useSelector(selectCode(code))

  console.log('FOUND FROM CODE ' + dataType + ' ' + props.htmlWidth)

  var valueString = useSelector(selectCode(props.entityCode, code))?.valueString

  switch (dataType) {
    case 'DTT_IMAGE':
      return <Image src={valueString} htmlWidth={props.htmlWidth} />
    default:
      return <div>AttributeField for {code}</div>
  }
}

export default AttributeField
