import { useState } from 'react'
import Rating from './Rating'

const Write = ({ data, onSendAnswer, questionCode }) => {
  const [hover, setHover] = useState(0)

  return (
    <Rating
      questionCode={questionCode}
      onChange={onSendAnswer}
      value={data?.value}
      hover={hover}
      setHover={setHover}
    />
  )
}

const Read = ({ data }) => <Rating test-id={data.attributeCode} value={data?.value} />

const ARating = {
  Read,
  Write,
}

export default ARating
