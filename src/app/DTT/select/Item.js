import { HStack, Text } from '@chakra-ui/layout'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { includes } from 'ramda'

const Item = ({ option, idx, onSelectChange, focus, selected }) => {
  return (
    <HStack
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
      color={focus === idx ? 'teal' : ''}
      _hover={{ color: 'teal' }}
    >
      {includes(option.value, selected) ? (
        <FontAwesomeIcon icon={faCheckCircle} color="green" />
      ) : null}
      <Text textStyle="body.2">{option.label}</Text>
      {focus === idx && <div>⏎</div>}
    </HStack>
  )
}

export default Item
