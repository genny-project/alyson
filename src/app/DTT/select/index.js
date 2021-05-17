import { includes, pathOr } from 'ramda'
import { useSelector } from 'react-redux'
import { Select as CSelect, Text } from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { selectCode, selectRows } from 'redux/db/selectors'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { Multiple } from './Multiple'
import { getValue } from './get-value'
import { useMobileValue } from 'utils/hooks'
import { onSendMessage } from 'vertx'

const Write = ({
  questionCode,
  label,
  placeholder,
  onSendAnswer,
  groupCode,
  component,
  dataType,
  data,
  targetCode,
}) => {
  const sourceCode = useSelector(selectCode('USER'))
  const options = useSelector(selectCode(groupCode)) || []

  const defaultValue = safelyParseJson(data?.value).toString()
  const { typeName } = dataType
  const multiple = includes('multiple', typeName || '') || component === 'tag'

  const ddEvent = debounce(
    value =>
      onSendMessage(
        {
          sourceCode,
          targetCode,
          code: data.attributeCode,
          value,
        },
        { event_type: 'DD', redirect: false },
      ),
    500,
  )

  if (multiple)
    return (
      <Multiple
        ddEvent={ddEvent}
        questionCode={questionCode}
        data={data}
        onSendAnswer={onSendAnswer}
        placeholder={placeholder}
        optionData={options}
        label={label}
      />
    )

  return !options.length ? (
    <Text fontStyle="tail.1" color="grey">
      {`Waiting on another answer`}
    </Text>
  ) : (
    <CSelect
      onFocus={() => ddEvent('')}
      placeholder={placeholder || 'Select'}
      test-id={groupCode}
      rootProps={{
        'test-id': questionCode,
      }}
      onChange={e => onSendAnswer([e.target.value])}
      defaultValue={defaultValue}
      w={'100%'}
      maxW="25vw"
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
