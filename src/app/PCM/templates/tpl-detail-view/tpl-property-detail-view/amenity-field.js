import { Box, HStack, Text } from '@chakra-ui/react'
import { equals, find, includes, keys, replace, toUpper } from 'ramda'
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import debugOut from 'utils/debug-out'
import firstUpper from 'utils/helpers/first-upper'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const AmenityField = ({ attributeCode, code }) => {
  const entityAttribute = useSelector(selectCode(code, attributeCode))

  const titleUpper = toUpper(
    replace('Number of ')('')(entityAttribute?.attribute?.name || '') || attributeCode,
  )

  const title = firstUpper(titleUpper)
  const key = firstUpper(title.split(' ').pop())

  // https://plainenglish.io/blog/javascript-operator <- explandation of the "Nullish" operator,
  // but basically if foo = a ?? b then
  // if a is not null or undefined, foo = a
  // if a is null or undefined, foo = b
  // Unlike ||, which if foo = a || b, and a = falsey value, then foo = b
  const value = entityAttribute?.value ?? '?'

  if (equals(value)('?')) {
    debugOut.error(`${code}.${attributeCode} has no value!`)
  }

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
    <Box borderWidth="1px" borderColor="product.primary" borderRadius="3xl" py={1} px={3}>
      <HStack>
        <Text as="span" color="product.primary">
          <FontAwesomeIcon icon={icon} />
        </Text>
        <Text color="product.primary">
          {value} {title}
        </Text>
      </HStack>
    </Box>
  )
}

export default AmenityField
