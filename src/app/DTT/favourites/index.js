import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import debounce from 'lodash.debounce'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'

export const Write = ({ questionCode, data, onSendAnswer }) => {
  const [starred, setStarred] = useState(false)
  const debouncedSendAnswer = debounce(onSendAnswer, 500)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const handleClick = currentState => {
    setStarred(currentState => !currentState)
    debouncedSendAnswer(currentState)
    dispatchFieldMessage({ payload: questionCode })
  }

  return (
    <FontAwesomeIcon
      onClick={() => handleClick(starred)}
      size="lg"
      icon={!!starred ? faStarHalf : faStar}
    />
  )
}
export const Read = ({ data }) => {
  const isStarred = data?.value
  return <FontAwesomeIcon size="lg" icon={isStarred ? faStarHalf : faStar} />
}
const Favourites = {
  Write,
  Read,
}
export default Favourites
