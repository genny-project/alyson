import React, { useState } from 'react'
import { Button, Text, VStack } from '@chakra-ui/react'
import VideoRecorder from './video_recorder'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import useApi from 'api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faVideo } from '@fortawesome/free-solid-svg-icons'

const Write = ({ questionCode, onSendAnswer, html, data }) => {
  const config = safelyParseJson(html, {})

  const { postMediaFile, getSrc } = useApi()

  const [newData, setNewData] = useState(null)
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
        <Button
          test-id={questionCode + 'clear'}
          onClick={() => {
            setNewData(null)
            setStartVideo(false)
            onSendAnswer()
          }}
        >
          Clear
        </Button>
      </VStack>
    )

  return (
    <VStack>
      {newData && (
        <VStack>
          <video
            style={{ width: '20rem', borderRadius: '1rem' }}
            src={URL.createObjectURL(newData)}
            controls
          />
          <Button
            test-id={questionCode + '-save'}
            colorScheme="teal"
            leftIcon={<FontAwesomeIcon icon={faSave} />}
            onClick={() => handleSave(newData)}
          >
            Save
          </Button>
        </VStack>
      )}
      {startVideo ? (
        <VideoRecorder
          test-id={questionCode}
          setStartVideo={setStartVideo}
          setData={setNewData}
          config={config}
        />
      ) : (
        <VStack>
          <Text>
            {
              "Record a short introduction about yourself, don't worry we'll give you time to prepare and let you re-record!"
            }
          </Text>
          <Text>{'Feel free to skip this and come back later.'}</Text>
          <a href={config.explanation_video}>
            <Button leftIcon={<div>❓</div>}>{`Click here for instructions`}</Button>
          </a>

          <Button
            test-id={questionCode + '-start'}
            leftIcon={<FontAwesomeIcon icon={faVideo} />}
            onClick={() => setStartVideo(true)}
          >{`Ready!`}</Button>
        </VStack>
      )}
    </VStack>
  )
}

const Read = ({ data }) => {
  const api = useApi()
  const src = api.getSrc(data?.value)

  return src ? <video src={src} /> : null
}

const Video = {
  Write,
  Read,
}

export default Video
