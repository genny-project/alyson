import { Box, Wrap, WrapItem } from '@chakra-ui/react'

import CompanyOverviewCard from 'app/PCM/components/company-overview-card'
import VideoCard from 'app/PCM/components/video-card'

const AboutPanel = ({ targetCode }) => {
  return (
    <Box
      marginRight={'-4rem'}
      marginLeft={'-3.5rem'}
      marginTop={'-1rem'}
      paddingBlock={'2rem'}
      paddingInline={'4rem'}
      borderTop={'1px'}
      borderTopColor={'#B4C1C1'}
    >
      <Wrap paddingInline={'1rem'} spacing={'2.5rem'} marginLeft={'-5rem'}>
        <WrapItem>{<VideoCard targetCode={targetCode} />}</WrapItem>
        <WrapItem>
          <CompanyOverviewCard targetCode={targetCode} />
        </WrapItem>
      </Wrap>
    </Box>
  )
}

export default AboutPanel
