import { HStack } from '@chakra-ui/layout'
import { find, inc, includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import NavButton from './NavButton'

const NAV_Q_CODE = 'QUE_PROJECT_SIDEBAR_GRP'

const Views = () => {
  const allPcms = useSelector(selectCode(`PCMINFORMATION`)) || []

  const sidebarPcm = find(includes('_SIDEBAR'))(allPcms)

  console.log('sidebarPcm', sidebarPcm)

  const buttonsArray = [
    'QUE_DASHBOARD_VIEW',
    'QUE_TAB_BUCKET_VIEW',
    'QUE_TREE_ITEM_CONTACTS_GRP',
    'QUE_TREE_ITEM_INTERNSHIPS',
    'QUE_TREE_ITEM_HOST_COMPANIES',
    'QUE_TREE_ITEM_EDU_PROVIDERS',
  ]

  return (
    <HStack zIndex="toast" spacing={8}>
      <NavButton code={`QUE_DASHBOARD_VIEW`} questionCode={NAV_Q_CODE} />
      <NavButton code={`QUE_TAB_BUCKET_VIEW`} questionCode={NAV_Q_CODE} />
      <NavButton code={`QUE_TREE_ITEM_CONTACTS_GRP`} questionCode={NAV_Q_CODE} />
      <NavButton code={`QUE_TREE_ITEM_INTERNSHIPS`} questionCode={NAV_Q_CODE} />
      <NavButton code={`QUE_TREE_ITEM_HOST_COMPANIES`} questionCode={NAV_Q_CODE} />
      <NavButton code={`QUE_TREE_ITEM_EDU_PROVIDERS`} questionCode={NAV_Q_CODE} />
    </HStack>
  )
}

export default Views
