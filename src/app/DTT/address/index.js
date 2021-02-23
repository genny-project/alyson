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
} from '@chakra-ui/react'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddressPicker from './address_picker'
import StreetView from './street_view'

const Write = ({ questionCode, onSendAnswer, data }) => {
  return <AddressPicker questionCode={questionCode} onSendAnswer={onSendAnswer} data={data} />
}

const Read = ({ data }) => {
  if (!data?.value) return null

  return (
    <HStack>
      <Popover isLazy>
        <PopoverTrigger>
          <IconButton icon={<FontAwesomeIcon icon={faMapMarkerAlt} />} />
        </PopoverTrigger>
        <PopoverContent style={{ width: '42rem', height: '34rem' }}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{`${data.attributeName}, ${data.value}`}</PopoverHeader>
          <PopoverBody>
            <StreetView address={data.value} />
          </PopoverBody>
        </PopoverContent>
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
