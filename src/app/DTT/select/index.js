import { filter, includes, pathOr } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCodes, selectRows } from 'redux/db/selectors'
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
  const options = filter(a => !includes('GRP_', a), useSelector(selectRows(groupCode)))
  const optionData = useSelector(selectCodes(options, 'PRI_NAME'))

  const { typeName } = dataType
  const multiple = includes('multiple', typeName || '') || component === 'tag'

  if (multiple)
    return (
      <Multiple
        questionCode={questionCode}
        data={data}
        onSendAnswer={onSendAnswer}
        placeholder={placeholder}
        optionData={optionData}
        label={label}
      />
    )

  return !options.length ? (
    <Text fontStyle="tail1" color="grey">
      Waiting on another answer
    </Text>
  ) : (
    <CSelect
      placeholder={' '}
      test-id={groupCode}
      rootProps={{
        'test-id': questionCode,
      }}
      onChange={e => onSendAnswer([e.target.value])}
      defaultValue={safelyParseJson(data?.value)}
    >
      {optionData &&
        optionData.map(
          option =>
            option && (
              <option
                test-id={option.baseEntityCode}
                key={option.baseEntityCode}
                value={option.baseEntityCode}
              >
                {option.value}
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
