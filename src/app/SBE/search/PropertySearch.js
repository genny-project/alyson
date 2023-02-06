import 'react-datepicker/dist/react-datepicker.css'

import { Box, Flex, IconButton, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import {
  faBuilding,
  faCalendarDay,
  faDollarSign,
  faMapMarkerAlt,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { forwardRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import useProductColors from 'utils/productColors'
import { onSendSearch } from 'vertx'

const SearchFields = ({ icon, label, inputType, onChange, styles }) => {
  return (
    <Box w={'min(100%, 15rem)'}>
      <InputGroup>
        <InputLeftElement color={'product.primary'} mt={'.125rem'}>
          <FontAwesomeIcon icon={icon} />
        </InputLeftElement>
        <Input placeholder={label} type={inputType} onChange={onChange} {...styles} />
      </InputGroup>
    </Box>
  )
}

const PropertySearch = ({ code, sourceCode, sbeCode }) => {
  const [locationValue, setLocationValue] = useState('')
  const [buildingValue, setBuilidingValue] = useState('')
  const [minBudgetValue, setMinBudgetValue] = useState('')
  const [maxBudgetValue, setMaxBudgetValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [livingType, setLivingType] = useState('')

  const searchValue =
    locationValue + buildingValue + minBudgetValue + maxBudgetValue + dateValue + livingType

  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
  } = useProductColors()

  const inputStyles = {
    h: '2.88rem',
    borderRadius: '6.25rem',
    bg: fieldBackgroundColor,
    borderColor: fieldBorderColor,
    fontSize: 'sm',
    fontWeight: 'medium',
    color: fieldTextColor,
    cursor: 'pointer',
    _hover: {
      borderColor: fieldHoverBorderColor,
      boxShadow: 'lg',
    },
    _focusVisible: {
      borderColor: 'product.secondary',
      boxShadow: 'initial',
    },
    _invalid: {
      background: 'error.50',
      borderColor: 'error.500',
      color: 'error.500',
    },
    _disabled: {
      borderColor: 'gray.300',
      background: 'gray.100',
    },
  }

  const DateInput = forwardRef(({ value, onClick }, ref) => (
    <InputGroup role="group">
      <Input
        placeholder={'Available'}
        defaultValue={value}
        ref={ref}
        onFocus={() => {
          onClick()
        }}
        {...inputStyles}
      />
      <InputLeftElement
        mt={'.125rem'}
        pointerEvents="none"
        color={'product.primary'}
        children={<FontAwesomeIcon icon={faCalendarDay} color={'inherit'} />}
      />
    </InputGroup>
  ))

  const handleOnBlur = () => {}

  const handleSubmit = e => {
    e.preventDefault()
    searchValue && onSendSearch({ searchValue, code, searchType: '!', sourceCode, sbeCode })
  }

  return (
    <Flex
      alignItems={'center'}
      flexWrap={'wrap'}
      gap={'1rem'}
      paddingBlock={'clamp(1rem, 5vw, 2.5rem)'}
      paddingInline={'clamp(1rem, 5vw + 1rem, 3.25rem)'}
      boxShadow={'0 .25rem 1.25rem rgb(51 71 91 / .22)'}
      borderRadius={'clamp(1.25rem, 5vw + 1rem, 6.25rem)'}
      w={'full'}
      position={'relative'}
    >
      <SearchFields
        icon={faMapMarkerAlt}
        label={'Where do you want to go?'}
        inputType={'text'}
        onChange={e => {
          setLocationValue(e.target.value)
        }}
        styles={inputStyles}
      />
      <SearchFields
        icon={faBuilding}
        label={'Apartment'}
        inputType={'text'}
        onChange={e => {
          setBuilidingValue(e.target.value)
        }}
        styles={inputStyles}
      />
      <SearchFields
        icon={faDollarSign}
        label={'Min Budget'}
        inputType={'text'}
        onChange={e => {
          setMinBudgetValue(e.target.value)
        }}
        styles={inputStyles}
      />
      <SearchFields
        icon={faDollarSign}
        label={'Max Budget'}
        inputType={'text'}
        onChange={e => {
          setMaxBudgetValue(e.target.value)
        }}
        styles={inputStyles}
      />

      <Box w={'min(100%, 15rem)'}>
        <DatePicker
          selected={dateValue}
          onChange={date => setDateValue(date)}
          dateFormat={'yyyy/MM/dd'}
          customInput={<DateInput />}
          onCalendarClose={handleOnBlur}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </Box>

      <SearchFields
        icon={faUser}
        label={'Living Type'}
        inputType={'text'}
        onChange={e => {
          setLivingType(e.target.value)
        }}
        styles={inputStyles}
      />

      <Box w={'2.88rem'}>
        <IconButton
          bg={'product.gradient100'}
          rounded={'full'}
          size="md"
          color="white"
          _hover={{
            bg: 'product.primary',
          }}
          onClick={handleSubmit}
          icon={<FontAwesomeIcon size="1x" icon={faSearch} />}
        />
      </Box>
    </Flex>
  )
}

export default PropertySearch
