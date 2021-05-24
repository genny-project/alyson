import { Flex, HStack, Spacer, Text } from '@chakra-ui/layout'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { includes } from 'ramda'

const Item = ({ option, idx, onSelectChange, focus, selected }) => {
  const focused = focus === idx

  return (
    <Flex
      direction="row"
      test-id={option.value}
      id={idx + 'item'}
      tabIndex={idx + 1}
      onKeyPress={e => {
        if (e.key === 'Enter') onSelectChange(option.value)
      }}
      onClick={() => onSelectChange(option.value)}
      cursor="pointer"
      key={option.value}
      py="1.5"
      px="3"
      bg={idx % 2 ? 'blackAlpha.50' : ''}
      fontWeight={focused ? 'semibold' : 'normal'}
      _hover={{ fontWeight: 'semibold' }}
    >
      {includes(option.value, selected) ? (
        <FontAwesomeIcon icon={faCheckCircle} color="green" />
      ) : null}
      <Text>{option.label}</Text>
      <Spacer />
      {focus === idx && <Text>⏎</Text>}
    </Flex>
  )
}

export default Item
