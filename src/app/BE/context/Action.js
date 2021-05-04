import { MenuItem } from '@chakra-ui/react'
import { includes } from 'ramda'

import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const Action = ({
  parentCode,
  code,
  targetCode,
  config = [
    'ACT_PRI_EVENT_UNARCHIVE_INTERN',
    'ACT_PRI_EVENT_VIEW_APPLICATIONS',
    'ACT_PRI_EVENT_VIEW',
  ],
}) => {
  const data = useSelector(selectCode(parentCode, code))
  if (!data) return null

  const handleClick = (code, data) => {
    includes(code)(config)
      ? window.confirm(`Are you sure you want to ${data.attributeName}?`) &&
        onSendMessage({
          parentCode,
          code,
          targetCode,
        })
      : onSendMessage({
          parentCode,
          code,
          targetCode,
        })
  }

  return (
    <div>
      <MenuItem test-id={code} onClick={() => handleClick(code, data)}>
        {data.attributeName}
      </MenuItem>
    </div>
  )
}

export default Action
