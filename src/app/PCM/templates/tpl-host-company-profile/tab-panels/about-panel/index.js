import { Box, Wrap, WrapItem } from '@chakra-ui/react'
import CompanyOverviewCard from 'app/PCM/components/company-overview-card'
import VideoCard from 'app/PCM/components/video-card'

const AboutPanel = () => {
  return (
    <Box
      bg={'#CAEAE9'}
      minW={'-moz-max-content'}
      minHeight={'100vh'}
      // marginBottom={'-1.5rem'}
      // marginRight={'-4rem'}
      marginLeft={'-6.5rem'}
      // marginTop={'-1rem'}
      paddingBlock={'2rem'}
      paddingInline={'4rem'}
      borderTop={'1px'}
      borderTopColor={'#B4C1C1'}
    >
      <Wrap spacing={'2.25rem'} alignItems={'center'}>
        <WrapItem>
          <VideoCard />
        </WrapItem>
        <WrapItem>
          <CompanyOverviewCard />
        </WrapItem>
      </Wrap>
    </Box>
  )
}

export default AboutPanel
