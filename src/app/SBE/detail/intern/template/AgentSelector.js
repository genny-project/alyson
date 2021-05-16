import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const AgentSelector = ({ beCode }) => {
  const agent = useSelector(selectCode(beCode, 'LNK_AGENT'))

  console.log(agent)
  return null
}

export default AgentSelector
