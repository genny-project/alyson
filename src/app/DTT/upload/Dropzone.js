import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Flex, Text, Input, Button, Center, Image, useToast } from '@chakra-ui/react'
import { isEmpty, map, pathOr, compose, includes, split } from 'ramda'

const DropZone = ({ handleSave, closeDropzone, maxSize = '5000000', maxFiles = 1 }) => {
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
      title: 'Oops something went wrong! Please try again! ☹️',
      description: errorMessage,
      status: 'error',
      duration: 3000,
    })
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*, application/pdf',
    maxSize: maxSize,
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
        <Input {...getInputProps()} />
      </Box>
      <Flex direction="row" mt="1">
        {preview}
      </Flex>
      <Flex justify="flex-end">
        <Button mr="2" variant="ghost" onClick={closeDropzone}>{`Cancel`}</Button>
        <Button
          variant="solid"
          isDisabled={!!isEmpty(files)}
          onClick={() => handleSave(files)}
        >{`Submit`}</Button>
      </Flex>
    </Flex>
  )
}

export default DropZone
