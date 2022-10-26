import { Box, Button, Center, Flex, Image, Input, Text, useToast } from '@chakra-ui/react'
import { compose, includes, isEmpty, map, pathOr, split } from 'ramda'
import { useState, useCallback } from 'react'

import { isImageField } from 'utils/functions'
import { useDropzone } from 'react-dropzone'

const DropZone = ({ video, handleSave, closeDropzone, maxFiles = 5, questionCode }) => {
  const [files, setFiles] = useState([])
  const toast = useToast()
  const checkIfImage = compose(includes('image'), split('/'))

  const handleOnSubmit = () => {
    handleSave(files)
    closeDropzone()
  }

  const handleOnClose = () => {
    closeDropzone()
  }

  const showErrorMessage = file => {
    const errorMessage = pathOr('', ['errors', 0, 'message'])(file)
    return toast({
      position: 'bottom',
      title: 'Oops something went wrong! Please try again! ☹️',
      description: errorMessage,
      status: 'error',
      duration: 3000,
    })
  }

  let acceptProps = video
    ? 'video/*'
    : isImageField(questionCode)
    ? 'image/*,'
    : 'application/pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.dot,.rtf,.odt'

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptProps,
    maxFiles,
    onDrop: useCallback((acceptedFiles, rejectedFiles) => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
        !isEmpty(rejectedFiles) && showErrorMessage(rejectedFiles[0]),
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
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
    <Flex w="100%" direction="column">
      <Box
        {...getRootProps()}
        p="10"
        my="4"
        cursor="pointer"
        border="1px dashed"
        borderRadius="4px"
      >
        <Center>
          <Text>{`Drag 'n' drop some files here, or click to select files`}</Text>
        </Center>
        <Input {...getInputProps()} id={questionCode} test-id={questionCode} />
      </Box>
      <Flex direction="row" mt="1">
        {preview}
      </Flex>
      <Flex justify="flex-end">
        <Button
          mr="2"
          variant="ghost"
          onClick={handleOnClose}
          test-id={`${questionCode}-CANCEL`}
        >{`Cancel`}</Button>
        <Button
          variant="solid"
          isDisabled={!!isEmpty(files)}
          onClick={handleOnSubmit}
          test-id={`${questionCode}-SUBMIT`}
        >{`Submit`}</Button>
      </Flex>
    </Flex>
  )
}

export default DropZone
