import { useState } from 'react'
import { onSendMessage } from 'vertx'
import { Checkbox, FormControl, FormLabel, HStack } from '@chakra-ui/react'

const FilterDjpInterns = ({ processCodes }) => {
  const [filterDJPInternsOnly, setFilterDJPInternsOnly] = useState(false)
  const djpInternsOnlyMessage = {
    code: 'QUE_TAB_BUCKET_VIEW',
    parentCode: 'QUE_TAB_BUCKET_VIEW',
    targetCode: undefined,
  }
  const defaultMessage = {
    code: 'ACT_DJP_INTERN_SEARCH',
    parentCode: '',
    targetCode: JSON.stringify(processCodes),
  }

  const toggle = () => {
    onSendMessage(!!filterDJPInternsOnly ? djpInternsOnlyMessage : defaultMessage)
    setFilterDJPInternsOnly(!filterDJPInternsOnly)
  }

  return (
    <>
      <HStack alignItems={'center'}>
        <Checkbox isChecked={filterDJPInternsOnly} onChange={toggle} />
        <FormControl onClick={toggle}>
          <FormLabel cursor={'pointer'}>{'View DJP Interns Only'}</FormLabel>
        </FormControl>
      </HStack>
    </>
  )
}

export default FilterDjpInterns
