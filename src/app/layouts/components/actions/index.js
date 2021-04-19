import { map } from 'ramda'
import { HStack } from '@chakra-ui/react'
import Action from 'app/BE/action'

const Actions = ({ actions, sbeCode, beCode }) => {
  return (
    <HStack mb="1rem">
      {actions &&
        map(action => (
          <Action
            parentCode={sbeCode}
            code={action}
            targetCode={beCode}
            key={action}
            size="md"
            colorScheme="blue"
          />
        ))(actions)}
    </HStack>
  )
}

export default Actions
