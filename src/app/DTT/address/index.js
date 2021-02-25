import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  HStack,
  IconButton,
  Text,
  Portal,
  Collapse,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddressPicker from './address_picker'
import StreetView from './street_view'

const Write = ({ questionCode, onSendAnswer, data }) => {
  return <AddressPicker questionCode={questionCode} onSendAnswer={onSendAnswer} data={data} />
}

const Read = ({ data, config }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  if (!data?.value) return null

  return config?.collapse ? (
    <VStack alignItems="start">
      <HStack>
        <IconButton onClick={onToggle} icon={<FontAwesomeIcon icon={faMapMarkerAlt} />} />
        <Text minW="8rem">{data.value}</Text>
      </HStack>
      <Collapse in={isOpen}>
        <StreetView address={data.value} />
      </Collapse>
    </VStack>
  ) : (
    <HStack>
      <Popover isLazy>
        <PopoverTrigger>
          <IconButton icon={<FontAwesomeIcon icon={faMapMarkerAlt} />} />
        </PopoverTrigger>
        {config?.portal ? (
          <Portal>
            <PopoverContent style={{ width: '42rem', height: '34rem' }}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>{`${data.attributeName}, ${data.value}`}</PopoverHeader>
              <PopoverBody>
                <StreetView address={data.value} />
              </PopoverBody>
            </PopoverContent>
          </Portal>
        ) : (
          <PopoverContent style={{ width: '42rem', height: '34rem' }}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>{`${data.attributeName}, ${data.value}`}</PopoverHeader>
            <PopoverBody>
              <StreetView address={data.value} />
            </PopoverBody>
          </PopoverContent>
        )}
        <Portal>
          <PopoverContent style={{ width: '42rem', height: '34rem' }}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>{`${data.attributeName}, ${data.value}`}</PopoverHeader>
            <PopoverBody>
              <StreetView address={data.value} />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <Text minW="8rem">{data.value}</Text>
    </HStack>
  )
}

const Address = {
  Write,
  Read,
}

export default Address
