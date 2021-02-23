import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Flex, Text, Input, Button, Center, Image } from '@chakra-ui/react'
import { isEmpty, map } from 'ramda'

const DropZone = ({ handleSave, closeDropzone }) => {
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  const preview = map(file => (
    <Box w="200px" h="200px" key={file.name}>
      <Image src={file.preview} alt="drag and drop" boxSize="200px" objectFit="cover" />
    </Box>
  ))(files)

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files],
  )

  return (
    <Flex w="100%" p={4} direction="column" bg="white">
      <Text color="black">{`Upload File`}</Text>
      <Box {...getRootProps()} p="10" my="4" border="1px black dashed">
        <Center>
          <Text color="black">{`Drag 'n' drop some files here, or click to select files`}</Text>
        </Center>
        <Input {...getInputProps()} />
      </Box>
      <Flex direction="row" mt="1">
        {preview}
      </Flex>
      <Flex justify="flex-end">
        <Button
          mr="2"
          colorScheme="blue"
          variant="outline"
          onClick={closeDropzone}
        >{`Cancel`}</Button>
        <Button
          colorScheme="blue"
          variant="outline"
          isDisabled={!!isEmpty(files)}
          onClick={() => handleSave(files)}
        >{`Submit`}</Button>
      </Flex>
    </Flex>
  )
}

export default DropZone
