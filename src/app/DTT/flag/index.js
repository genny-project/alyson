import { Switch } from '@chakra-ui/react'

import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import LabelledFlag from 'app/DTT/flag/labelled-flag'
import DefaultFlag from 'app/DTT/flag/default-flag'

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
  html,
  config,
}) => {
  if (labelled) {
    return (
      <LabelledFlag
        questionCode={questionCode}
        data={data}
        onSendAnswer={onSendAnswer}
        placeholderName={label}
        mandatory={mandatory}
        html={html}
        config={config}
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
