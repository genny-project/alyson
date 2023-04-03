import { Box, HStack, Text } from '@chakra-ui/react'
import {
  faArchway,
  faBath,
  faBed,
  faCar,
  faDoorOpen,
  faShower,
  faStoreAlt,
  faToilet,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons'
import { find, includes, keys, replace, toUpper } from 'ramda'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import firstUpper from 'utils/helpers/first-upper'

const AmenityField = ({ attributeCode, code }) => {
  const entityAttribute = useSelector(selectCode(code, attributeCode))

  const titleUpper = toUpper(replace('NUMBER_OF')('')(attributeCode))

  const title = firstUpper(titleUpper)
  const key = firstUpper(title.split('_').pop())

  const entityAttributeValueInteger = entityAttribute?.valueInteger
  const entityAttributeValue = entityAttribute?.value
  const value = entityAttributeValueInteger || entityAttributeValue || ''

  const iconSet = {
    Toilet: faToilet,
    Bath: faShower,
    Bed: faBed,
    Ensuite: faBath,
    Space: faCar,
    Garage: faWarehouse,
    Carport: faArchway,
    Room: faStoreAlt,
  }

  const icon = iconSet[find(a => includes(a)(key))(keys(iconSet))] || faDoorOpen

  return (
    <Box
      color="product.primary"
      borderWidth="1px"
      borderColor="product.primary"
      borderRadius="3xl"
      py={1}
      px={3}
      fontSize={'sm'}
      _groupHover={{
        borderColor: 'white',
        color: 'white',
      }}
    >
      <HStack>
        <Text as="span">
          <FontAwesomeIcon icon={icon} />
        </Text>
        <Text>
          {value} {key}
        </Text>
      </HStack>
    </Box>
  )
}

export default AmenityField
