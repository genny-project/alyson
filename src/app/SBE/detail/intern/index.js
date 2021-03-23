import { useState } from 'react'
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
  faTimesCircle,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { closeDrawer } from 'redux/app'
import { map } from 'ramda'
import Player from 'app/DTT/video/Player'

const Intern = ({ sbeCode, targetCode }) => {
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const image = useSelector(selectCode(beCode, 'PRI_IMAGE_URL'))
  const name = useSelector(selectCode(beCode, 'PRI_NAME'))
  const video = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))
  const careerObj = useSelector(selectCode(beCode, 'PRI_CAREER_OBJ'))

  const { getImageSrc, getSrc } = useApi()
  const videoSrc = getSrc(video?.value)
  const src = getImageSrc(image?.value)

  const actions = getActions(sbe)

  const [topHeight, setTopHeight] = useState(careerObj?.value || video?.value ? '45vh' : '0')

  const handleScroll = () => {
    if (topHeight !== '0') setTopHeight('0')
  }

  if (!beCode) return null

  const videoStyle = {
    width: '50%',
    borderTopLeftRadius: '0.5rem',
    height: topHeight,
    transition: 'height 1s',
  }

  const careerObjStyles = {
    color: '#ffffff',
    margin: 'auto',
    fontSize: '24px',
    paddingLeft: '64px',
    paddingRight: '64px',
    borderTopRightRadius: '0.5rem',
  }

  return (
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
      <Flex onClick={() => setTopHeight('45vh')} justifyContent="center">
        {video?.value && (
          <Flex
            flexGrow="1"
            maxWidth="50%"
            minWidth="50%"
            height={topHeight}
            transition="height 1s"
            background="gray.100"
            borderTopLeftRadius="0.5rem"
          >
            <Player src={videoSrc} styles={videoStyle} />
          </Flex>
        )}
        {careerObj && (
          <Flex
            flexGrow="1"
            bgGradient="linear(to-br, teal.400,blue.500)"
            height={topHeight}
            transition="height 1s"
            borderTopRightRadius="0.5rem"
            borderTopLeftRadius={video?.value ? '' : '0.5rem'}
            overflow="hidden"
          >
            <Attribute code={beCode} attribute={'PRI_CAREER_OBJ'} styles={careerObjStyles} />
          </Flex>
        )}
      </Flex>
      <Avatar
        cursor="pointer"
        onClick={() => setTopHeight(topHeight => (topHeight === '45vh' ? '0' : '45vh'))}
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
          {name?.value}
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
              </VStack>
            </HStack>
            <HStack spacing="10" align="start" mb="1rem">
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
              <VStack align="start">
                <Text fontWeight="semibold">{`Internship Details`}</Text>
                <HStack>
                  <Text w="8rem" fontWeight="semibold">
                    Start Date
                  </Text>
                  <Attribute code={beCode} attribute={'PRI_START_DATE'} />
                </HStack>
                <HStack>
                  <Text w="8rem" fontWeight="semibold">
                    Duration
                  </Text>
                  <Attribute code={beCode} attribute={'PRI_ASSOC_DURATION'} />
                </HStack>
                <HStack>
                  <Text w="8rem" fontWeight="semibold">
                    Transport
                  </Text>
                  <Attribute code={beCode} attribute={'PRI_TRANSPORT'} />
                </HStack>
              </VStack>
            </HStack>
          </VStack>
          <VStack>
            <HStack spacing="10" align="start" mb="1rem">
              <FontAwesomeIcon icon={faCompactDisc} />
              <VStack align="start">
                <Text fontWeight="semibold">{`Known Software`}</Text>
                <Attribute code={beCode} attribute={'PRI_ASSOC_CURRENT_SOFTWARE'} />
              </VStack>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  )
}

export default Intern
