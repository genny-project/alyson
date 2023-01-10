import useProductColors from 'utils/productColors'
import DatePicker from 'react-datepicker'

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import safelyParseDate from 'utils/helpers/safely-parse-date'

const SBEAddDate = ({ askData, value, onChange, disabled }) => {
  const questionCode = askData?.questionCode || ''

  const themeSecondary = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.value

  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    borderRadius,
  } = useProductColors()

  const doOnChange = value => {
    onChange({ raw: value, parsed: safelyParseDate(value).toISOString() })
  }

  return (
    <DatePicker
      onChange={doOnChange}
      value={value}
      disabled={disabled}
      customInput={
        <InputGroup role="group">
          <Input
            isDisabled={disabled}
            id={questionCode}
            test-id={questionCode}
            defaultValue={!!value?.raw ? format(value?.raw, 'yyyy-MM-dd') : ''}
            placeholder={askData?.name}
            w="full"
            h={'auto'}
            paddingBlock={3}
            paddingEnd={6}
            bg={fieldBackgroundColor}
            borderRadius={borderRadius}
            borderColor={fieldBorderColor}
            fontSize={'sm'}
            fontWeight={'medium'}
            color={fieldTextColor}
            cursor={'pointer'}
            _hover={{
              borderColor: fieldHoverBorderColor,
              boxShadow: 'lg',
            }}
            _focusVisible={{
              borderColor: 'product.secondary',
              boxShadow: 'initial',
            }}
            _invalid={{
              background: 'error.50',
              borderColor: 'error.500',
              color: 'error.500',
            }}
            _disabled={{
              borderColor: 'transparent',
              background: 'gray.100',
            }}
            required={true}
          />
          <InputLeftElement
            mt="2px"
            ml={3}
            color={value ? themeSecondary : 'gray.600'}
            pointerEvents="none"
            _groupHover={{
              color: themeSecondary,
            }}
            _groupfocusvisible={{
              color: themeSecondary,
            }}
            children={<FontAwesomeIcon icon={faCalendarDay} color={'inherit'} />}
          />
        </InputGroup>
      }
    />
  )
}

export default SBEAddDate
