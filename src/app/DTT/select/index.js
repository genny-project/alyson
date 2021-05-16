import { filter, identity, includes, map, pathOr } from 'ramda'
import { useSelector } from 'react-redux'
import { Box, Text } from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { selectCode, selectRows } from 'redux/db/selectors'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { Multiple } from './Multiple'
import { getValue } from './get-value'
import { useMobileValue } from 'utils/hooks'
import { onSendMessage } from 'vertx'
import Autocomplete from './Autocomplete'

const Write = ({
  questionCode,
  placeholder,
  onSendAnswer,
  groupCode,
  component,
  dataType,
  data,
  targetCode,
}) => {
  const sourceCode = useSelector(selectCode('USER'))

  const { typeName } = dataType
  const multiple = includes('multiple', typeName || '') || component === 'tag'
  const width = useMobileValue(['100%', '25vw'])
  const optionData = useSelector(selectCode(groupCode)) || []
  const options = map(({ code, name }) => ({ label: name, value: code }))(optionData)

  const { attributeCode } = data || {}

  const ddEvent = debounce(
    value =>
      onSendMessage(
        {
          sourceCode,
          targetCode,
          value,
          parentCode: questionCode,
        },
        { event_type: 'DD', redirect: false, attributeCode },
      ),
    500,
  )

  const defaultValue = safelyParseJson(data?.value, [])

  return (
    <Autocomplete
      placeholder={!options.length ? 'Start typing to search' : placeholder || 'Select'}
      test-id={groupCode}
      rootProps={{
        'test-id': questionCode,
      }}
      options={options}
      onChange={onSendAnswer}
      defaultValue={defaultValue}
      w={width}
      multiple={multiple}
      ddEvent={ddEvent}
    />
  )
}

const getGroupFromDTT = pathOr('', ['validationList', 0, 'selectionBaseEntityGroupList', 0])

const Read = ({ data, dataType }) => {
  const groupCode = getGroupFromDTT(dataType)
  const options = useSelector(selectRows(groupCode))

  const value = getValue(data, options)

  return <Text noOfLines={3}>{`${value}`}</Text>
}

const Select = {
  Write,
  Read,
}

export default Select
