import { MenuItem } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import { useSelector } from 'react-redux'
import { isFunction } from 'utils/helpers/is-type'

const ChildMenuItem = ({ onClose, questionCode, childCode, rootCode, targetCode }) => {
  const data = useSelector(selectCode(questionCode, childCode))
  const processId = useSelector(selectCode(questionCode, 'processId'))

  if (!data) return null

  const { name } = data

  const onClick = () => {
    sendEvtClick({
      parentCode: questionCode,
      code: childCode,
      sourceCode: rootCode,
      targetCode: targetCode,
      processId: processId,
    })
    isFunction(onClose) && onClose()
  }

  return (
    <MenuItem test-id={childCode} onClick={onClick} color="#000000" fontSize={'sm'}>
      {name}
    </MenuItem>
  )
}

export default ChildMenuItem
