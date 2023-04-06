import {
  Box,
  Collapse,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { equals, not } from 'ramda'

import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from 'app/layouts/components/card'
import HeroIconButton from 'app/layouts/components/hero_icon_button'
import AddressPicker from './address_picker'
import RepeatableAddressPicker from './address_picker/repeatable-picker'
import StreetView from './street_view'
import isJson from 'utils/helpers/is-json'

const Write = ({
  questionCode,
  onSendAnswer,
  data,
  placeholderName,
  mandatory,
  clientId,
  errorMessage,
  repeatable = false,
}) => {
  if (not(repeatable)) {
    return (
      <AddressPicker
        id={questionCode}
        questionCode={questionCode}
        onSendAnswer={onSendAnswer}
        data={data}
        placeholderName={placeholderName}
        mandatory={mandatory}
        clientId={clientId}
        errorMessage={errorMessage}
      />
    )
  } else {
    return (
      <RepeatableAddressPicker
        id={questionCode}
        questionCode={questionCode}
        onSendAnswer={onSendAnswer}
        data={data}
        placeholderName={placeholderName}
        mandatory={mandatory}
        clientId={clientId}
        errorMessage={errorMessage}
      />
    )
  }
}

const Read = ({ parentCode, data, config = {} }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false })
  const { hideIcon } = config

  const isSubmitFormField = equals(parentCode, 'QUE_SUBMIT_APPLICATION')

  const submitFormFieldStyles = {
    bg: 'white',
    w: 'full',
    paddingBlock: '.25remß',
    paddingInline: 6,
    fontWeight: 400,
    fontSize: 'sm',
    height: 'auto',
    borderRadius: 'calc(0.25rem - 1px)',
    margin: '.5rem 0 1rem  !important',
  }

  const styles = isSubmitFormField ? submitFormFieldStyles : {}

  if (!data?.value) return null

  const parseData = dataValue => {
    const isValueJson = isJson(dataValue)
    const parsedDataValueObject = isValueJson ? JSON.parse(dataValue) : undefined
    const parsedDataValue = parsedDataValueObject?.full_address
    if (isValueJson) return parsedDataValue
    return dataValue
  }

  const dataVal = parseData(data?.value)

  return config?.collapse ? (
    <VStack align="start">
      <HStack onClick={onToggle} cursor="pointer">
        <IconButton icon={<FontAwesomeIcon icon={faMapMarkerAlt} />} />
        <Text minW="8rem">{data.value}</Text>
      </HStack>
      <Card zIndex="banner" bg="transparent" variant="card3" p="0">
        <Collapse in={isOpen} unmountOnExit>
          <StreetView address={data.value} style={{ width: '60vw', height: '30rem' }} />
        </Collapse>
      </Card>
    </VStack>
  ) : hideIcon ? (
    <Text minW="8rem">{data.value}</Text>
  ) : (
    <HStack {...styles}>
      <Popover isLazy>
        <PopoverTrigger>
          <>
            {/* <IconButton
              variant="unstyled"
              icon={<HeroIconButton icon={<FontAwesomeIcon icon={faMapMarkerAlt} />} />}
            /> */}
            <Box>
              <HeroIconButton icon={<FontAwesomeIcon icon={faMapMarkerAlt} />} />
            </Box>
          </>
        </PopoverTrigger>

        {config?.portal ? (
          <Portal>
            <PopoverContent style={{ width: '42rem', height: '34rem' }}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>{`${data.attributeName}, ${dataVal}`}</PopoverHeader>
              <PopoverBody>
                <StreetView address={data.value} />
              </PopoverBody>
            </PopoverContent>
          </Portal>
        ) : (
          <PopoverContent style={{ width: '42rem', height: '34rem' }}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>{`${data.attributeName}, ${dataVal}`}</PopoverHeader>
            <PopoverBody>
              <StreetView address={data.value} />
            </PopoverBody>
          </PopoverContent>
        )}
      </Popover>
      <Text minW="8rem">{dataVal}</Text>
    </HStack>
  )
}

const Address = {
  Write,
  Read,
}

export default Address
