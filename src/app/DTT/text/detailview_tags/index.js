import {
  Text as ChakraText,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  VStack,
  Wrap,
  useDisclosure,
} from '@chakra-ui/react'
import { head, isEmpty, last, length, map, splitAt } from 'ramda'

import getArrayFromStringValue from 'utils/helpers/get-array-from-string.js'
import { useIsMobile } from 'utils/hooks'

const DetailViewTags = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isMobile = useIsMobile()

  const allValues = getArrayFromStringValue(data?.value)
  const splittedTags = splitAt(3)(allValues)
  const splittedTagsToDisplay = head(splittedTags)
  const splittedTagsToShowAsMore = last(splittedTags)

  if (isMobile) {
    return (
      <>
        <Wrap align="start">
          {map(
            value =>
              !isEmpty(value) && (
                <Tag key={value} borderRadius={15} align="center" colorScheme="telegram">
                  <ChakraText textStyle="body.2" isTruncated px="1">
                    {value}
                  </ChakraText>
                </Tag>
              ),
          )(allValues)}
        </Wrap>
      </>
    )
  }

  return (
    <>
      <Wrap align="start">
        {map(
          value =>
            !isEmpty(value) && (
              <Tag key={value} borderRadius={15} align="center" colorScheme="telegram">
                <ChakraText textStyle="body.2" isTruncated px="1">
                  {value}
                </ChakraText>
              </Tag>
            ),
        )(splittedTagsToDisplay)}
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
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={'inside'} isCentered size="lg">
        <ModalOverlay />
        <ModalContent overflow="scroll">
          <ModalHeader>{data?.attributeName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} mb="4">
              {map(value => (
                <Tag key={value} borderRadius={15} align="center" colorScheme="green">
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
