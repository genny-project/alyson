import { Center, Text, VStack } from '@chakra-ui/layout'
import { selectAttributes } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { Button } from '@chakra-ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import Recommendations from './recommendations'
import Process from 'app/layouts/process'

const Intern = ({ userCode }) => {
  const [name] = useSelector(selectAttributes(userCode, ['PRI_NAME']))

  return (
    <Center>
      <VStack spacing="6">
        <Text fontSize="3xl" fontWeight="medium">
          {`Welcome ${name?.value}`}
        </Text>
        <Button
          onClick={() =>
            onSendMessage({
              code: 'QUE_TREE_ITEM_INTERNSHIPS',
              parentCode: 'QUE_TREE_ITEM_INTERNSHIPS',
            })
          }
          colorScheme="gradient"
          leftIcon={<FontAwesomeIcon icon={faSearch} />}
          rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
          size="lg"
          boxShadow="lg"
        >
          {`Find an Internship`}
        </Button>
        <Process dashboard />
        <Recommendations />
      </VStack>
    </Center>
  )
}

export default Intern
