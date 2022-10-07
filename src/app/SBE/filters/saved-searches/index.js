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
import { useEffect, useState } from 'react'
import SavedSearchDropdown from './saved-search-dropdown'
import SavedSearchRow from './saved-search-row'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import SavedSearchValue from './saved-search-value'
import { equals, find, forEach, keys, prop, reduce, reject, map } from 'ramda'
import getActiveAsk from './get-active-ask'
import { useSelector } from 'react-redux'
import { selectCode, selectCodes } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'
import Ask from 'app/ASKS/ask'
import jsonParseOrUndefined from 'utils/helpers/json-parse-or-undefined'
import notIncludes from 'utils/helpers/not-includes'
import getFilterAsks from './get-filter-asks'

const SavedSearches = ({ sbeCode }) => {
  const bookmarkParentCode = 'QUE_TABLE_FILTER_GRP'
  const bookmarkQuestionCode = 'QUE_SAVED_SEARCH_LIST'

  const bookmarkSaveQuestionCode = 'QUE_SAVED_SEARCH_SAVE'
  const bookmarkApplyQuestionCode = 'QUE_FILTER_APPLY'
  const bookmarkDeleteQuestionCode = 'QUE_SAVED_SEARCH_DELETE'

  const bookmarkAskData = {
    ...useSelector(selectCode(bookmarkParentCode, bookmarkQuestionCode)),
    forcedComponent: 'searchable_text',
  }

  const bookmarkSave = useSelector(selectCode(bookmarkParentCode, bookmarkSaveQuestionCode))
  const bookmarkApply = useSelector(selectCode(bookmarkParentCode, bookmarkApplyQuestionCode))
  const bookmarkDelete = useSelector(selectCode(bookmarkParentCode, bookmarkDeleteQuestionCode))

  const addFilterCode = 'QUE_ADD_FILTER_GRP'
  const existingFilterCode = 'QUE_EXISTING_FILTERS_GRP'

  const filterGrp = `QUE_FILTER_GRP_${sbeCode}`

  const filterAsks = getFilterAsks(filterGrp)(addFilterCode)

  console.log(filterAsks)

  const currentSearch = jsonParseOrUndefined(
    useSelector(selectCode(bookmarkAskData.targetCode, bookmarkAskData.attributeCode))?.value,
  )
  const currentSearchName = currentSearch?.userInput
  const currentSearchCode = currentSearch?.selectedOption

  const [columnSelect, setColumnSelect] = useState(undefined)
  const [operatorSelect, setOperatorSelect] = useState(undefined)
  const [value, setValue] = useState(undefined)

  const [rows, setRows] = useState([])

  const setFields = column => operator => value => {
    setColumnSelect(column)
    setOperatorSelect(operator)
    setValue(value)
  }

  const clearFields = () => setFields(undefined)(undefined)(undefined)

  const existingFilterGrp = useSelector(selectCode(filterGrp, existingFilterCode))
  const rowEquals = rowA => rowB => {
    return (
      equals(rowA.column.value)(rowB.column.value) &&
      equals(rowA.operator.value)(rowB.operator.value) &&
      equals(prop('value')(rowA.value) || rowA.value)(prop('value')(rowB.value) || rowB.value)
    )
  }

  useEffect(() => {
    setRows([])
    if (!!currentSearchCode && !!existingFilterGrp?.childAsks) {
      const existingRows = reject(ask => equals(ask.name)(currentSearchCode))(
        existingFilterGrp.childAsks,
      )

      const newRows = map(existingRow => {
        const ask = filterAsks[existingRow.question.code]

        return {
          column: { value: existingRow.name },
          operator: { value: existingRow.question.name },
          value: { value: existingRow.question.html },
          ask: ask,
        }
      })(existingRows)

      setRows(newRows)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSearchCode, existingFilterGrp])

  const activeAsk = getActiveAsk(filterGrp)(addFilterCode)

  const inputWidth = '20ch'

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

  const onDeleteRow = row => setRows(reject(rowEquals(row))(rows))

  const onEdit = row => {
    setFields(row.column)(row.operator)(row.value)
    onDeleteRow(row)
  }

  const sendMessage = parentCode => ask => value =>
    onSendMessage({
      code: ask.questionCode,
      parentCode: parentCode,
      targetCode: ask.targetCode,
      sourceCode: ask.sourceCode,
      value: value,
    })

  const sendBookmarkMessage = sendMessage(bookmarkParentCode)

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

  const onSave = () =>
    sendBookmarkMessage(bookmarkSave)(
      JSON.stringify({
        ...prepareRowsForSending(),
        SEARCH_NAME: currentSearchName,
        SEARCH_CODE: currentSearchCode,
      }),
    )

  const onApply = () => sendBookmarkMessage(bookmarkApply)(JSON.stringify(prepareRowsForSending()))

  const onDelete = () => sendBookmarkMessage(bookmarkDelete)({ SEARCH_CODE: currentSearchCode })

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
            <Box p={1}>
              <Ask
                parentCode={bookmarkParentCode}
                questionCode={bookmarkQuestionCode}
                passedAskData={bookmarkAskData}
                sourceCode={bookmarkAskData.sourceCode}
                config={{ overridePrefix: 'Create New Search' }}
              />
            </Box>
            <VStack w={'100%'}>
              {rows.map((row, index) => (
                <SavedSearchRow
                  key={`SAVED-SEARCH-ROW-${index}`}
                  row={row}
                  onEdit={onEdit}
                  onDelete={onDeleteRow}
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
              <HStack>
                <Button disabled={rows.length < 1 || !currentSearchName} onClick={onSave}>
                  Save
                </Button>
                <Button disabled={rows.length < 1} onClick={onApply}>
                  Apply
                </Button>
                <Button disabled={!currentSearchCode} onClick={onDelete}>
                  Delete
                </Button>
              </HStack>
            </VStack>
          </PopoverBody>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default SavedSearches
