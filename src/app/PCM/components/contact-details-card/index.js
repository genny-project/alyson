import { Box, Grid, HStack, Text, VStack } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute/index.js'
import { Iconly } from 'react-iconly'
import { useIsMobile } from 'utils/hooks'

const ContactDetailsCard = ({ targetCode }) => {
  const title = 'Contact Details'
  const isMobile = useIsMobile()

  return (
    <Box
      width={'33rem'}
      height={'10rem'}
      bg={'#FFFFFF'}
      borderRadius={'2.5rem'}
      paddingInline={'1rem'}
      fontFamily={'Almarai'}
    >
      <Grid
        templateColumns={isMobile ? '1fr' : '1fr 1fr'}
        paddingInline={'3rem'}
        paddingBlock={'2rem'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
      >
        <Text fontSize={'20px'}>{title}</Text>

        <VStack alignItems={'flex-start'}>
          <HStack>
            <Iconly name={'Call'} set={'light'} />
            <Attribute code={targetCode} attribute={'PRI_MOBILE'} />
          </HStack>
          <HStack>
            <Iconly name={'Message'} set={'two-tone'} />
            <Attribute code={targetCode} attribute={'PRI_EMAIL'} />
          </HStack>
        </VStack>
      </Grid>
    </Box>
  )
}

export default ContactDetailsCard
