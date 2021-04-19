import { filter, includes, pathOr } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode, selectCodes, selectRows } from 'redux/db/selectors'
import { Select as CSelect, Text } from '@chakra-ui/react'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { Multiple } from './Multiple'
import { getValue } from './get-value'

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

  const { typeName } = dataType
  const multiple = includes('multiple', typeName || '') || component === 'tag'

  if (multiple)
    return (
      <Multiple
        questionCode={questionCode}
        data={data}
        onSendAnswer={onSendAnswer}
        placeholder={placeholder}
        optionData={options}
        label={label}
      />
    )

  return !options.length ? (
    <Text fontStyle="tail1" color="grey">
      Waiting on another answer
    </Text>
  ) : (
    <CSelect
      placeholder={placeholder || 'Select'}
      test-id={groupCode}
      rootProps={{
        'test-id': questionCode,
      }}
      onChange={e => onSendAnswer([e.target.value])}
      defaultValue={safelyParseJson(data?.value)}
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
