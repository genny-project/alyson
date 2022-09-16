import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import debounce from 'lodash.debounce'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'

export const Write = ({ questionCode, onSendAnswer }) => {
  const [starred, setStarred] = useState(false)
  const debouncedSendAnswer = debounce(onSendAnswer, 500)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const handleChange = currentState => {
    setStarred(currentState => !currentState)
    debouncedSendAnswer(!currentState)
    dispatchFieldMessage({ payload: questionCode })
  }

  return (
    <FontAwesomeIcon
      onClick={() => handleChange(starred)}
      size="lg"
      icon={faStar}
      color={starred ? '#ffd700' : '#C0C0C0'}
    />
  )
}

export const Read = ({ data }) => {
  const isStarred = data.value
  return <FontAwesomeIcon size="lg" icon={faStar} color={isStarred ? '#ffd700' : '#C0C0C0'} />
}

const Favourites = {
  Write,
  Read,
}

export default Favourites
