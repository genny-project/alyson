import { Grid, Spacer, VStack } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const DetailHeader = ({ beCode }) => {
  const name = useSelector(selectCode(beCode, 'PRI_NAME'))?.value
  const video = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))?.value
  const videoMentee = useSelector(selectCode(beCode, '_LNK_MENTEE__PRI_VIDEO_URL'))?.value

  return (
    <>
      {video || videoMentee ? (
        <Grid
          w="95%"
          justifyContent="space-between"
          bg="gradient.900"
          mb={5}
          templateColumns={'1fr 2fr'}
          gap={'1rem'}
        >
          <VStack justifyContent="center" spacing={5} m="auto" paddingX={'0.5rem'}>
            <Attribute
              config={{ size: 'xl', name: name }}
              code={beCode}
              attribute="PRI_USER_PROFILE_PICTURE"
            />

            <Attribute
              config={{ size: 'xl', name: name }}
              code={beCode}
              attribute="_LNK_MENTEE__PRI_USER_PROFILE_PICTURE"
            />
            <Attribute config={{ textStyle: 'head.3' }} code={beCode} attribute="PRI_NAME" />
          </VStack>
          <VStack>
            <Attribute code={beCode} attribute="PRI_VIDEO_URL" />
            <Attribute code={beCode} attribute="_LNK_MENTEE__PRI_VIDEO_URL" />
          </VStack>
        </Grid>
      ) : (
        <VStack mb={5}>
          <Attribute
            config={{ size: 'xl', name: name }}
            code={beCode}
            attribute="PRI_USER_PROFILE_PICTURE"
          />
          <Attribute
            config={{ size: 'xl', name: name }}
            code={beCode}
            attribute="_LNK_MENTEE__PRI_USER_PROFILE_PICTURE"
          />
          <Spacer />
          <Attribute config={{ textStyle: 'head.3' }} code={beCode} attribute="PRI_NAME" />
        </VStack>
      )}
    </>
  )
}

export default DetailHeader
