import { VStack } from '@chakra-ui/layout'

import 'app/layouts/components/css/hide-scroll.css'
import Header from 'app/SBE/detail-profile/detail-layout/intern/detail-sections/desktop/template/Header.js'
import {
  InternshipPreferenceSection,
  InternshipSection,
  ExperienceSection,
} from 'app/SBE/detail-profile/detail-layout/intern/detail-sections/desktop/template/ProfileSections.js'

const DefaultTemplate = ({ beCode }) => {
  return (
    <VStack flex="1" m={3} mb={8} spacing={6}>
      <Header beCode={beCode} />
      <InternshipPreferenceSection beCode={beCode} />
      <InternshipSection beCode={beCode} />
      <ExperienceSection beCode={beCode} />
    </VStack>
  )
}

const TemplateOne = ({ beCode, mappedPcm }) => {
  const {
    PRI_LOC11,
    PRI_LOC12,
    PRI_LOC13,
    PRI_LOC14,
    PRI_LOC15,
    PRI_LOC16,
    PRI_LOC17,
    PRI_LOC18,
    PRI_LOC19,
    PRI_LOC20,
    PRI_LOC21,
    PRI_LOC22,
    PRI_LOC23,
    PRI_LOC24,
    PRI_LOC25,
  } = mappedPcm

  return (
    <VStack flex="1" m={3} mb={8} spacing={6}>
      <Header beCode={beCode} />
      <InternshipPreferenceSection beCode={beCode} pcm={true} mappedPcm={mappedPcm} />
      <InternshipSection beCode={beCode} pcm={true} mappedPcm={mappedPcm} />
      <ExperienceSection beCode={beCode} pcm={true} mappedPcm={mappedPcm} />
    </VStack>
  )
}

const RightDetail = ({ beCode, pcm, mappedPcm }) => {
  const { PRI_TEMPLATE_CODE: code } = mappedPcm
  console.log('********mappedpcm********', mappedPcm)

  if (pcm) {
    if (code === 'TPL_DETAIL_VIEW_1') return <TemplateOne beCode={beCode} mappedPcm={mappedPcm} />
  }
  return <DefaultTemplate beCode={beCode} />
}

export default RightDetail
