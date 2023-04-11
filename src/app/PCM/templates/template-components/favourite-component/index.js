import { Button, Text } from '@chakra-ui/react'

import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import debounce from 'lodash.debounce'
import { useEffect, useState } from 'react'
import { Iconly } from 'react-iconly'
import stringify from 'utils/helpers/stringify'

const FavouriteComponent = ({ starred, sourceCode, targetCode, showLabel }) => {
  const [isStarred, setIsStarred] = useState(starred)

  const sendEvt = value => {
    sendEvtClick({
      targetCode: targetCode,
      sourceCode: sourceCode,
      code: 'ACT_FAV_TOGGLE',
      value: stringify(value),
    })
  }
  const debouncedEvt = debounce(sendEvt, 500)

  useEffect(() => {
    setIsStarred(starred)
  }, [isStarred, starred])

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
      padding={1}
      h={'auto'}
      w={'auto'}
      borderRadius={0}
      bg={'transparent'}
      _focus={{ outline: 'none', bg: 'transparent' }}
      _active={{ outline: 'none', bg: 'transparent' }}
      _focusVisible={{ outline: 'none', bg: 'transparent' }}
      _hover={{ bg: 'transparent' }}
    >
      <Iconly name="Star" set={isStarred ? 'bold' : 'two-tone'} />
      {!!showLabel && (
        <Text as="span" ml={2} borderBottom={'1px solid currentColor'}>
          {isStarred ? 'Remove from Favourite' : 'Add to Favourite'}
        </Text>
      )}
    </Button>
  )
}

export default FavouriteComponent
