import { useState } from 'react'
import Group from './Group'

const FormBody = ({ groups, onFinish, questionCode, paginated }) => {
  const [group, setGroup] = useState(0)
  const [adjGroups, setAdjGroups] = useState(groups)

  return adjGroups.map(({ label, questions, subHeader, video }, idx) =>
    idx === group ? (
      <Group
        {...{
          paginated,
          label,
          subHeader,
          video,
          idx,
          group,
          groups: adjGroups,
          questions,
          onFinish,
          questionCode,
          setGroup,
          setAdjGroups,
        }}
      />
    ) : null,
  )
}

export default FormBody
