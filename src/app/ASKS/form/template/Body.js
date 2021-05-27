import { useState } from 'react'
import Group from './Group'

const FormBody = ({ groups, onFinish, questionCode, paginated }) => {
  const [group, setGroup] = useState(0)

  return groups.map(({ label, questions, subHeader, video }, idx) => (
    <Group
      {...{
        paginated,
        label,
        subHeader,
        video,
        idx,
        group,
        groups,
        questions,
        onFinish,
        questionCode,
        setGroup,
      }}
    />
  ))
}

export default FormBody
