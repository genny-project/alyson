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
        <video style={{ width: '20rem', borderRadius: '1rem' }} src={src} controls />
        <Badge variant="subtle" colorScheme="green">
          Saved!
        </Badge>
        <HStack>
          <Button
            test-id={questionCode + '-clear'}
            onClick={() => {
              setStartVideo(false)
              onSendAnswer()
            }}
          >
            Re-Record
          </Button>
          <Button
            leftIcon={<FontAwesomeIcon icon={faBan} />}
            onClick={() => {
              setStartVideo(false)
              onSendAnswer('')
            }}
          >
            Delete Video
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
        <VStack align="start">
          <Text>
            {
              "Record a short introduction about yourself, don't worry we'll give you time to prepare and let you re-record!"
            }
          </Text>
          <HStack>
            <a href={config.explanation_video} target="_blank" rel="noreferrer">
              <Button colorScheme="green">{`Instructions`}</Button>
            </a>
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
