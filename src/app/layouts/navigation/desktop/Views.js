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

  const {
    PRI_LOC1,
    PRI_LOC2,
    PRI_LOC3,
    PRI_LOC4,
    PRI_LOC5,
    PRI_LOC6,
    PRI_TEMPLATE_CODE: code,
  } = mappedPcm

  const TemplateOne = () => (
    <HStack zIndex="toast" spacing={8}>
      <NavButton code={PRI_LOC1} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC2} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC3} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC4} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC5} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC6} questionCode={NAV_Q_CODE} />
    </HStack>
  )

  const TemplateTwo = () => (
    <HStack zIndex="toast" spacing={8}>
      <NavButton code={PRI_LOC2} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC3} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC4} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC5} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC6} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC1} questionCode={NAV_Q_CODE} />
    </HStack>
  )

  const DefaultTemplate = () => (
    <HStack zIndex="toast" spacing={8}>
      <NavButton code={PRI_LOC1} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC2} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC3} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC4} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC5} questionCode={NAV_Q_CODE} />
      <NavButton code={PRI_LOC6} questionCode={NAV_Q_CODE} />
    </HStack>
  )

  if (sidebarPcm) {
    if (code === 'TPL_WEST') return <TemplateOne />

    if (code === 'TPL_WEST_TWO') return <TemplateTwo />
  }

  return <DefaultTemplate />
}

export default Views
