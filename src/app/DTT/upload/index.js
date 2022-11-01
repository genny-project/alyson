import {
  Box,
  Button,
  CloseButton,
  HStack,
  Link,
  Progress,
  Text,
  Tooltip,
  VStack,
  Image,
} from '@chakra-ui/react'
import { faArrowDown, faCheck, faFileDownload } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import DropZone from './Dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageType from './Image'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import useApi from 'api'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import useProductColors from 'utils/productColors'

const Read = ({ code, data, dttData, parentCode, variant, config = {} }) => {
  const typeName = dttData?.typeName
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

  if (typeName === 'Image')
    return (
      <ImageType.Read
        code={code}
        data={data}
        parentCode={parentCode}
        variant={variant}
        config={config}
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
}) => {
  const api = useApi()
  const typeName = dttData?.typeName
  const { getImageSrc } = useApi()
  const src = getImageSrc(data?.value, { height: '500', width: '500' })
  const [fileName, setFileName] = useState('')
  const [dropzone, setDropzone] = useState(!!video)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(null)
  const openDropzone = () => setDropzone(true)
  const closeDropzone = () => setDropzone(false)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const { labelTextColor } = useProductColors()

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

    closeDropzone()
    let data = new FormData()
    data.append('file', files[0])

    try {
      const resp = await api.postMediaFile({ data, onUploadProgress: setProgress })
      onSendAnswer(resp?.uuid)
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
          labelTextColor={labelTextColor}
        />

        {data?.value ? <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} /> : null}
      </HStack>
      <Box w={'full'} hidden={loading}>
        {typeName === 'Image' ? (
          <ImageType.Write
            handleSave={handleSave}
            openDropzone={openDropzone}
            data={data}
            onSendAnswer={onSendAnswer}
            setLoading={setLoading}
            questionCode={questionCode}
            name={name}
          />
        ) : data?.value ? (
          <VStack>
            {!!src && <Image src={src} borderRadius="md" />}
            <HStack>
              <Button leftIcon={<FontAwesomeIcon icon={faCheck} />} colorScheme="green">{`${
                fileName || 'File'
              } Uploaded`}</Button>
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
            w="30rem"
            h="1rem"
            colorScheme={'green'}
            borderRadius="md"
            // value={progress ? Math.floor((progress.loaded / progress.total) * 100) : 0}
            isIndeterminate
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
