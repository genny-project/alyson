import { HStack, useColorModeValue, Flex } from '@chakra-ui/react'

import DetailCards from 'app/layouts/components/detail_card'
import DetailHeader from 'app/layouts/components/detail_header'
import {
  personalDetails,
  professionalDetails,
  preference,
} from 'app/layouts/dashboard/timeline/templates/CardContent'

const DetailView = ({ beCode }) => {
  const bg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Flex
      w="60vw"
      bg={bg}
      spacing={4}
      py="5"
      overflowY="scroll"
      top="10vh"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
    >
      <DetailHeader beCode={beCode} />
      <HStack w="90%">
        <DetailCards detailsection={personalDetails} currentMentor={beCode} miniCard />
        <DetailCards detailsection={professionalDetails} currentMentor={beCode} miniCard />
      </HStack>
      <DetailCards detailsection={preference} currentMentor={beCode} />
    </Flex>
  )
}

export default DetailView
