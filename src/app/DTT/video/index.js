import {
  Badge,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  VStack,
  useBoolean,
} from '@chakra-ui/react'
import { faBan, faExpand, faSave, faVideo } from '@fortawesome/free-solid-svg-icons'
import { compose, join, split } from 'ramda'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Player from './Player'
import Upload from '../upload'
import VideoRecorder from './video_recorder'
import configs from './configs'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import useApi from 'api'
import { useState } from 'react'
import Download from 'app/DTT/download_button'

const getDownloadableLinkFromUrl = compose(join(''), split('video/'))

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
              setStartVideo(true)
              onSendAnswer()
            }}
          >
            {`Re-Record`}
          </Button>
          <Button
            test-id={questionCode + '-delete'}
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
        <Button test-id={`${questionCode}-recorder`} colorScheme="green" onClick={setUpload.off}>
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
                <Button test-id={`${questionCode}-example`} colorScheme="green" variant="outline">
                  {config.explanation_video_title || `View Instructions`}
                </Button>
              </a>
            </Box>
            <Button
              test-id={`${questionCode}-start`}
              leftIcon={<FontAwesomeIcon icon={faVideo} />}
              onClick={() => setStartVideo(true)}
              colorScheme="primary"
            >{`Get Started!`}</Button>
            <Button
              test-id={`${questionCode}-upload`}
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

  const src = api.getVideoSrc(data?.value)

  const downloadableLink = getDownloadableLinkFromUrl(src)

  console.log('downloadableLink----->', downloadableLink)

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
    <Box>
      <Player src={src} inline={config.inline} styles={styles} />
      <Download urlLink={downloadableLink} />
    </Box>
  )
}

const Video = {
  Write,
  Read,
}

export default Video
