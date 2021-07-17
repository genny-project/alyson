import { Text as ChakraText, Tag, Wrap, VStack, useDisclosure } from '@chakra-ui/react'
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

const DetailViewTags = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const allValues = getArrayFromStringValue(data?.value)
  const splittedTags = splitAt(3)(allValues)
  const splittedTagsToDisplay = head(splittedTags)
  const splittedTagsToShowAsMore = last(splittedTags)

  return (
    <>
      <Wrap align="start">
        {map(value => (
          <Tag borderRadius={15} align="center" colorScheme="telegram">
            <ChakraText textStyle="body.2" isTruncated px="1">
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
            colorScheme="yellow"
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
            <VStack spacing={4} mb="4">
              {map(value => (
                <Tag borderRadius={15} align="center" colorScheme="green">
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

export default DetailViewTags
