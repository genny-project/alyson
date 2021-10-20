import {
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
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import AddressPicker from './address_picker'
import Card from 'app/layouts/components/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeroIconButton from 'app/layouts/components/hero_icon_button'
import StreetView from './street_view'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const Write = ({ questionCode, onSendAnswer, data }) => {
  return <AddressPicker questionCode={questionCode} onSendAnswer={onSendAnswer} data={data} />
}

const Read = ({ data, config = {} }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false })
  const { hideIcon } = config

  if (!data?.value) return null

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
    <HStack>
      <Popover isLazy>
        <PopoverTrigger>
          <>
            {/* <IconButton
              variant="unstyled"
              icon={<HeroIconButton icon={<FontAwesomeIcon icon={faMapMarkerAlt} />} />}
            /> */}
            <Text>
              <HeroIconButton icon={<FontAwesomeIcon icon={faMapMarkerAlt} />} />
            </Text>
          </>
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
