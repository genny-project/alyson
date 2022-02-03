import { HStack } from '@chakra-ui/layout'
import { find, includes, reduce } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import NavButton from './NavButton'

const NAV_Q_CODE = 'QUE_PROJECT_SIDEBAR_GRP'

const Views = () => {
  const allPcmCode = useSelector(selectCode(`PCMINFORMATION`)) || []

  const sidebarPcmCode = find(includes('_SIDEBAR'))(allPcmCode)
  const sidebarPcm = useSelector(selectCode(sidebarPcmCode, 'allAttributes'))

  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(sidebarPcm || [])

  console.log('sidebarPcm', mappedPcm)

  const { PRI_LOC1, PRI_LOC2, PRI_LOC3, PRI_LOC4, PRI_LOC5, PRI_LOC6 } = mappedPcm

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
      <NavButton code={PRI_LOC1} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC2} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC3} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC4} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC5} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC6} questionCode={NAV_Q_CODE} />
    </HStack>
  )
}

export default Views
