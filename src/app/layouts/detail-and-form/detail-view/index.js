import { Grid, useColorModeValue } from '@chakra-ui/react'
import {
  menteePreference,
  menteeProfessionalDetails,
  personalDetails,
} from 'app/layouts/dashboard/timeline/templates/CardContent'

import DetailCards from 'app/layouts/components/detail_card'
import DetailHeader from 'app/layouts/components/detail_header'

const DetailView = ({ beCode }) => {
  const bg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Grid w="60vw" bg={bg} spacing={4} p="5" overflowY="scroll" top="10vh" gap={'1em'}>
      <DetailHeader beCode={beCode} />
      <Grid
        w={'100%'}
        alignItems="flex-start"
        templateColumns={'repeat(auto-fit, minmax(10rem, 1fr))'}
        gap={'1em'}
      >
        <DetailCards detailsection={personalDetails} currentMentor={beCode} miniCard />
        <DetailCards detailsection={menteeProfessionalDetails} currentMentor={beCode} miniCard />
      </Grid>
      <DetailCards detailsection={menteePreference} currentMentor={beCode} />
    </Grid>
  )
}

export default DetailView
