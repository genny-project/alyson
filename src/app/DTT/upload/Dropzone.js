import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  Tooltip,
  VStack,
  useToast,
} from '@chakra-ui/react'
import {
  faCloudUploadAlt,
  faExclamationTriangle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import { compose, equals, includes, isEmpty, map, pathOr, split } from 'ramda'
import { useIsProductInternmatch, useIsProductLojing } from 'utils/helpers/check-product-name'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { isImageField } from 'utils/functions'
import useGetProductName from 'utils/helpers/get-product-name'
import { useIsMobile } from 'utils/hooks'
import useProductColors from 'utils/productColors'

const DropZone = ({
  video,
  handleSave,
  closeDropzone,
  maxFiles,
  questionCode,
  clientId,
  multiUpload,
}) => {
  const [files, setFiles] = useState([])
  const [hover, setHover] = useState(false)
  const toast = useToast()
  const checkIfImage = compose(includes('image'), split('/'))
  const isMobile = useIsMobile()

  const isProductInternmatch = useIsProductInternmatch()
  const isProductLojing = useIsProductLojing()
  const productName = useGetProductName().toLocaleLowerCase()

  const uploaderText = multiUpload
    ? `Drag and drop images and videos`
    : `Drag and drop image and video`
  const uploaderFileText = multiUpload
    ? `browse files from your computer`
    : ` browse file from your computer`

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

  const singleDropile = (acceptedFiles, rejectedFiles) => {
    setFiles(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
      !isEmpty(rejectedFiles) && showErrorMessage(rejectedFiles[0]),
    )
  }

  const multiDropFile = (acceptedFiles, rejectedFiles) => {
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
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: video
      ? 'video/*'
      : isImageField(questionCode)
      ? 'image/*'
      : 'application/pdf, .doc, .docx, .xml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .dot, .rtf, .odt, image/*',
    maxFiles: maxFiles,
    onDrop: multiUpload ? multiDropFile : singleDropile,
  })

  const removeSelectedFile = fileToBeRemoved => {
    const filteredFiles = files.filter(file => !equals(file)(fileToBeRemoved))
    setFiles(filteredFiles)
  }

  const preview = map((file, idx) => {
    const { name, preview, type, size } = file
    const fileType = type.split('/')
    const fileSizeBytes = size
    const fileSize = fileSizeBytes / 1024 ** 2
    const fileSizeRounded = fileSize.toFixed(2) + 'MB'

    if (checkIfImage(type)) {
      return (
        <Grid
          borderRadius={4}
          position="relative"
          key={`${preview}-${idx}`}
          templateColumns={multiUpload ? 'repeat(auto-fit, minmax(5rem, 25rem))' : 'auto 1fr'}
          gap={'.5rem'}
          placeContent={'baseline'}
          placeItems={multiUpload ? 'initial' : 'center'}
        >
          <AspectRatio
            bg={'#f4f5f5'}
            border={'1px solid #f7f7f7'}
            width={multiUpload ? '11rem' : '6rem'}
            height={multiUpload ? '4.5rem' : '2.45rem'}
            borderRadius={4}
            overflow={'hidden'}
          >
            <Image src={preview} alt={`Thumb ${name}`} />
          </AspectRatio>

          <Box
            paddingInlineEnd={3}
            display={'grid'}
            gridTemplateColumns={multiUpload ? '1fr' : '1fr 1fr'}
          >
            <Text noOfLines={2} fontSize={'sm'} fontWeight={'500'}>
              {name}
            </Text>
            <Text fontSize={'xs'}>{`${fileType[0]} | ${fileSizeRounded} | ${fileType[1]}`}</Text>
          </Box>

          <Text
            position="absolute"
            top="-10px"
            right="-10px"
            lineHeight="1px"
            borderRadius="50%"
            background="white"
            cursor="pointer"
            color="red.400"
            onClick={() => removeSelectedFile(file)}
          >
            <FontAwesomeIcon icon={faTimesCircle} size="lg" />
          </Text>
        </Grid>
      )
    }

    return (
      <Stack direction={isMobile ? 'column' : 'row'} key={`${preview}-${idx}`} p="4" spacing={2}>
        <Text>{`Uploaded File:`}</Text>
        <Text ml="2" noOfLines={'2'} flex={1}>
          {name}
        </Text>
      </Stack>
    )
  })(files)

  return (
    <VStack>
      <Tooltip label="Click to close the file uploader">
        <Button
          hidden={isProductInternmatch}
          mt="2"
          alignSelf="flex-end"
          onClick={() => closeDropzone()}
        >
          {`Close`}
        </Button>
      </Tooltip>
      {multiUpload ? (
        <Box
          w="full"
          p={4}
          mt={'1rem'}
          bg={'white'}
          borderWidth={'1px'}
          borderRadius={16}
          borderColor={isProductInternmatch ? 'gray.500' : 'product.grayMedium'}
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
                    borderColor: isProductInternmatch ? 'white' : fieldHoverBorderColor,
                    bg: isProductInternmatch ? `${productName}.primary` : fieldHoverBackgroundColor,
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
                      {uploaderText}
                      <br />
                      {`OR `}
                      <Text
                        as="span"
                        _groupHover={{
                          color: isProductInternmatch
                            ? `${productName}.primary400`
                            : fieldHoverTextColor,
                        }}
                      >
                        {uploaderFileText}
                      </Text>
                    </Text>
                  </Box>
                </Center>
                <Input {...getInputProps()} id={questionCode} test-id={questionCode} />
              </Box>
            }

            <Flex mt={'1rem'} direction="column">
              <Grid
                mb={4}
                gap={3}
                templateColumns={preview.length === 1 ? '1fr' : 'repeat(auto-fit, 175px)'}
              >
                {preview}
              </Grid>
              <Flex justify="center" w={'full'}>
                {isProductLojing ? (
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
                      fontWeight="normal"
                      hidden={isProductInternmatch}
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
                      bg={isProductInternmatch && `${productName}.secondary`}
                      color={isProductInternmatch && 'white'}
                      fontWeight="normal"
                      _disabled={{ pointerEvents: 'none', opacity: '.4' }}
                    >
                      {`Submit`}
                    </Button>
                  </>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Box>
      ) : (
        <Box w="full" display={'grid'}>
          <Flex
            w={'full'}
            p={4}
            bg={'white'}
            borderWidth={'1px'}
            borderRadius={16}
            borderColor={isProductInternmatch ? 'gray.500' : 'product.grayMedium'}
            direction="column"
            color={'gray.600'}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            _hover={{
              boxShadow: '0px 4px 20px 5px rgba(51, 71, 91, 0.06)',
            }}
            role="group"
          >
            {!files.length ? (
              <Box {...getRootProps()}>
                <Center
                  cursor="pointer"
                  borderRadius={12}
                  borderColor={'blackAlpha.20'}
                  borderWidth={1}
                  borderStyle={'dashed'}
                  _groupHover={{
                    borderColor: isProductInternmatch ? 'white' : fieldHoverBorderColor,
                    bg: isProductInternmatch ? `${productName}.primary` : fieldHoverBackgroundColor,
                  }}
                >
                  <HStack
                    paddingBlock={4}
                    paddingInline={'clamp(1rem, 2vw, 3rem)'}
                    textAlign={'center'}
                    color={'gray.600'}
                    _groupHover={{
                      color: fieldHoverTextColor,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      color={'inherit'}
                      style={{
                        width: 40,
                        height: 30,
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
                      {uploaderText}
                      {uploaderFileText}
                    </Text>
                  </HStack>
                </Center>
                <Input {...getInputProps()} id={questionCode} test-id={questionCode} />
              </Box>
            ) : (
              <Flex mt={'1rem'} direction="row">
                <Grid
                  mb={4}
                  gap={3}
                  templateColumns={preview.length === 1 ? '1fr' : 'repeat(auto-fit, 175px)'}
                  _empty={{ display: 'none' }}
                >
                  {preview}
                </Grid>
              </Flex>
            )}
          </Flex>
          <Button
            mt={5}
            justifySelf={'flex-end'}
            variant="solid"
            isDisabled={!!isEmpty(files)}
            onClick={handleOnSubmit}
            test-id={`${questionCode}-SUBMIT`}
            borderRadius="full"
            paddingInline={10}
            bg={isProductInternmatch && `${productName}.secondary`}
            color={isProductInternmatch && 'white'}
            fontWeight="normal"
            fontSize={'sm'}
            _disabled={{ pointerEvents: 'none', opacity: '.4' }}
          >
            {'Upload'}
          </Button>
        </Box>
      )}
    </VStack>
  )
}

export default DropZone
