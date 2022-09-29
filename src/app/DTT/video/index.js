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
import { equals, includes, pathOr } from 'ramda'
import { faBan, faExpand, faSave, faVideo } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

import Download from 'app/DTT/download_button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Player from './Player'
import Upload from '../upload'
import VideoRecorder from './video_recorder'
import configs from './configs'
import { getDownloadableVideoLinkFromUrl } from 'utils/helpers/get-downloadble-link'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import useApi from 'api'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useKeycloak } from '@react-keycloak/web'

const Write = ({ questionCode, onSendAnswer, html, data, setSaving }) => {
  const config = configs[questionCode] || safelyParseJson(html, {})

  const { postMediaFile, getVideoSrc } = useApi()
  const [startVideo, setStartVideo] = useState(false)
  const [upload, setUpload] = useBoolean()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const handleSave = async file => {
    let data = new FormData()

    data.append('file', file)

    const saveData = await postMediaFile({
      data,
    })

    onSendAnswer(saveData.uuid)
    dispatchFieldMessage({ payload: questionCode })
  }

  const src = getVideoSrc(data?.value)

  if (src)
    return (
      <VStack>
        <video
          id={questionCode}
          style={{ width: '60rem', borderRadius: '1rem' }}
          src={src}
          controls
        />

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
        <Upload.Write
          video
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          setSaving={setSaving}
        />
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
          <Text textStyle="body.2" mb="2">
            {`Don't worry, we'll give you time to prepare and let you record!`}
          </Text>
        </>
      )}

      {startVideo ? (
        <VideoRecorder
          id={questionCode}
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
              id={questionCode}
              test-id={`${questionCode}-start`}
              leftIcon={<FontAwesomeIcon icon={faVideo} />}
              onClick={() => setStartVideo(true)}
              colorScheme="primary"
            >
              {`Get Started!`}
            </Button>
            <Button
              id={questionCode}
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
  const { keycloak } = useKeycloak()

  const roles = pathOr('', ['realmAccess', 'roles'])(keycloak)

  const hasDownloadableRole = includes('download')(roles)
  const src = api.getVideoSrc(data?.value)
  const [serverResponse, setServerResponse] = useState(null)

  useEffect(() => {
    fetch(src + '-360p.mp4', {
      method: 'HEAD',
    }).then(response => {
      setServerResponse(response.status)
    })
  }, [src])

  if (!data?.value) return null

  const downloadableLink = getDownloadableVideoLinkFromUrl(src)

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
    <HStack sx={{ alignItems: 'flex-end' }}>
      <Player src={src} inline={config.inline} styles={styles} serverResponse={serverResponse} />
      {hasDownloadableRole && equals(serverResponse)(200) && (
        <Download urlLink={downloadableLink} />
      )}
    </HStack>
  )
}

const Video = {
  Write,
  Read,
}

export default Video
