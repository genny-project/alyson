import { Box, HStack, Text } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { replace, includes, find, keys, toUpper, slice, toLower } from 'ramda'
import { faBed, faBath, faDoorOpen, faToilet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AmenityField = ({ attributeCode, code }) => {
  const entityAttribute = useSelector(selectCode(code, attributeCode))

  const titleUpper = toUpper(
    replace('Number of ')('')(entityAttribute?.attribute?.name || '') || attributeCode,
  )
  const title = slice(0, 1, titleUpper) + toLower(slice(1, titleUpper.length, titleUpper))

  // https://plainenglish.io/blog/javascript-operator <- explandation of the "Nullish" operator,
  // but basically if foo = a ?? b then
  // if a is not null or undefined, foo = a
  // if a is null or undefined, foo = b
  // Unlike ||, which if foo = a || b, and a = falsey value, then foo = b
  const value = entityAttribute?.value ?? '?'

  const iconSet = {
    Toilet: faToilet,
    Bath: faBath,
    Bed: faBed,
  }

  const icon = iconSet[find(a => includes(a)(title))(keys(iconSet))] || faDoorOpen

  return (
    <Box borderWidth="1px" borderColor="product.primary" borderRadius="3xl" p={1} paddingX={3}>
      <HStack>
        <FontAwesomeIcon icon={icon} />
        <Text color="product.primary">
          {value} {title}
        </Text>
      </HStack>
    </Box>
  )
}

export default AmenityField
