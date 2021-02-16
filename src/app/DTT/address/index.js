import {
  Button,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  PopoverHeader,
} from '@chakra-ui/react'
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
        <Button>{data?.value}</Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: '42rem', height: '34rem' }}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{data.attributeName}</PopoverHeader>
        <PopoverBody>
          <StreetView address={data?.value} />
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
