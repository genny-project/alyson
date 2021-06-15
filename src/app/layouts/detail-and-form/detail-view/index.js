import { useSelector } from 'react-redux'
import { VStack, HStack, useColorModeValue, Flex } from '@chakra-ui/react'

import DetailCards from 'app/layouts/dashboard/timeline/templates/DetailCards'
import Attribute from 'app/BE/attribute'
import {
  personalDetails,
  professionalDetails,
  preference,
} from 'app/layouts/dashboard/timeline/templates/CardContent'
import { selectCode } from 'redux/db/selectors'
import { selectMentee } from 'redux/db/selectors'

const DetailView = () => {
  const menteeCodes = useSelector(selectMentee)
  const mentee = menteeCodes?.[0]
  const name = useSelector(selectCode(mentee, 'PRI_NAME'))?.value
  const bg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Flex
      w="50vw"
      bg={bg}
      spacing={4}
      p="3"
      overflowY="scroll"
      top="10vh"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
    >
      <Flex
        w="90%"
        justifyContent="space-between"
        bgGradient="linear(to-r, teal.500,green.500)"
        mb={5}
      >
        <VStack justifyContent="center" spacing={5} m="auto">
          <Attribute config={{ size: 'xl', name: name }} code={mentee} attribute="PRI_IMAGE_URL" />
          <Attribute config={{ textStyle: 'head.3' }} code={mentee} attribute="PRI_NAME" />
        </VStack>
        <VStack>
          <Attribute code={mentee} attribute="PRI_VIDEO_URL" />
        </VStack>
      </Flex>

      <HStack w="90%">
        <DetailCards detailsection={personalDetails} currentMentor={mentee} miniCard />
        <DetailCards detailsection={professionalDetails} currentMentor={mentee} miniCard />
      </HStack>
      <DetailCards detailsection={preference} currentMentor={mentee} />
    </Flex>
  )
}

export default DetailView
