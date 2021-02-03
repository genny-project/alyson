import { useSelector } from 'react-redux'
import { Card, CardHeader } from '@material-ui/core'
import { selectCode } from 'redux/db/selectors'
import { getAttribute } from 'app/SBE/utils/get-columns'

const Person = ({ parentCode, code, columns }) => {
  const title = useSelector(selectCode(code, getAttribute(columns[0])))
  const subTitle = useSelector(selectCode(code, getAttribute(columns[1])))

  if (!title) return null

  return (
    <Card>
      <CardHeader title={title?.value} subheader={subTitle?.value} />
    </Card>
  )
}

export default Person
