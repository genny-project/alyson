import { includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectDisplay } from 'redux/app/selectors'

const DisplayHandler = ({ displayCode, children }) => {
  const display = useSelector(selectDisplay)

  if (!includes(displayCode, display || '')) return null

  return children
}

export default DisplayHandler
