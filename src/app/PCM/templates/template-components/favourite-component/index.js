import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import debounce from 'lodash.debounce'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import { Button } from '@chakra-ui/react'

const FavouriteComponent = ({ starred, sourceCode, targetCode }) => {
  const [isStarred, setIsStarred] = useState(starred)

  const sendEvt = value => {
    sendEvtClick({
      targetCode: targetCode,
      sourceCode: sourceCode,
      attributeCode: 'ACT_FAV_TOGGLE',
      value: value,
    })
  }
  const debouncedEvt = debounce(sendEvt, 500)

  const onClick = () => {
    const newStarred = !isStarred

    debouncedEvt(newStarred)
    setIsStarred(newStarred)
  }

  return (
    <Button onClick={onClick} m={0} p={0} bg="#00000000">
      <FontAwesomeIcon
        position="absolute"
        icon={faStar}
        size="lg"
        color={isStarred ? '#ffd700' : '#C0C0C0'}
      />
    </Button>
  )
}

export default FavouriteComponent
