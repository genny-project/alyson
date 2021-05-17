import { IconButton } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Box, Center, HStack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout'
import { faArrowAltCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'app/layouts/components/button'
import Card from 'app/layouts/components/card'
import { dec, inc } from 'ramda'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import getYtThumbnail from 'utils/helpers/get-yt-thumbnail'
import { useIsMobile } from 'utils/hooks'
import { onSendMessage } from 'vertx'

const VideoModules = ({ questionCode }) => {
  const title = useSelector(selectCode(questionCode, 'title'))
  const submit = useSelector(selectCode(questionCode, 'QUE_SUBMIT'))
  const config = useSelector(selectCode(questionCode, 'config'))

  const { groups } = config || {}

  const [group, setGroup] = useState(0)

  const isMobile = useIsMobile()

  const onSubmit = () =>
    onSendMessage({
      code: 'QUE_SUBMIT',
      parentCode: questionCode,
      rootCode: questionCode,
      sourceCode: submit.sourceCode,
      targetCode: submit.targetCode,
    })

  return isMobile ? (
    <VStack w="100vw" p="1">
      <Center w="full">
        <VStack>
          <Text color="primary.500" textStyle="head.2">
            {groups[group].label}
          </Text>
          <ReactPlayer width="90vw" height="51vw" controls url={groups[group].video.url} />
        </VStack>
      </Center>
      <HStack>
        <IconButton
          colorScheme="gradient"
          size="lg"
          isDisabled={group === 0}
          icon={<FontAwesomeIcon icon={faArrowAltCircleLeft} />}
          onClick={() => setGroup(dec)}
        />
        <IconButton
          colorScheme="gradient"
          size="lg"
          isDisabled={group === groups.length - 1}
          icon={<FontAwesomeIcon icon={faArrowCircleRight} />}
          onClick={() => setGroup(inc)}
        />
      </HStack>
      {group === groups.length - 1 && <Button onClick={onSubmit}>All Done!</Button>}
      <Wrap w="full">
        {groups.map(({ label, video: { url } }, idx) => (
          <WrapItem key={idx}>
            <Box w="9rem">
              <Card
                onClick={() => setGroup(idx)}
                variant={group === idx ? 'card0' : 'card1'}
                _hover={group === idx ? {} : { shadow: 'base', bg: 'hover' }}
                cursor="pointer"
                p="2"
              >
                <Image borderRadius="md" w="full" src={getYtThumbnail(url)} />
                <Text w="8rem" h="4rem" textStyle="body.2" textOverflow="ellipsis">
                  {label}
                </Text>
              </Card>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  ) : (
    <Center>
      <HStack align="start">
        <Card>
          <VStack>
            <Text color="primary.500" textStyle="head.1">
              {title}
            </Text>
            {groups.map(({ label, video: { url } }, idx) => (
              <Box w="20rem">
                <Card
                  onClick={() => setGroup(idx)}
                  variant={group === idx ? 'card0' : 'card1'}
                  _hover={group === idx ? {} : { shadow: 'base', bg: 'hover' }}
                  cursor="pointer"
                >
                  <Image borderRadius="md" w="full" src={getYtThumbnail(url)} />
                  <Text textStyle="body.2">{label}</Text>
                </Card>
              </Box>
            ))}
          </VStack>
        </Card>
        <VStack>
          <Card>
            <VStack>
              <Text color="primary.500" textStyle="head.2">
                {groups[group].label}
              </Text>
              <ReactPlayer width="65vw" height="36.4vw" controls url={groups[group].video.url} />
            </VStack>
          </Card>
          <HStack>
            <IconButton
              colorScheme="gradient"
              size="lg"
              isDisabled={group === 0}
              icon={<FontAwesomeIcon icon={faArrowAltCircleLeft} />}
              onClick={() => setGroup(dec)}
            />
            <IconButton
              colorScheme="gradient"
              size="lg"
              isDisabled={group === groups.length - 1}
              icon={<FontAwesomeIcon icon={faArrowCircleRight} />}
              onClick={() => setGroup(inc)}
            />
          </HStack>
          {group === groups.length - 1 && <Button onClick={onSubmit}>All Done!</Button>}
        </VStack>
      </HStack>
    </Center>
  )
}

export default VideoModules
