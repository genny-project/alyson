import React, { useState } from 'react'

const useRegexCheck = dataType => {
  console.log('dataType', dataType)

  const [regexPattern, setRegexPattern] = useState()

  if (dataType === 'DTT_STRING') {
    setRegexPattern(RegExp(/^[a-zA-Z]*$/))
  }

  return regexPattern
}

export default useRegexCheck
