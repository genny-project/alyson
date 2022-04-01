import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import { apiConfig } from 'config/get-api-config'
import { Image } from '@chakra-ui/react'

const AttributeField = ({ code, ...props }) => {
  const dataType = useSelector(selectCode(code))

  console.log('FOUND FROM CODE ' + dataType + ' ' + props.htmlWidth)

  const { realm } = apiConfig
  const appName = convertToUppercase(realm)

  var valueString = useSelector(selectCode('PRJ_' + appName, code))?.valueString

  switch (dataType) {
    case 'DTT_IMAGE':
      return <Image src={valueString} htmlWidth={props.htmlWidth} />
    default:
      return <div>AttributeField for {code}</div>
  }
}

export default AttributeField
