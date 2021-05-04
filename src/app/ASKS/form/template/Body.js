import { useState } from 'react'
import Group from './Group'

const FormBody = ({ groups, onFinish, questionCode }) => {
  const [group, setGroup] = useState(0)

  return groups.map(({ label, questions }, idx) => (
    <Group {...{ label, idx, group, groups, questions, onFinish, questionCode, setGroup }} />
  ))
}

export default FormBody
