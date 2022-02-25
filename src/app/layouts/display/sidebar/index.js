import { Center } from '@chakra-ui/react'
import Buttons from 'app/layouts/display/sidebar/buttons'
import { find, includes, reduce } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

import { SIDEBAR_WIDTH } from 'utils/constants'

const SideBar = () => {
  const allPcmCode = useSelector(selectCode(`PCMINFORMATION`)) || []

  const sidebarPcmCode = find(includes('_SIDEBAR'))(allPcmCode)
  const sidebarPcm = useSelector(selectCode(sidebarPcmCode, 'allAttributes'))

  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(sidebarPcm || [])
  const {
    PRI_LOC1,
    PRI_LOC2,
    PRI_LOC3,
    PRI_LOC4,
    PRI_LOC5,
    PRI_LOC6,
    PRI_TEMPLATE_CODE: code,
  } = mappedPcm

  console.log('%c 🙀', 'background: tomato; color: silver; padding: 0.5rem', mappedPcm)

  return (
    <Center w={SIDEBAR_WIDTH} bg="#224371" h="100vh">
      <Buttons questionCode={'QUE_PROJECT_SIDEBAR_GRP'} sideBarButtons={true} />
    </Center>
  )
}

export default SideBar
