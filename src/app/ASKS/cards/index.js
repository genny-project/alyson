import { Grid } from '@material-ui/core'
import ChildCard from './ChildCard'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const AskCards = ({ questionCode }) => {
  const data = useSelector(selectCode(questionCode))

  if (!data) return null

  return (
    <Grid test-id={questionCode} container>
      {data.map(childCode => (
        <ChildCard key={childCode} questionCode={questionCode} childCode={childCode} />
      ))}
    </Grid>
  )
}

export default AskCards
