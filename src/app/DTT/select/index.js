import { includes, pathOr } from 'ramda'
import { useSelector } from 'react-redux'
import { Select as CSelect, Text } from '@chakra-ui/react'

import { selectCode, selectRows } from 'redux/db/selectors'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { Multiple } from './Multiple'
import { getValue } from './get-value'
import { useMobileValue } from 'utils/hooks'

const Write = ({
  questionCode,
  label,
  placeholder,
  onSendAnswer,
  groupCode,
  component,
  dataType,
  data,
}) => {
  const options = useSelector(selectCode(groupCode)) || []

  const defaultValue = safelyParseJson(data?.value).toString()
  const { typeName } = dataType
  const multiple = includes('multiple', typeName || '') || component === 'tag'
  const width = useMobileValue(['100%', '25vw'])

  if (multiple)
    return (
      <Multiple
        questionCode={questionCode}
        data={data}
        onSendAnswer={onSendAnswer}
        placeholder={placeholder}
        optionData={options}
        label={label}
        w={width}
      />
    )

  return !options.length ? (
    <Text fontStyle="tail.1" color="grey">
      {`Waiting on another answer`}
    </Text>
  ) : (
    <CSelect
      placeholder={placeholder || 'Select'}
      test-id={groupCode}
      rootProps={{
        'test-id': questionCode,
      }}
      onChange={e => onSendAnswer([e.target.value])}
      defaultValue={defaultValue}
      w={width}
    >
      {options &&
        options.map(
          option =>
            option && (
              <option test-id={option.code} key={option.code} value={option.code}>
                {option.name}
              </option>
            ),
        )}
    </CSelect>
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
