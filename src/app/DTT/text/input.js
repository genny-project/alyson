import { useEffect, useState } from 'react'

import { Input } from '@chakra-ui/input'
import { useMobileValue } from 'utils/hooks'

const TextInput = ({ dataValue, onUpdate, ...rest }) => {
  const [value, setValue] = useState(dataValue)
  const maxW = useMobileValue(['', '25vw'])

  useEffect(() => {
    setValue(dataValue)
  }, [dataValue])

  const onChange = e => {
    setValue(e.target.value)
    onUpdate(e.target.value)
  }

  return <Input value={value} onChange={onChange} maxW={maxW} {...rest} />
}

export default TextInput
