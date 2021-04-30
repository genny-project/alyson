import { useState } from 'react'
import {
  Button,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton,
  Badge,
  HStack,
  Box,
  Image,
} from '@chakra-ui/react'
import VideoRecorder from './video_recorder'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import useApi from 'api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faExpand, faBan } from '@fortawesome/free-solid-svg-icons'
import Player from './Player'

const Write = ({ questionCode, onSendAnswer, html, data }) => {
  const config = safelyParseJson(html, {})

  const { postMediaFile, getSrc } = useApi()
  const [startVideo, setStartVideo] = useState(false)

  const handleSave = async file => {
    let data = new FormData()

    data.append('file', file)

    const saveData = await postMediaFile({
      data,
    })

    onSendAnswer(saveData.uuid)
  }

  const src = getSrc(data?.value)

  if (src)
    return (
      <VStack>
        <video style={{ width: '60rem', borderRadius: '1rem' }} src={src} controls />
        <Badge variant="subtle" colorScheme="green" mt="2">
          {`Saved!`}
        </Badge>
        <HStack style={{ marginTop: '40px' }}>
          <Button
            test-id={questionCode + '-clear'}
            onClick={() => {
              setStartVideo(false)
              onSendAnswer()
            }}
          >
            {`Re-Record`}
          </Button>
          <Button
            leftIcon={<FontAwesomeIcon icon={faBan} />}
            onClick={() => {
              setStartVideo(false)
              onSendAnswer('')
            }}
          >
            {`Delete Video`}
          </Button>
        </HStack>
      </VStack>
    )

  return (
    <VStack>
      {startVideo ? (
        <VideoRecorder
          test-id={questionCode}
          setStartVideo={setStartVideo}
          setData={handleSave}
          config={config}
        />
      ) : (
        <VStack align="start" pl="8" pb="8" w="100%">
          <Text textStyle="head1" mt="8" mb="2">{`Add Introduction video?`}</Text>
          <Text textStyle="body2">{`Would you like to record a short introduction about yourself?`}</Text>
          <Text
            textStyle="body2"
            mb="2"
          >{`Don't worry, we'll give you time to prepare and let you record!`}</Text>
          <Box mb="8" w="100%">
            <Image src={process.env.PUBLIC_URL + '/video-intro.png'} alt="video-intro" m="auto" />
          </Box>
          <HStack justify="flex-end" w="100%" pr="10">
            <Box mr="6">
              <a href={config.explanation_video} target="_blank" rel="noreferrer">
                <Button colorScheme="green" variant="outline">{`View Instructions`}</Button>
              </a>
            </Box>
            <Button
              test-id={questionCode + '-start'}
              leftIcon={<FontAwesomeIcon icon={faVideo} />}
              onClick={() => setStartVideo(true)}
              colorScheme="primary"
            >{`Get Started!`}</Button>
          </HStack>
        </VStack>
      )}
    </VStack>
  )
}

const Read = ({ data, mini, styles }) => {
  const api = useApi()

  if (!data?.value) return null

  const src = api.getSrc(data?.value)

  return mini ? (
    <Popover>
      <PopoverTrigger>
        <IconButton icon={<FontAwesomeIcon icon={faExpand} />} />
      </PopoverTrigger>
      <PopoverContent>
        <Player src={src} />
      </PopoverContent>
    </Popover>
  ) : (
    <Player src={src} styles={styles} />
  )
}

const Video = {
  Write,
  Read,
}

export default Video
