import {
  Box,
  Center,
  Text as ChakraText,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import purify from './purify'

const HtmlEditorPreview = ({ html, inModal }) => {
  const ref = useRef(null)
  const [frameHeight, setFrameHeight] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  let frameInnerHeight

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onLoad = () => {
    frameInnerHeight = ref?.current?.contentWindow?.document?.body?.scrollHeight
    setFrameHeight(frameInnerHeight + 44 + 'px')
  }

  useEffect(() => {
    const resizeHeight = () => {
      setTimeout(() => {
        onLoad()
      }, 100)
    }
    window.addEventListener('resize', resizeHeight)

    return () => {
      window.removeEventListener('resize', resizeHeight)
    }
  }, [onLoad])

  if (!html) {
    return <Center>No HTML!</Center>
  }

  const clean = purify(html)

  if (inModal) {
    return (
      <Box>
        <VStack width={'100%'} align="flex-start">
          <HStack justify="space-between" w="100%">
            <ChakraText>Output</ChakraText>
            <IconButton onClick={onOpen} icon={<FontAwesomeIcon icon={faExpandArrowsAlt} />} />
          </HStack>
          <Box borderTop="1px" width={'100%'}>
            <Box maxHeight={'100%'} padding={1}>
              <iframe ref={ref} srcDoc={clean} title={'iframe-preview'} width={'100%'} />
            </Box>
          </Box>
        </VStack>

        <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Html Preview</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <iframe ref={ref} title={'iframe-modal'} width="100%" srcDoc={clean} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    )
  } else {
    return (
      <iframe
        onLoad={onLoad}
        height={frameHeight}
        ref={ref}
        title={'iframe-modal'}
        width="100%"
        srcDoc={clean}
      />
    )
  }
}

export default HtmlEditorPreview
