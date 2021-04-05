import { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  Button,
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCompactDisc,
  faEnvelopeOpenText,
  faTimesCircle,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import Player from 'app/DTT/video/Player'
import Attribute from 'app/BE/attribute'
import Action from 'app/BE/action'
import { map, slice, isEmpty } from 'ramda'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const InternsMobileView = ({
  onClose,
  careerObj,
  videoSrc,
  internsName,
  beCode,
  actions,
  src,
  sbeCode,
}) => {
  const [topHeight, setTopHeight] = useState('35vh')

  const handleScroll = () => {
    if (topHeight !== '0') setTopHeight('0')
  }

  useEffect(() => {
    !videoSrc && !careerObj?.value ? setTopHeight('0') : setTopHeight('35vh')
  }, [careerObj?.value, videoSrc])

  const actionOne = actions?.[0]
  const actionTwo = actions?.[1]
  const actionRest = slice(2, Infinity)(actions)

  const videoStyle = {
    width: '100%',
    height: topHeight,
  }

  return (
    <Box w="100vw" h="100vh">
      <Box position="absolute" right="4" top="4">
        <IconButton
          onClick={onClose}
          color={topHeight === '0' ? 'darkgrey' : 'white'}
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
        />
      </Box>
      <Flex onClick={() => setTopHeight('35vh')} bgGradient="linear(to-br, teal.400,blue.500)">
        {videoSrc ? (
          <Box height={topHeight} transition="height 1s">
            <Player src={videoSrc} styles={videoStyle} />
          </Box>
        ) : careerObj?.value ? (
          <Flex height={topHeight} transition="height 1s" overflow="hidden">
            <Box p="16px 48px 80px 40px" overflow="hidden" m="auto">
              <Text
                textStyle="head1"
                dangerouslySetInnerHTML={{ __html: careerObj?.value }}
                noOfLines={[4, 5, 6]}
                color="white"
              />
            </Box>
          </Flex>
        ) : (
          <Box />
        )}
      </Flex>
      <Avatar
        cursor="pointer"
        onClick={() => setTopHeight(topHeight => (topHeight === '35vh' ? '0' : '35vh'))}
        mt={topHeight !== '0' ? '-4.75rem' : '1rem'}
        left="calc(50vw - 4.75rem)"
        bg={src ? 'white' : 'lightgrey'}
        p="4px"
        src={src}
        w="9.5rem"
        h="9.5rem"
        zIndex="modal"
      />
      <VStack
        pt="1rem"
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
          <HStack>
            {actionOne && (
              <Action
                parentCode={sbeCode}
                code={actionOne}
                targetCode={beCode}
                key={actionOne}
                size="md"
                colorScheme="blue"
              />
            )}
            {actionTwo && (
              <Action
                parentCode={sbeCode}
                code={actionTwo}
                targetCode={beCode}
                key={actionTwo}
                size="md"
                colorScheme="blue"
              />
            )}
            {
              <Menu>
                <MenuButton as={Button} colorScheme="blue">
                  <FontAwesomeIcon size="lg" icon={faEllipsisV} />
                </MenuButton>
                <MenuList>
                  {!isEmpty(actionRest) &&
                    map(action => (
                      <Action
                        parentCode={sbeCode}
                        code={action}
                        targetCode={beCode}
                        key={action}
                        size="md"
                        colorScheme="blue"
                        mobile
                      />
                    ))(actionRest)}
                </MenuList>
              </Menu>
            }
          </HStack>
        </Flex>
        <HStack w="80vw" align="start" pt="5" spacing="5">
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

export default InternsMobileView
