import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { compose, equals, includes, isEmpty, map, pathOr, split } from 'ramda'
import { faCloudUploadAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isImageField } from 'utils/functions'
import { lojing } from 'utils/constants'
import { useDropzone } from 'react-dropzone'
import useProductColors from 'utils/productColors'
import { useState } from 'react'

const DropZone = ({ video, handleSave, closeDropzone, maxFiles = 10, questionCode, clientId }) => {
  const [files, setFiles] = useState([])
  const [hover, setHover] = useState(false)
  const toast = useToast()
  const checkIfImage = compose(includes('image'), split('/'))

  const {
    fieldHoverBorderColor,
    fieldHoverBackgroundColor,
    fieldHoverTextColor,
    dropZoneTextHoverColor,
  } = useProductColors()

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
        files =>
          files.concat(
            acceptedFiles.map(file =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              }),
            ),
          ),
        !isEmpty(rejectedFiles) && showErrorMessage(rejectedFiles[0]),
      )
    },
  })

  const preview = map(({ name, preview, type }) => {
    if (checkIfImage(type)) {
      return (
        <VStack key={name} borderRadius={4} overflow={'hidden'}>
          <Image src={preview} alt={`Thumb ${name}`} objectFit="cover" />
          <Button onClick={() => console.log('deleted the file!!')}>{`Delete`}</Button>
        </VStack>
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
    <Box
      w="100%"
      p={4}
      mt={'1rem'}
      borderWidth={'1px'}
      borderRadius={16}
      borderColor={'product.grayMedium'}
      color={'gray.600'}
      role="group"
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      _hover={{
        boxShadow: '0px 4px 20px 5px rgba(51, 71, 91, 0.06)',
      }}
    >
      <Flex w="100%" direction="column">
        {
          <Box {...getRootProps()}>
            <Center
              cursor="pointer"
              borderRadius={12}
              borderColor={'blackAlpha.20'}
              borderWidth={1}
              borderStyle={'dashed'}
              _groupHover={{
                borderColor: fieldHoverBorderColor,
                bg: fieldHoverBackgroundColor,
              }}
            >
              <Box
                paddingBlock={'12'}
                maxW={'16rem'}
                textAlign={'center'}
                color={'gray.600'}
                _groupHover={{
                  color: fieldHoverTextColor,
                }}
              >
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                  size={80}
                  color={'inherit'}
                  style={{
                    width: 80,
                    height: 80,
                    filter: hover ? 'drop-shadow(0px 4px 4px rgba(26, 59, 100, 0.35)' : '',
                  }}
                />
                <Text
                  fontSize={13}
                  fontWeight={500}
                  _groupHover={{
                    color: dropZoneTextHoverColor,
                  }}
                >
                  {`Drag and drop images and videos`}
                  <br />
                  {`OR `}
                  <Text
                    as="span"
                    _groupHover={{
                      color: fieldHoverTextColor,
                    }}
                  >
                    {`browse files from your computer`}
                  </Text>
                </Text>
              </Box>
            </Center>
            <Input {...getInputProps()} id={questionCode} test-id={questionCode} />
          </Box>
        }

        <Flex mt={'1rem'} direction="column">
          <Grid mb={4} gap={3} templateColumns={'repeat(auto-fit, 100px)'}>
            {preview}
          </Grid>
          <Flex justify="center" w={'full'}>
            {equals(clientId)(lojing) ? (
              <HStack>
                <Button
                  variant="outline"
                  isDisabled={!!isEmpty(files)}
                  onClick={() => handleSave(files)}
                  test-id={`${questionCode}-SUBMIT`}
                  paddingInline={10}
                  paddingBlock={2}
                  fontSize={'sm'}
                  color={'product.secondary'}
                  borderRadius="full"
                  borderColor={'product.secondary'}
                >
                  {`Upload`}
                </Button>
                <Button
                  variant="outline"
                  isDisabled={!!isEmpty(files)}
                  onClick={() => closeDropzone()}
                  test-id={`${questionCode}-SUBMIT`}
                  paddingInline={10}
                  paddingBlock={2}
                  fontSize={'sm'}
                  color={'product.secondary'}
                  borderRadius="full"
                  borderColor={'product.secondary'}
                >
                  {`Cancel`}
                </Button>
              </HStack>
            ) : (
              <>
                <Button
                  mr="2"
                  variant="ghost"
                  onClick={handleOnClose}
                  test-id={`${questionCode}-CANCEL`}
                  borderRadius="full"
                  paddingInline={10}
                >
                  {`Cancel`}
                </Button>
                <Button
                  variant="solid"
                  isDisabled={!!isEmpty(files)}
                  onClick={handleOnSubmit}
                  test-id={`${questionCode}-SUBMIT`}
                  borderRadius="full"
                  paddingInline={10}
                >
                  {`Submit`}
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default DropZone
