import { Input } from '@chakra-ui/input'
import { useEffect, useState } from 'react'

const TextInput = ({ dataValue, onUpdate, ...rest }) => {
  const [value, setValue] = useState(dataValue)

  useEffect(() => {
    setValue(dataValue)
  }, [dataValue])

  const onChange = e => {
    setValue(e.target.value)
    onUpdate(e.target.value)
  }

  return <Input value={value} onChange={onChange} {...rest} />
}

export default TextInput
