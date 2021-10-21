import Group from './Group'
import { useState } from 'react'

const FormBody = ({ groups, onFinish, questionCode, paginated }) => {
  const [group, setGroup] = useState(0)
  const [adjGroups, setAdjGroups] = useState(groups)

  return adjGroups.map(({ label, questions, subHeader, video }, idx) =>
    idx === group || !paginated ? (
      <Group
        key={idx}
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
