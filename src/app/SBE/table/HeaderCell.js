import { replace } from 'ramda'
import { Td, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendAnswer } from 'vertx'

const Cell = ({ attribute, parentCode }) => {
  const data = useSelector(selectCode(parentCode, attribute))
  const sort = useSelector(selectCode(parentCode, replace('COL_', 'SRT_', attribute)))

  return (
    <Td>
      <Text
        color={sort && sort.weight === 0 ? 'teal' : ''}
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
        fontWeight="semibold"
      >
        {data?.attributeName} {sort ? (sort.value === 'ASC' ? '▲' : '▼') : ''}
      </Text>
    </Td>
  )
}

export default Cell
