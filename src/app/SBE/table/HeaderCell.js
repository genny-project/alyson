import { replace } from 'ramda'
import { HStack, IconButton, Td, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendAnswer } from 'vertx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

const Cell = ({ attribute, parentCode }) => {
  const data = useSelector(selectCode(parentCode, attribute))
  const sort = useSelector(selectCode(parentCode, replace('COL_', 'SRT_', attribute)))

  return (
    <Td>
      <HStack spacing="4" color={sort && sort.weight === 0 ? 'teal' : ''}>
        <Text fontWeight="semibold">{data?.attributeName}</Text>
        <IconButton
          variant="ghost"
          cursor={sort ? 'pointer' : null}
          onClick={
            sort
              ? () =>
                  onSendAnswer({
                    attributeCode: sort.attributeCode,
                    targetCode: sort.baseEntityCode,
                    value: sort.value === 'ASC' ? 'DESC' : 'ASC',
                  })
              : null
          }
          icon={
            <FontAwesomeIcon
              icon={sort ? (sort.value === 'ASC' ? faAngleUp : faAngleDown) : null}
            />
          }
        />
      </HStack>
    </Td>
  )
}

export default Cell
