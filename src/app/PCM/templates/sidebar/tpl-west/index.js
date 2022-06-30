import { Center, VStack } from '@chakra-ui/react'

import { SIDEBAR_WIDTH } from 'utils/constants'
import SidebarButtons from 'app/layouts/display/sidebar/buttons/SidebarButtons'
import { useIsMobile } from 'utils/hooks'

const TemplateWest = ({ questionCode, mappedPcm, mappedIconAndQuestionCode }) => {
  const isMobile = useIsMobile()

  const { PRI_LOC1, PRI_LOC2, PRI_LOC3, PRI_LOC4, PRI_LOC5, PRI_LOC6 } = mappedPcm

  return (
    <Center w={isMobile ? '80px' : SIDEBAR_WIDTH} bg="#224371" h="100vh" paddingInline={'3'}>
      <VStack test-id={questionCode} justifyContent="center">
        <SidebarButtons
          key={PRI_LOC1}
          questionCode={questionCode}
          childCode={PRI_LOC1}
          iconId={mappedIconAndQuestionCode[PRI_LOC1]}
        />
        <SidebarButtons
          key={PRI_LOC2}
          questionCode={questionCode}
          childCode={PRI_LOC2}
          iconId={mappedIconAndQuestionCode[PRI_LOC2]}
        />
        <SidebarButtons
          key={PRI_LOC3}
          questionCode={questionCode}
          childCode={PRI_LOC3}
          iconId={mappedIconAndQuestionCode[PRI_LOC3]}
        />
        <SidebarButtons
          key={PRI_LOC4}
          questionCode={questionCode}
          childCode={PRI_LOC4}
          iconId={mappedIconAndQuestionCode[PRI_LOC4]}
        />
        <SidebarButtons
          key={PRI_LOC5}
          questionCode={questionCode}
          childCode={PRI_LOC5}
          iconId={mappedIconAndQuestionCode[PRI_LOC5]}
        />
        <SidebarButtons
          key={PRI_LOC6}
          questionCode={questionCode}
          childCode={PRI_LOC6}
          iconId={mappedIconAndQuestionCode[PRI_LOC6]}
        />
      </VStack>
    </Center>
  )
}

export default TemplateWest
