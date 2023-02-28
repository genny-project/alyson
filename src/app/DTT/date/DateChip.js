import { Text } from '@chakra-ui/react'
import Chip from 'app/layouts/components/chip'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'
import { useIsMobile } from '../../../utils/hooks'

const DateChip = ({ onClick, date, includeTime, onlyYear, month, isProductInternMatch, realm }) => {
  const isMobile = useIsMobile()

  return (
    <Chip
      maxW={isMobile ? 'inherit' : '25vw'}
      paddingInline={2}
      paddingBlock={1}
      onClick={onClick}
      bg={isProductInternMatch ? `${realm}.primary400` : 'initial'}
      color={isProductInternMatch ? `${realm}.accent100` : 'initial'}
      border={'1px solid'}
      borderColor={isProductInternMatch ? `${realm}.primary400` : 'initial'}
    >
      <Text>{timeBasedOnTimeZone(date, { includeTime, onlyYear, month })}</Text>
    </Chip>
  )
}

export default DateChip
