import { Center, VStack } from '@chakra-ui/react'
import { find, includes, reduce } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import SidebarButtons from 'app/layouts/display/sidebar/buttons/SidebarButtons'

import { SIDEBAR_WIDTH } from 'utils/constants'
import { NAV_Q_CODE } from 'utils/constants'

const SideBar = () => {
  const questionCode = NAV_Q_CODE
  const data = useSelector(selectCode(questionCode))

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

  const TemplateOne = () => {
    return (
      <Center w={SIDEBAR_WIDTH} bg="#224371" h="100vh">
        <VStack test-id={questionCode} justifyContent="center">
          <SidebarButtons
            key={PRI_LOC1}
            questionCode={questionCode}
            childCode={PRI_LOC1}
            sideBarButtons={true}
          />
          <SidebarButtons
            key={PRI_LOC2}
            questionCode={questionCode}
            childCode={PRI_LOC2}
            sideBarButtons={true}
          />
          <SidebarButtons
            key={PRI_LOC3}
            questionCode={questionCode}
            childCode={PRI_LOC3}
            sideBarButtons={true}
          />
          <SidebarButtons
            key={PRI_LOC4}
            questionCode={questionCode}
            childCode={PRI_LOC4}
            sideBarButtons={true}
          />
          <SidebarButtons
            key={PRI_LOC5}
            questionCode={questionCode}
            childCode={PRI_LOC5}
            sideBarButtons={true}
          />
          <SidebarButtons
            key={PRI_LOC6}
            questionCode={questionCode}
            childCode={PRI_LOC6}
            sideBarButtons={true}
          />
        </VStack>
      </Center>
    )
  }

  const DefaultTemplate = () => {
    return (
      <Center w={SIDEBAR_WIDTH} bg="#224371" h="100vh">
        <VStack test-id={questionCode} justifyContent="center">
          {data.map(childCode => (
            <SidebarButtons
              key={childCode}
              questionCode={questionCode}
              childCode={childCode}
              sideBarButtons={true}
            />
          ))}
        </VStack>
      </Center>
    )
  }

  if (!data) return null

  if (sidebarPcm) {
    if (code === 'TPL_WEST') return <TemplateOne />
  }

  return <DefaultTemplate />
}

export default SideBar
