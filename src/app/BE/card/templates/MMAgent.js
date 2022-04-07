import { Box, Flex, HStack, VStack } from '@chakra-ui/react'

import Card from 'app/layouts/components/card'
import Image from 'app/DTT/upload/Image'
import Text from 'app/DTT/text'
import { motion } from 'framer-motion'
import sameValue from 'redux/utils/same-value'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const MotionBox = motion(Box)

const MMAgent = ({ parentCode, actions = [], code, columns }) => {
  const mentorName = useSelector(selectCode(code, '_LNK_MENTOR__PRI_NAME'), sameValue)
  const mentorImage = useSelector(
    selectCode(code, '_LNK_MENTOR__PRI_USER_PROFILE_PICTURE'),
    sameValue,
  )
  const mentorIndustry = useSelector(
    selectCode(code, '_LNK_MENTOR__LNK_MM_INDUSTRY__PRI_NAME'),
    sameValue,
  )

  const menteeName = useSelector(selectCode(code, '_LNK_MENTEE__PRI_NAME'), sameValue)
  const menteeImage = useSelector(
    selectCode(code, '_LNK_MENTEE__PRI_USER_PROFILE_PICTURE'),
    sameValue,
  )
  const menteeIndustry = useSelector(
    selectCode(code, '_LNK_MENTEE__LNK_MM_INDUSTRY__PRI_NAME'),
    sameValue,
  )

  return (
    <MotionBox w="full" whileHover={{ scale: 1.02 }} transition={{ duration: 0.1 }}>
      <Card
        // maxW={['80vw', '80vw', '22rem']}
        p={[2, 2, 2, 4]}
        variant="card1"
      >
        <Flex align="start" direction={'column'}>
          <HStack align="start">
            <Image.Read
              config={{ size: 'lg' }}
              data={mentorImage || { baseEntityCode: code }}
              // parentCode={parentCode}
            />

            <VStack alignItems="start" minW="10rem" maxW="16rem" overflow="hidden" spacing={1}>
              <Box>Mentor</Box>
              <Text.Read
                data={mentorName}
                config={{
                  textStyle: 'body.1',
                  isTruncated: true,
                  maxW: '10rem',
                }}
              />
              <Text.Read
                config={{
                  as: 'span',
                  textStyle: 'body.3',
                  maxW: '10rem',
                }}
                data={mentorIndustry}
              />
            </VStack>
          </HStack>

          <HStack mt={4} align="start">
            <Image.Read
              config={{ size: 'lg' }}
              data={menteeImage || { baseEntityCode: code }}
              // parentCode={parentCode}
            />

            <VStack alignItems="start" minW="10rem" maxW="16rem" overflow="hidden" spacing={1}>
              <Box>Mentee</Box>

              <Text.Read
                config={{
                  textStyle: 'body.1',
                  isTruncated: true,
                  maxW: '10rem',
                }}
                data={menteeName}
              />
              <Text.Read
                config={{
                  as: 'span',
                  textStyle: 'body.3',
                  maxW: '10rem',
                }}
                data={menteeIndustry}
              />
            </VStack>
          </HStack>
        </Flex>
      </Card>
    </MotionBox>
  )
}

export default MMAgent
