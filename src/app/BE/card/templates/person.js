import { useSelector } from 'react-redux'
import { Box } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { getAttribute } from 'app/SBE/utils/get-columns'
import Text from 'app/DTT/text'

const Person = ({ parentCode, code, columns }) => {
  const title = useSelector(selectCode(code, getAttribute(columns[0])))
  const subTitle = useSelector(selectCode(code, getAttribute(columns[1])))

  return (
    <Box
      _hover={{ bg: 'gray.50' }}
      cursor="context-menu"
      p="4"
      w="xs"
      h="30"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Text.Read value={title?.value} />
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {title?.value}
      </Box>
      <Box as="span" color="gray.600" fontSize="sm">
        {subTitle?.value}
      </Box>
    </Box>
  )
}

export default Person
