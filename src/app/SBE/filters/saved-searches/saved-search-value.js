import { Input } from '@chakra-ui/react'
import { equals } from 'ramda'
import SavedSearchDropdown from './saved-search-dropdown'
import getActiveAsk from './get-active-ask'

const SavedSearchValue = ({
  w,
  placeholder,
  value,
  onChange,
  disabled,
  parentCode,
  parentParentCode,
}) => {
  const activeAsk = getActiveAsk(parentParentCode)(parentCode)

  const isDisabled = !(!disabled && !!activeAsk)

  const isDropdown = equals(activeAsk?.question?.attribute?.dataType?.component ?? '')('dropdown')

  if (!isDropdown) {
    return (
      <Input
        disabled={isDisabled}
        onChange={e => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        w={w}
      />
    )
  } else {
    return (
      <SavedSearchDropdown
        disabled={isDisabled}
        onChange={onChange}
        value={value}
        questionCode={activeAsk?.questionCode}
        parentCode={parentCode}
        placeholder={placeholder}
        w={w}
      />
    )
  }
}

export default SavedSearchValue
