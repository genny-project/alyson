import './docViewerStyles.css'

import {
  Box,
  Button,
  CloseButton,
  HStack,
  Link,
  Progress,
  Spinner,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { faArrowDown, faCheck, faFileDownload } from '@fortawesome/free-solid-svg-icons'
import { equals, map, reduce } from 'ramda'
import { useEffect, useState } from 'react'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useApi from 'api'
import DropZone from 'app/DTT/upload/Dropzone'
import ImageType from 'app/DTT/upload/Image'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import isJson from 'utils/helpers/is-json'
import useProductColors from 'utils/productColors'
import { isArray, isString } from 'utils/helpers/is-type'

const Read = ({ code, data, dttData, parentCode, variant, config = {} }) => {
  const typeName = dttData?.typeName || ''
  const api = useApi()

  const [fileName, setFileName] = useState('')

  const { customButton, name } = config

  useEffect(() => {
    const getFileName = async uuid => {
      setFileName(await api.getMediaFileName(uuid))
    }
    if (data?.value) {
      getFileName(data?.value)
    }
  }, [api, data?.value])

  if (typeName === 'Image' || typeName === 'Multi Image')
    return (
      <ImageType.Read
        code={code}
        data={data}
        parentCode={parentCode}
        variant={variant}
        config={config}
        multiUpload={typeName === 'Multi Image'}
      />
    )
  if (!data?.value) return null

  if (customButton && name) {
    return (
      <Link style={{ textDecoration: 'none' }} href={api.getSrc(data.value)}>
        <Button
          colorScheme="primary"
          leftIcon={<FontAwesomeIcon icon={faArrowDown} />}
          borderRadius="2rem"
        >
          {name}
        </Button>
      </Link>
    )
  }

  return (
    <Link style={{ textDecoration: 'none' }} href={api.getSrc(data.value)}>
      <Button colorScheme="primary" leftIcon={<FontAwesomeIcon size="lg" icon={faFileDownload} />}>
        {fileName || data.attributeName}
      </Button>
    </Link>
  )
}

const Write = ({
  questionCode,
  data,
  dttData,
  onSendAnswer,
  video,
  name,
  placeholderName: label,
  clientId,
  mandatory,
  component,
}) => {
  const realm = useGetProductName().toLowerCase()
  const isProductInternmatch = useIsProductInternmatch()
  const api = useApi()
  const typeName = dttData?.typeName || ''
  const isImageType = equals(typeName, 'Image') || equals(component, 'multi_upload')
  const { getImageSrc, getDocumentSrc } = api
  const isDataValueArray = isArray(data?.value)
  const isDataValueString = isString(data?.value)
  const isJsonifiedArray = isJson(data?.value)
  const parsedArray = isJsonifiedArray && JSON.parse(data?.value)
  const parsedArrayValue = (isJsonifiedArray && parsedArray && parsedArray[0]) || ''
  const dataValue =
    data?.value && isDataValueArray
      ? data.value[0]
      : isJsonifiedArray
      ? parsedArrayValue
      : isDataValueString
      ? data?.value
      : null
  const src = isImageType ? getImageSrc(dataValue) : getDocumentSrc(dataValue)
  const [fileName, setFileName] = useState('')
  const [showDocument, setShowDocument] = useState(false)
  const [dropzone, setDropzone] = useState(!!video || isProductInternmatch)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(null)
  const openDropzone = () => setDropzone(true)
  const closeDropzone = () => setDropzone(false)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const { labelTextColor } = useProductColors()
  let maxFiles = equals(component, 'multi_upload') ? 10 : 1
  let multiUpload = equals(component, 'multi_upload') ? true : false

  const docs = [
    {
      uri: src,
    },
  ]

  useEffect(() => {
    setShowDocument(false)
    const delayInvoke = setTimeout(() => !!src && setShowDocument(true), 3000)
    return () => {
      clearTimeout(delayInvoke)
    }
  }, [src])

  useEffect(() => {
    const getFileName = async uuid => {
      setFileName(await api.getMediaFileName(uuid))
    }
    if (data?.value) {
      getFileName(data?.value)
    }
  }, [api, data?.value])

  const handleSave = async files => {
    if (!files && files.length) return

    setLoading(true)

    let data = new FormData()
    map(individualFile => data.append('file', individualFile))(files)
    try {
      const resp = await api.postMediaFile({ data, onUploadProgress: setProgress })
      const uuidList = reduce((acc, { uuid }) => (acc = acc.concat(uuid)), [])(resp || [])
      onSendAnswer(uuidList)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
    dispatchFieldMessage({ payload: questionCode })
  }

  return (
    <VStack>
      <HStack justifyContent={'space-between'} w={'full'}>
        <MandatorySymbol
          placeholderName={label}
          mandatory={mandatory}
          labelTextColor={isProductInternmatch ? `${realm}.primary` : labelTextColor}
          realm={realm}
        />
        {data?.value ? <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} /> : null}
      </HStack>
      <Box hidden={loading} alignSelf={'flex-start'} w="full">
        {isImageType ? (
          <ImageType.Write
            handleSave={handleSave}
            dropzone={dropzone}
            openDropzone={openDropzone}
            data={data}
            onSendAnswer={onSendAnswer}
            setLoading={setLoading}
            questionCode={questionCode}
            name={name}
            multiUpload={multiUpload}
            realm={realm}
            isProductInternmatch={isProductInternmatch}
          />
        ) : data?.value ? (
          <VStack>
            <Text fontWeight={'bold'}>{fileName}</Text>
            {!!src && !showDocument && <Spinner />}

            {!!src && showDocument && (
              <DocViewer
                prefetchMethod="GET"
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                config={{ header: { disableFileName: true } }}
              />

              // <Button onClick={() => window.open(src)}>{`Preview Document`}</Button>
            )}
            <HStack>
              {
                <Button leftIcon={<FontAwesomeIcon icon={faCheck} />} colorScheme="green">
                  File Uploaded
                </Button>
              }
              <Tooltip label="Click to remove">
                <CloseButton
                  cursor="pointer"
                  test-id={questionCode}
                  onClick={() => onSendAnswer()}
                />
              </Tooltip>
            </HStack>
          </VStack>
        ) : (
          <Button
            id={questionCode}
            hidden={!!dropzone}
            test-id={questionCode}
            onClick={openDropzone}
            colorScheme="product.primary"
            variant="solid"
            borderRadius={'full'}
            paddingBlock={2}
            paddingInline={2}
            minW={'9rem'}
            fontSize={'sm'}
            background={'product.secondary'}
            _hover={{
              background: 'product.secondaryAccent',
            }}
          >
            {`Upload`}
          </Button>
        )}
        {dropzone && (
          <DropZone
            video={video}
            handleSave={handleSave}
            closeDropzone={closeDropzone}
            questionCode={questionCode}
            id={questionCode}
            clientId={clientId}
            maxFiles={maxFiles}
            multiUpload={multiUpload}
          />
        )}
      </Box>
      <Box w={'full'} hidden={!loading}>
        <VStack align="start">
          {progress && progress.loaded !== progress.total ? (
            <Text> Thanks! Uploading, sit tight... </Text>
          ) : (
            <Text>Finishing up!</Text>
          )}

          <Progress
            w="full"
            h="1rem"
            colorScheme={'green'}
            borderRadius="md"
            value={progress ? Math.floor((progress.loaded / progress.total) * 100) : 0}
          />
        </VStack>
      </Box>
    </VStack>
  )
}

const Upload = {
  Read,
  Write,
}

export default Upload
