import './table.css'

import { HStack, IconButton, Text, Th } from '@chakra-ui/react'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { isEmpty, replace } from 'ramda'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import useProductColors from 'utils/productColors'

const Cell = ({ attribute, parentCode }) => {
  const userCode = useSelector(selectCode('USER'))
  const data = useSelector(selectCode(parentCode, attribute))
  const sort = useSelector(selectCode(parentCode, replace('COL_', 'SRT_', attribute))) || {}
  const {
    tableHeaderTextStyle,
    tableDividerColor,
    tableHeaderMargin,
    tableCellCSS,
  } = useProductColors()

  const onClick = () => {
    sendEvtClick({
      processId: 'no-idq', //Not sure this is great but I don't know if we'll get this from anywhere
      attributeCode: sort.attributeCode,
      code: 'ACT_SRT',
      sourceCode: userCode,
      targetCode: parentCode,
      value: sort.value === 'ASC' ? 'DESC' : 'ASC',
    })
  }

  return (
    <Th py={4} borderColor={tableDividerColor} borderTopWidth="1px" className={tableCellCSS}>
      <HStack marginY={tableHeaderMargin}>
        <Text textTransform={'none'} textStyle={tableHeaderTextStyle}>
          {data?.attributeName}
        </Text>
        <IconButton
          hidden={isEmpty(sort)}
          variant="ghost"
          cursor={'pointer'}
          onClick={onClick}
          icon={<FontAwesomeIcon icon={sort.value === 'ASC' ? faAngleUp : faAngleDown} />}
        />
      </HStack>
    </Th>
  )
}

export default Cell
