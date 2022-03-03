import { Box, Button, Center, Flex, HStack, Image, Input, Text, useToast } from '@chakra-ui/react'
import { compose, includes, isEmpty, map, pathOr, split } from 'ramda'
import { faExclamationTriangle, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isImageField } from 'utils/functions'
import { useDropzone } from 'react-dropzone'

const DropZone = ({ video, handleSave, closeDropzone, maxFiles = 1, questionCode }) => {
  const [files, setFiles] = useState([])
  const toast = useToast()
  const checkIfImage = compose(includes('image'), split('/'))

  useEffect(() => {
    if (files.length) {
      handleSave(files)
      closeDropzone()
    }
  }, [closeDropzone, files, handleSave])

  const showErrorMessage = file => {
    const errorMessage = pathOr('', ['errors', 0, 'message'])(file)
    return toast({
      position: 'bottom',
      duration: 3000,
      isClosable: true,
      render: () => (
        <HStack
          paddingBlock={5}
          paddingInline={6}
          bg="error.50"
          borderWidth={'1px'}
          borderColor={'error.900'}
          borderRadius={'lg'}
        >
          <FontAwesomeIcon color="#700f0f" icon={faExclamationTriangle} size="lg" />
          <Box>
            <Text variant="head.3" color="text.light">
              {`Oops something went wrong! Please try again! ☹️`}
            </Text>
            <Text>{errorMessage}</Text>
          </Box>
        </HStack>
      ),
    })
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: video
      ? 'video/*'
      : isImageField(questionCode)
      ? 'image/*,'
      : 'application/pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.dot,.rtf,.odt',
    maxFiles: maxFiles,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
        !isEmpty(rejectedFiles) && showErrorMessage(rejectedFiles[0]),
      )
    },
  })

  const preview = map(({ name, preview, type }) => {
    if (checkIfImage(type)) {
      return (
        <Box w="200px" h="200px" key={name} r="5">
          <Image src={preview} alt="drag and drop" boxSize="200px" objectFit="cover" />
        </Box>
      )
    }

    return (
      <Flex key={name} p="4">
        <Text>{`Uploaded File:`}</Text>
        <Text ml="2">{name}</Text>
      </Flex>
    )
  })(files)

  return (
    <Box borderWidth={'1px'} p={'1.5rem'} borderRadius={'1.25rem'} mt={'1rem'}>
      <Flex w="100%" direction="column">
        <Box {...getRootProps()}>
          <Center
            cursor="pointer"
            border="1px dashed"
            borderRadius={`1.25rem`}
            borderColor={'blackAlpha.20'}
            _hover={{
              background: 'primary.500',
              color: 'text.dark',
              borderColor: 'text.dark',
              boxShadow: '0 4px 20px 5px rgba(49, 130, 206, 0.14)',
            }}
          >
            <Text paddingBlock={'12'} maxW={'16rem'} textAlign={'center'}>
              <FontAwesomeIcon icon={faUpload} />
              <br />
              {`Drag and drop images and videos OR browse files from your computer`}
            </Text>
          </Center>
          <Input {...getInputProps()} id={questionCode} test-id={questionCode} />
        </Box>
        <Flex mt={'1rem'}>
          <Flex direction="row">{preview}</Flex>
          <Flex justify="center" w={'full'}>
            <Button
              mr="2"
              variant="ghost"
              onClick={closeDropzone}
              test-id={`${questionCode}-CANCEL`}
              borderRadius="full"
              paddingInline={10}
            >
              {`Cancel`}
            </Button>
            <Button
              variant="solid"
              isDisabled={!!isEmpty(files)}
              onClick={() => handleSave(files)}
              test-id={`${questionCode}-SUBMIT`}
              borderRadius="full"
              paddingInline={10}
            >
              {`Submit`}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default DropZone
