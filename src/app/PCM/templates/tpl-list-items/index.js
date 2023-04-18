import { VStack } from '@chakra-ui/react'
import { compose, map } from 'ramda'
import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import TemplateListItemsItem from 'app/PCM/templates/tpl-list-items/tpl-list-items-item'

const TemplateListItems = ({ mappedPcm }) => {
  const sbeCode = mappedPcm?.PRI_LOC1 ?? ''
  const rows = compose(useSelector, selectRows)(sbeCode) || []

  return (
    <VStack alignItems={'flex-start'}>
      {map(row => <TemplateListItemsItem key={row} code={row} />)(rows)}
    </VStack>
  )
}

export default TemplateListItems
