import { Input } from '@chakra-ui/react'
import { isEmpty } from 'ramda'
import SavedSearchDropdown from './saved-search-dropdown'

const SavedSearchValue = ({ w, placeholder, options, value, onChange, disabled }) => {
  if (isEmpty(options || [])) {
    return (
      <Input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        w={w}
      />
    )
  } else {
    return (
      <SavedSearchDropdown
        disabled={disabled}
        onChange={onChange}
        value={value}
        options={options}
        placeholder={placeholder}
        w={w}
      />
    )
  }
}

export default SavedSearchValue
