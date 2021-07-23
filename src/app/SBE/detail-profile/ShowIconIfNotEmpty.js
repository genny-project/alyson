import { useSelector } from 'react-redux'
import { HStack } from '@chakra-ui/layout'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import { selectCode } from 'redux/db/selectors'

const ShowIconIfNotEmpty = ({ icon, attr, attrSecond, config, beCode }) => {
  const hasValue = useSelector(selectCode(beCode, attr))?.value
  return !!hasValue ? (
    <HStack spacing={4}>
      <FontAwesomeIcon icon={icon} opacity="0.6" fixedWidth />
      <Attribute code={beCode} attribute={attr} config={config} />
      {attrSecond && <Attribute code={beCode} attribute={attrSecond} config={config} />}
    </HStack>
  ) : null
}

export default ShowIconIfNotEmpty
