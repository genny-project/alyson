import { FC } from 'react'
import { Text } from '@chakra-ui/react'
import { equals } from 'ramda'

interface Props {
  src: string
  serverResponse: number
}

const Player: FC<Props> = ({ src, serverResponse }) => {
  return (
    <>
      {equals(serverResponse)(404) ? (
        <Text color={'white'} padding={3}>
          {'Your video is being processed currently. Please try after some time.'}
        </Text>
      ) : equals(serverResponse)(500) ? (
        <Text color={'white'} padding={3}>
          {'There looks to be some issue in server. Please try after some time.'}
        </Text>
      ) : (
        <video
          style={{ maxHeight: '340px', minWidth: '240px' }}
          controls
          autoPlay
          poster="/video-intro.png"
          muted
        >
          <source src={src} />
        </video>
      )}
    </>
  )
}

export default Player
