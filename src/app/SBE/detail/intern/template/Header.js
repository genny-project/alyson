import { Box, Flex, Text, IconButton } from '@chakra-ui/react'
import Player from 'app/DTT/video/Player'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { closeDrawer } from 'redux/app'
import { useDispatch } from 'react-redux'

const DetailHeader = ({ videoSrc, careerObj, video, topHeight }) => {
  const videoStyle = {
    width: '50%',
    borderTopLeftRadius: '0.5rem',
    height: topHeight,
    transition: 'height 1s',
  }

  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())

  return (
    <Box>
      <Flex
        justifyContent="center"
        borderTopLeftRadius="0.5rem"
        borderTopRightRadius="0.5rem"
        bgGradient="linear(to-br, teal.400,blue.500)"
        h={topHeight}
      >
        {videoSrc && (
          <Flex
            flexGrow="1"
            height={topHeight}
            borderTopLeftRadius={careerObj?.value ? '0.5rem' : ''}
          >
            <Player src={videoSrc} styles={videoStyle} />
          </Flex>
        )}
        {careerObj?.value && (
          <Flex
            flexGrow="1"
            maxWidth="50%"
            minWidth="50%"
            height={topHeight}
            borderTopRightRadius="0.5rem"
            borderTopLeftRadius={video?.value ? '' : '0.5rem'}
            overflow="hidden"
          >
            <Box
              p={video?.value ? '16px 48px 64px 40px' : '16px 48px 80px 40px'}
              overflow="hidden"
              m="auto"
            >
              <Text
                textStyle="head1"
                textAlign="center"
                dangerouslySetInnerHTML={{ __html: careerObj?.value }}
                noOfLines={[3, 4]}
                color="white"
              />
            </Box>
          </Flex>
        )}
      </Flex>
      <Box position="absolute" right="2" top="2">
        <IconButton
          onClick={onClose}
          color={'white'}
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
        />
      </Box>
    </Box>
  )
}

export default DetailHeader
