import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
} from '@chakra-ui/react'
import { faStreetView } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddressPicker from './address_picker'
import StreetView from './street_view'

const Write = ({ questionCode, onSendAnswer, data }) => {
  return <AddressPicker questionCode={questionCode} onSendAnswer={onSendAnswer} data={data} />
}

const Read = ({ data }) => {
  if (!data?.value) return null

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button leftIcon={<FontAwesomeIcon icon={faStreetView} />} size="xs" colorScheme="teal">
          {data.value}
        </Button>
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
  )
}

const Address = {
  Write,
  Read,
}

export default Address
