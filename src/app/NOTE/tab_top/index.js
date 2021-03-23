import { HStack, Text } from '@chakra-ui/layout'
import { Tab } from '@chakra-ui/tabs'
import Attribute from 'app/BE/attribute'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const TabTop = ({ targetCode }) => {
  const name = useSelector(selectCode(targetCode, 'PRI_NAME'))

  return (
    <Tab>
      <HStack>
        <Attribute code={targetCode} attribute={'PRI_IMAGE_URL'} />
        <Text>{name?.value || targetCode}</Text>
      </HStack>
    </Tab>
  )
}

export default TabTop
