import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Avatar, Box, Flex, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import useApi from 'api'
import getActions from 'app/SBE/utils/get-actions'
import Attribute from 'app/BE/attribute'
import Action from 'app/BE/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCompactDisc,
  faEnvelopeOpenText,
  faObjectGroup,
  faTimesCircle,
  faUser,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons'
import { closeDrawer } from 'redux/app'
import { map } from 'ramda'
import Player from 'app/DTT/video/Player'
import { useIsMobile } from 'utils/hooks'
import InternsMobileView from './mobile_view'

const Intern = ({ sbeCode, targetCode }) => {
  const isMobile = useIsMobile()
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const image = useSelector(selectCode(beCode, 'PRI_IMAGE_URL'))
  const internsName = useSelector(selectCode(beCode, 'PRI_NAME'))
  const video = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))
  const careerObj = useSelector(selectCode(beCode, 'PRI_CAREER_OBJ'))

  const { getImageSrc, getSrc } = useApi()
  const videoSrc = getSrc(video?.value)
  const src = getImageSrc(image?.value)

  const actions = getActions(sbe)

  const [topHeight, setTopHeight] = useState('35vh')

  const handleScroll = () => {
    if (topHeight !== '0') setTopHeight('0')
  }

  useEffect(() => {
    !videoSrc && !careerObj?.value ? setTopHeight('0') : setTopHeight('35vh')
  }, [careerObj?.value, videoSrc])

  const videoStyle = {
    width: '50%',
    borderTopLeftRadius: '0.5rem',
    height: topHeight,
    transition: 'height 1s',
  }

  if (!beCode) return null

  return isMobile ? (
    <InternsMobileView
      onClose={onClose}
      careerObj={careerObj}
      videoSrc={videoSrc}
      internsName={internsName}
      beCode={beCode}
      actions={actions}
      src={src}
      sbeCode={sbeCode}
    />
  ) : (
    <Box
      w="70vw"
      h="90vh"
      style={{
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem',
      }}
    >
      <Box position="absolute" right="2" top="2">
        <IconButton
          onClick={onClose}
          color={topHeight === '0' ? 'darkgrey' : 'white'}
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
        />
      </Box>
      <Flex
        onClick={() => setTopHeight('35vh')}
        justifyContent="center"
        borderTopLeftRadius="0.5rem"
        borderTopRightRadius="0.5rem"
        bgGradient="linear(to-br, teal.400,blue.500)"
      >
        {videoSrc && (
          <Flex
            flexGrow="1"
            maxWidth="50%"
            minWidth="50%"
            height={topHeight}
            transition="height 1s"
            background="gray.100"
            borderTopLeftRadius={careerObj?.value ? '0.5rem' : ''}
          >
            <Player src={videoSrc} styles={videoStyle} />
          </Flex>
        )}
        {careerObj?.value && (
          <Flex
            flexGrow="1"
            maxWidth="50%"
            minWidth="50%"
            height={topHeight}
            transition="height 1s"
            borderTopRightRadius="0.5rem"
            borderTopLeftRadius={video?.value ? '' : '0.5rem'}
            overflow="hidden"
          >
            <Box
              p={video?.value ? '16px 48px 64px 40px' : '16px 48px 80px 40px'}
              overflow="hidden"
              m="auto"
            >
              <Text
                textStyle="head1"
                dangerouslySetInnerHTML={{ __html: careerObj?.value }}
                noOfLines={[3, 4]}
                color="white"
              />
            </Box>
          </Flex>
        )}
      </Flex>
      <Avatar
        cursor="pointer"
        onClick={() => setTopHeight(topHeight => (topHeight === '35vh' ? '0' : '35vh'))}
        mt="-4.75rem"
        left="calc(35vw - 4.75rem)"
        bg={src ? 'white' : 'lightgrey'}
        p="4px"
        src={src}
        w="9.5rem"
        h="9.5rem"
        zIndex="modal"
        position="absolute"
      />
      <VStack
        pt="5rem"
        onScroll={handleScroll}
        overflow="scroll"
        overflowX="hidden"
        h={`calc(90vh - ${topHeight})`}
      >
        <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
          {internsName?.value}
        </Text>
        <Box mb="1rem">
          <Attribute code={beCode} attribute={'PRI_PREFERRED_NAME'} />
        </Box>
        <Flex justifyContent="center" mb="1rem">
          {actions && (
            <HStack>
              {map(action => (
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
          )}
        </Flex>
        <HStack w="65vw" align="start" pt="5" spacing="5">
          <VStack align="start" w="50%">
            <HStack spacing="10" align="start" mb="1rem">
              <FontAwesomeIcon icon={faUser} />
              <VStack align="start">
                <Text fontWeight="semibold">{`Contact details`}</Text>
                <Attribute code={beCode} attribute={'PRI_MOBILE'} />
                <Attribute code={beCode} attribute={'PRI_EMAIL'} />
                <Attribute code={beCode} attribute={'PRI_ADDRESS_FULL'} />
                <Attribute code={beCode} attribute={'PRI_LINKEDIN_URL'} />
                <HStack>
                  <Text w="6rem" textStyle="body3">
                    Student ID
                  </Text>
                  <Attribute code={beCode} attribute={'PRI_STUDENT_ID'} />
                </HStack>
              </VStack>
            </HStack>
            <HStack spacing="10" align="start" mb="1rem">
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
              <VStack align="start">
                <Text fontWeight="semibold">{`Internship Details`}</Text>
                <HStack>
                  <Text w="6rem" textStyle="body3">
                    Start Date
                  </Text>
                  <Attribute code={beCode} attribute={'PRI_START_DATE'} />
                </HStack>
                <HStack>
                  <Text w="6rem" textStyle="body3">
                    Duration
                  </Text>
                  <Attribute code={beCode} attribute={'PRI_ASSOC_DURATION'} />
                </HStack>
                <HStack>
                  <Text w="6rem" textStyle="body3">
                    Transport
                  </Text>
                  <Attribute code={beCode} attribute={'PRI_TRANSPORT'} />
                </HStack>
              </VStack>
            </HStack>
          </VStack>
          <VStack align="start">
            <HStack spacing="10" align="start" mb="1rem">
              <FontAwesomeIcon icon={faCompactDisc} />
              <VStack align="start">
                <Text fontWeight="semibold">{`Known Software`}</Text>
                <Attribute code={beCode} attribute={'PRI_ASSOC_CURRENT_SOFTWARE'} />
              </VStack>
            </HStack>
            <HStack spacing="10" align="start" mb="1rem">
              <FontAwesomeIcon icon={faUserClock} />
              <VStack align="start">
                <Text textStyle="body1">{`Recent Employment`}</Text>
                <HStack>
                  <Text w="6rem" textStyle="body3">
                    Employer
                  </Text>
                  <Attribute code={beCode} attribute={'PRI_PREV_EMPLOYER'} />
                </HStack>
                <HStack>
                  <Text w="6rem" textStyle="body3">
                    Title
                  </Text>
                  <Attribute code={beCode} attribute={'PRI_PREV_JOB_TITLE'} />
                </HStack>
                <HStack>
                  <Text w="6rem" textStyle="body3">
                    CV
                  </Text>
                  <Attribute code={beCode} attribute={'PRI_CV'} />
                </HStack>
              </VStack>
            </HStack>
            <HStack spacing="10" align="start" mb="1rem">
              <FontAwesomeIcon icon={faObjectGroup} />
              <VStack align="start">
                <Text textStyle="body1">{`Career Objectives`}</Text>
                <Text textStyle="body2" dangerouslySetInnerHTML={{ __html: careerObj?.value }} />
              </VStack>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  )
}

export default Intern
