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
  Divider,
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
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
  const actionOne = actions?.[0]
  const actionTwo = actions?.[1]
  const actionRest = slice(2, Infinity)(actions)

  return (
    <Box w="100vw" h="100vh">
      <Box zIndex="modal" position="absolute" right="4" top="4">
        <IconButton
          onClick={onClose}
          color={'black'}
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
        />
      </Box>
      {videoSrc && (
        <Box w="100vw" height={'35vh'}>
          <Player
            src={videoSrc}
            styles={{
              width: '100%',
              height: '35vh',
            }}
          />
        </Box>
      )}
      <Avatar
        cursor="pointer"
        left="calc(50vw - 4.75rem)"
        bg={src ? 'white' : 'lightgrey'}
        p="4px"
        src={src}
        w="10rem"
        h="10rem"
        zIndex="modal"
        mt={videoSrc ? '-5rem' : '0.5rem'}
      />
      <VStack mt="-5rem" pt="5rem" overflowX="hidden" overflowY="scroll" h="65vh">
        <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
          {internsName?.value}
        </Text>
        <Box>
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
                size="sm"
                colorScheme="blue"
              />
            )}
            {actionTwo && (
              <Action
                parentCode={sbeCode}
                code={actionTwo}
                targetCode={beCode}
                key={actionTwo}
                size="sm"
                colorScheme="blue"
              />
            )}
            {
              <Menu>
                <MenuButton size="sm" as={Button} colorScheme="blue">
                  <FontAwesomeIcon size="sm" icon={faEllipsisV} />
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
        <VStack w="100%" pl="8" spacing="3" align="start">
          <VStack align="start">
            <Attribute code={beCode} attribute={'PRI_MOBILE'} />
            <Attribute code={beCode} attribute={'PRI_EMAIL'} />
            <Attribute code={beCode} attribute={'PRI_ADDRESS_FULL'} />
            <Attribute code={beCode} attribute={'PRI_LINKEDIN_URL'} />
          </VStack>
          <Divider />
          <Text>{careerObj?.value}</Text>
          <Divider />
          <Text fontWeight="semibold">{`Internship Details`}</Text>
          <VStack align="start">
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
          <Divider />

          <Text fontWeight="semibold">{`Known Software`}</Text>
          <Attribute code={beCode} attribute={'PRI_ASSOC_CURRENT_SOFTWARE'} />
        </VStack>
      </VStack>
    </Box>
  )
}

export default InternsMobileView
