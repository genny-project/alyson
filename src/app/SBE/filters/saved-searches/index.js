import {
  Box,
  Popover,
  PopoverTrigger,
  Button,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  VStack,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import SavedSearchDropdown from './saved-search-dropdown'
import SavedSearchRow from './saved-search-row'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import SavedSearchValue from './saved-search-value'
import { equals, keys, prop, reduce, reject } from 'ramda'
import getActiveAsk from './get-active-ask'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const SavedSearches = ({ sbeCode }) => {
  const addFilterCode = 'QUE_ADD_FILTER_GRP'

  const filterGrp = `QUE_FILTER_GRP_${sbeCode}`

  const submitCode = `QUE_SUBMIT`

  const submitAsk = useSelector(selectCode(addFilterCode, submitCode))

  const [columnSelect, setColumnSelect] = useState(undefined)
  const [operatorSelect, setOperatorSelect] = useState(undefined)
  const [value, setValue] = useState(undefined)

  const [rows, setRows] = useState([])

  const activeAsk = getActiveAsk(filterGrp)(addFilterCode)

  const inputWidth = '20ch'

  const rowEquals = rowA => rowB => {
    return (
      equals(rowA.column.value)(rowB.column.value) &&
      equals(rowA.operator.value)(rowB.operator.value) &&
      equals(prop('value')(rowA.value) || rowA.value)(prop('value')(rowB.value) || rowB.value)
    )
  }

  const setFields = column => operator => value => {
    setColumnSelect(column)
    setOperatorSelect(operator)
    setValue(value)
  }

  const clearFields = () => setFields(undefined)(undefined)(undefined)

  const addRow = () => {
    const newRow = {
      column: columnSelect,
      operator: operatorSelect,
      value: value,
      ask: activeAsk,
    }

    setRows([...rows, newRow])
    clearFields()
  }

  const onTrigger = () => {
    clearFields()
  }

  const onDelete = row => setRows(reject(rowEquals(row))(rows))

  const onEdit = row => {
    setFields(row.column)(row.operator)(row.value)
    onDelete(row)
  }

  const prepareRowsForSending = () => {
    const output = reduce((acc, row) => {
      return {
        ...acc,
        [`ROW_${keys(acc).length}`]: {
          questionCode: row.ask.questionCode,
          column: row.column.value,
          value: prop('value')(row.value) || row.value,
          option: row.operator.value,
        },
      }
    })({})(rows)
    return output
  }

  const onSubmit = () => {
    onSendMessage({
      code: submitAsk.questionCode,
      parentCode: addFilterCode,
      targetCode: submitAsk.targetCode,
      sourceCode: submitAsk.sourceCode,
      value: JSON.stringify(prepareRowsForSending()),
    })
  }

  return (
    <Box>
      <Popover isLazy>
        <PopoverTrigger>
          <Button variant="outline" w="full" onClick={onTrigger}>
            {`Saved Searches`}
          </Button>
        </PopoverTrigger>
        <PopoverContent bg="#fff" borderRadius={'md'} w={'100%'}>
          <PopoverBody w={'100%'}>
            <VStack w={'100%'}>
              {rows.map((row, index) => (
                <SavedSearchRow
                  key={`SAVED-SEARCH-ROW-${index}`}
                  row={row}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
              <HStack>
                <SavedSearchDropdown
                  w={inputWidth}
                  parentCode={addFilterCode}
                  questionCode={'QUE_FILTER_COLUMN'}
                  value={columnSelect || ''}
                  sendAnswers
                  onChange={option => {
                    clearFields()
                    setColumnSelect(option)
                  }}
                />
                <SavedSearchDropdown
                  parentCode={addFilterCode}
                  w={inputWidth}
                  disabled={!columnSelect}
                  questionCode={'QUE_FILTER_OPTION'}
                  value={operatorSelect || ''}
                  onChange={option => setOperatorSelect(option)}
                />
                <SavedSearchValue
                  w={inputWidth}
                  disabled={!operatorSelect}
                  placeholder={'Value'}
                  parentCode={addFilterCode}
                  parentParentCode={filterGrp}
                  value={value || ''}
                  onChange={option => setValue(option)}
                />
                <IconButton
                  isDisabled={!value}
                  onClick={addRow}
                  icon={<FontAwesomeIcon icon={faPlusCircle} />}
                />
              </HStack>

              <Button disabled={rows.length < 1} onClick={onSubmit}>
                Submit
              </Button>
            </VStack>
          </PopoverBody>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default SavedSearches
