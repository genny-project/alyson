import Select from '../select'
import Text from '../text'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Box, VStack, Button, Text as ChakraText } from '@chakra-ui/react'
import { onSendMessage } from 'vertx'
import debounce from 'lodash.debounce'
import { isEmpty } from 'ramda'
import mapOptions from '../select/map-options'
import useProductColors from 'utils/productColors'
import sleep from 'utils/helpers/sleep'

export const Write = ({
  questionCode,
  data,
  onSendAnswer,
  errorMessage,
  parentCode,
  placeholderName,
  mandatory,
  targetCode,
  attributeCode,
}) => {
  const dropdownData =
    useSelector(
      selectCode(`${parentCode}-${questionCode}-options`),
      /// Checking this way means that if left or right is undefined, the comparison still works as expected.
      /// Without the length checks I found this comparison didn't tend to behave as expected
      (left, right) => (left?.length || -1) === (right?.length || -2),
    ) || []

  const options = mapOptions(dropdownData)

  const processId = useSelector(selectCode(questionCode, 'processId'))
  const sourceCode = useSelector(selectCode('USER'))

  const [isFocused, setIsFocused] = useState(false)

  const [selectedOption, setSelectedOption] = useState(null)
  const [userInput, setUserInput] = useState(data?.value || '')
  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    labelTextColor,
    borderRadius,
  } = useProductColors()

  const onFocus = async focused => {
    //Focus is lost on the text component before on click can fire, hence this
    if (!focused) await sleep(100)
    setIsFocused(focused)
  }

  const onChange = input => {
    setUserInput(input)
    ddEvent(input)
  }

  const ddEvent = debounce(
    value =>
      onSendMessage(
        {
          sourceCode,
          targetCode,
          value,
          parentCode,
          questionCode,
          code: questionCode,
          processId: processId,
        },
        { event_type: 'DD', redirect: false, attributeCode, questionCode, code: questionCode },
      ),
    500,
  )

  const onSelect = option => {
    console.log(option)
  }

  return (
    <Box>
      <Text.Write
        questionCode={questionCode}
        data={data}
        regexPattern=".*"
        onSendAnswer={onSendAnswer}
        errorMessage={errorMessage}
        parentCode={parentCode}
        placeholderName={placeholderName}
        mandatory={mandatory}
        onFocus={onFocus}
        onChange={onChange}
        searchable
      />
      {isFocused && (
        <div
          style={{
            zIndex: 9,
            position: 'absolute',
            top: 'auto',
            left: 0,
            width: '100%',
            transition: 'all 0.25s ease',
          }}
        >
          <Box width="100%" shadow="lg" bg="#fff" fontSize={'0.875rem'} fontWeight={500}>
            {isEmpty(options) ? (
              <ChakraText textAlign={'center'}>No Options Available</ChakraText>
            ) : (
              <VStack>
                {options.map(option => {
                  return (
                    <Button
                      onClick={() => onSelect(option)}
                      w="100%"
                      sx={{
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        paddingInlineStart: 10,
                        paddingInlineEnd: 3,
                        paddingBlock: 2,
                        borderRadius: '1.25rem',
                        bg: '#fff',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: fieldTextColor,
                        _hover: {
                          bg: 'product.secondary',
                          color: '#fff',
                        },
                      }}
                      key={`${questionCode}-${option.value}`}
                    >
                      {option.label}
                    </Button>
                  )
                })}
              </VStack>
            )}
          </Box>
        </div>
      )}
    </Box>
  )
}

const Read = ({ data, dataType }) => {
  return <Select.Read data={data} dataType={dataType} />
}

const SearchableText = {
  Write,
  Read,
}

export default SearchableText
