import { useSelector } from 'react-redux'
import { Card, CardHeader, CardContent, Button } from '@material-ui/core'
import { selectCode } from 'redux/db/selectors'
import sendAskClick from 'app/ASKS/utils/send-ask-click'

const ChildCard = ({ questionCode, childCode }) => {
  const data = useSelector(selectCode(questionCode, childCode))

  if (!data) return null

  const { name, childAsks } = data

  const onClick = () => sendAskClick(childCode, childCode)

  if (!childAsks)
    return (
      <Button onClick={onClick} variant="contained" color="primary">
        {name}
      </Button>
    )
  return (
    <Card>
      <CardHeader title={name} />
      <CardContent>
        {childAsks.map(ask => (
          <Button
            onClick={() => sendAskClick(childCode, ask.questionCode)}
            test-id={ask.questionCode}
            key={ask.questionCode}
            variant="outlined"
          >
            {ask.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}

export default ChildCard
