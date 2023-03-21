import { Button, Text } from '@chakra-ui/react'

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import debounce from 'lodash.debounce'
import { useState } from 'react'

const FavouriteComponent = ({ starred, sourceCode, targetCode, showLabel }) => {
  const [isStarred, setIsStarred] = useState(starred)

  const sendEvt = value => {
    sendEvtClick({
      targetCode: targetCode,
      sourceCode: sourceCode,
      attributeCode: 'ACT_FAV_TOGGLE',
      value: value,
    })
  }
  const debouncedEvt = debounce(sendEvt, 500)

  const onClick = () => {
    const newStarred = !isStarred

    debouncedEvt(newStarred)
    setIsStarred(newStarred)
  }

  return (
    <Button
      onClick={onClick}
      m={0}
      p={0}
      bg="#ffffff"
      padding={1}
      h={'auto'}
      w={'auto'}
      borderRadius={0}
      _focus={{ outline: 'none' }}
    >
      <FontAwesomeIcon
        position="absolute"
        icon={faStar}
        size="sm"
        color={isStarred ? 'product.primary' : '#C0C0C0'}
      />
      {!!showLabel && (
        <Text as="span" ml={2}>
          {isStarred ? 'Remove from Favourite' : 'Add to Favourite'}
        </Text>
      )}
    </Button>
  )
}

export default FavouriteComponent
