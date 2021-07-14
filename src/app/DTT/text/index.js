import { Input, Text as ChakraText, Tag, Wrap, useDisclosure, VStack } from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { useMobileValue } from 'utils/hooks'
import { map, splitAt, head, last, length } from 'ramda'
import getArrayFromStringValue from 'utils/helpers/get-array-from-string.js'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

export const Write = ({ questionCode, data, onSendAnswer }) => {
  const debouncedSendAnswer = debounce(onSendAnswer, 500)
  const maxW = useMobileValue(['', '25vw'])

  return (
    <Input
      test-id={questionCode}
      onChange={e => debouncedSendAnswer(e.target.value)}
      defaultValue={data?.value}
      w="full"
      maxW={maxW}
    />
  )
}

export const Read = ({ data, config = {} }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { detilViewTags } = config

  if (detilViewTags) {
    const allValues = getArrayFromStringValue(data?.value)
    const splittedTags = splitAt(2)(allValues)
    const splittedTagsToDisplay = head(splittedTags)
    const splittedTagsToShowAsMore = last(splittedTags)

    return (
      <>
        <Wrap align="start">
          {map(value => (
            <Tag borderRadius={15} align="center">
              <ChakraText textStyle="body.2" isTruncated maxWidth="5rem" px="1">
                {value}
              </ChakraText>
            </Tag>
          ))(splittedTagsToDisplay)}
          {length(splittedTagsToShowAsMore) >= 1 && (
            <Tag
              w="5rem"
              borderRadius={15}
              cursor="pointer"
              _hover={{ color: 'red' }}
              onClick={onOpen}
            >
              <ChakraText textStyle="body.2">
                {`+ ${length(splittedTagsToShowAsMore)} more`}
              </ChakraText>
            </Tag>
          )}
        </Wrap>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{`All Tags`}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} mb="4" align="start">
                {map(value => (
                  <Tag borderRadius={15} align="center">
                    <ChakraText textStyle="body.2" w="full" px="1">
                      {value}
                    </ChakraText>
                  </Tag>
                ))(allValues)}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }
  return (
    <ChakraText noOfLines={3} {...config}>
      {data?.value || config.defaultValue}
    </ChakraText>
  )
}

const Text = {
  Write,
  Read,
}

export default Text
