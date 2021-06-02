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
  useBoolean,
  Stack,
} from '@chakra-ui/react'
import VideoRecorder from './video_recorder'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import useApi from 'api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faExpand, faBan, faSave } from '@fortawesome/free-solid-svg-icons'
import Player from './Player'
import Upload from '../upload'
import configs from './configs'

const Write = ({ questionCode, onSendAnswer, html, data }) => {
  const config = configs[questionCode] || safelyParseJson(html, {})

  const { postMediaFile, getSrc } = useApi()
  const [startVideo, setStartVideo] = useState(false)
  const [upload, setUpload] = useBoolean()

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

  if (upload)
    return (
      <VStack align="start">
        <Button colorScheme="green" onClick={setUpload.off}>
          Go back to recorder
        </Button>
        <Upload.Write video questionCode={questionCode} data={data} onSendAnswer={onSendAnswer} />
      </VStack>
    )
  return (
    <VStack align="start" pl="8" pb="8" w="100%">
      {config.detail ? (
        config.detail
      ) : (
        <>
          <Text textStyle="head.1" mt="8" mb="2">
            {config.question}
          </Text>
          <Text textStyle="body.2">{config.description}</Text>
          <Text textStyle="body.3">{config.explanation}</Text>
          <Text
            textStyle="body.2"
            mb="2"
          >{`Don't worry, we'll give you time to prepare and let you record!`}</Text>
        </>
      )}

      {startVideo ? (
        <VideoRecorder
          test-id={questionCode}
          setStartVideo={setStartVideo}
          setData={handleSave}
          config={config}
        />
      ) : (
        <>
          <Box mb="8" w="100%">
            <Image src={process.env.PUBLIC_URL + '/video-intro.png'} alt="video-intro" m="auto" />
          </Box>
          <Stack direction={['column', 'row']} justify="flex-end" w="100%" pr="10">
            <Box>
              <a href={config.explanation_video} target="_blank" rel="noreferrer">
                <Button colorScheme="green" variant="outline">
                  {config.explanation_video_title || `View Instructions`}
                </Button>
              </a>
            </Box>
            <Button
              test-id={questionCode + '-start'}
              leftIcon={<FontAwesomeIcon icon={faVideo} />}
              onClick={() => setStartVideo(true)}
              colorScheme="primary"
            >{`Get Started!`}</Button>
            <Button
              onClick={setUpload.on}
              colorScheme="green"
              leftIcon={<FontAwesomeIcon icon={faSave} />}
            >
              I have one I want to upload!
            </Button>
          </Stack>
        </>
      )}
    </VStack>
  )
}

const Read = ({ data, mini, styles, config = {} }) => {
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
    <Player src={src} inline={config.inline} styles={styles} />
  )
}

const Video = {
  Write,
  Read,
}

export default Video
