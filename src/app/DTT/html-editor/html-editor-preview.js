import {
  Box,
  Text as ChakraText,
  Center,
  VStack,
  HStack,
  IconButton,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import purify from './purify'
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'

const HtmlEditorPreview = ({ html, inModal }) => {
  const ref = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [height, setHeight] = useState('0px')

  const onLoad = () => {
    // This +20 is arbitary, just stops the bottom being cut off
    setHeight(ref.current.contentWindow.document.body.scrollHeight + 20 + 'px')
  }

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
              <iframe
                ref={ref}
                srcDoc={clean}
                title={'iframe-preview'}
                width={'100%'}
                height={height}
                onLoad={onLoad}
              />
            </Box>
          </Box>
        </VStack>

        <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Html Preview</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <iframe
                ref={ref}
                title={'iframe-modal'}
                height={height}
                width="100%"
                srcDoc={clean}
                onLoad={onLoad}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    )
  } else {
    return (
      <iframe
        ref={ref}
        title={'iframe-modal'}
        height={height}
        width="100%"
        srcDoc={clean}
        onLoad={onLoad}
      />
    )
  }
}

export default HtmlEditorPreview
