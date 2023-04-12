import { Switch } from '@chakra-ui/react'

import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import LabelledFlag from './labelled-flag'
import DefaultFlag from './default-flag'

const Read = ({ data = {} }) => {
  const sourceCode = useSelector(selectCode('USER'))

  const toggle = () => {
    onSendMessage({
      code: `ACT_${data.attributeCode}`,
      sourceCode,
      targetCode: data.baseEntityCode,
    })
  }
  return <Switch isChecked={data?.value} onChange={toggle} />
}

const Write = ({
  questionCode,
  data,
  onSendAnswer,
  placeholderName: label,
  mandatory,
  labelled,
}) => {
  if (labelled) {
    return (
      <LabelledFlag
        questionCode={questionCode}
        data={data}
        onSendAnswer={onSendAnswer}
        placeholderName={label}
        mandatory={mandatory}
      />
    )
  } else {
    return (
      <DefaultFlag
        questionCode={questionCode}
        data={data}
        onSendAnswer={onSendAnswer}
        placeholderName={label}
        mandatory={mandatory}
      />
    )
  }
}
const Flag = {
  Write,
  Read,
}

export default Flag
