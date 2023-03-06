import { isEmpty, replace } from 'ramda'
import { HStack, IconButton, Text, Th } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import useProductColors from 'utils/productColors'
import './table.css'

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
    <Th borderColor={tableDividerColor} borderTopWidth="1px" className={tableCellCSS}>
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
