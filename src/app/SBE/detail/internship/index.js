import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Box, HStack, VStack } from '@chakra-ui/react'
import useApi from 'api'
import { replace } from 'ramda'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'

import getActions from 'app/SBE/utils/get-actions'
import { topHeight } from 'app/SBE/detail/helpers/set-top-height'
import DetailHeader from 'app/layouts/components/header'
import ProfilePicture from 'app/layouts/components/profile_picture'
import DetailSubHeader from 'app/layouts/components/subheader'
import RightHandDetails from './templates/RightHandDetails'
import LeftHandDetails from './templates/LeftHandDetails'

const internshipDetail = {
  sectionIcon: faBriefcase,
  title: 'Internship Details',
  attributes: [
    'PRI_WORKSITE',
    'PRI_INTERNSHIP_START_DATE',
    'PRI_WHICH_DAYS_STRIPPED',
    'PRI_DRESS_CODE',
    'PRI_ASSOC_NUM_INTERNS',
  ],
}

const responsibilitiesAndOutcomes = [
  'PRI_ROLES_AND_RESPONSIBILITIES',
  'PRI_BASE_LEARNING_OUTCOMES',
  'PRI_SPECIFIC_LEARNING_OUTCOMES',
]

const subHeaderAttributes = ['PRI_ASSOC_INDUSTRY', 'PRI_STATUS']

const Internship = ({ sbeCode, targetCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))

  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const addressData = useSelector(selectCode(beCode, 'PRI_ADDRESS_FULL'))
  const address = addressData?.value
  const image = useSelector(selectCode(beCode, 'PRI_IMAGE_URL'))
  const { getImageSrc } = useApi()
  const src = getImageSrc(image?.value)
  const url = useSelector(selectCode(beCode, 'PRI_COMPANY_WEBSITE_URL'))
  const name = useSelector(selectCode(beCode, 'PRI_NAME'))
  const software = useSelector(selectCode(beCode, 'PRI_SOFTWARE'))
  const actions = getActions(sbe)
  const videoData = useSelector(selectCode('PRI_VIDEO_URL'))

  const linkedSupervisor = replace('SBE_INTERNSHIP_', 'SBE_LINKED_INTERN_SUPERVISOR_', sbeCode)
  const linkedHostCpy = replace('SBE_INTERNSHIP_', 'SBE_LINKED_HOST_CPY_', sbeCode)

  if (!sbe) return null

  if (!beCode) return null

  return (
    <Box
      w="70vw"
      h="100vh"
      style={{
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem',
      }}
    >
      <DetailHeader address={address} />
      <ProfilePicture src={src} />

      <VStack pt="5rem" overflow="scroll" h={`calc(100vh - ${topHeight})`}>
        <DetailSubHeader
          url={url}
          name={name}
          beCode={beCode}
          sbeCode={sbeCode}
          actions={actions}
          subHeaderAttributes={subHeaderAttributes}
          videoData={videoData}
        />
        <HStack w="65vw" align="start" pt="5" spacing="5">
          <LeftHandDetails
            beCode={beCode}
            internshipDetail={internshipDetail}
            linkedSupervisor={linkedSupervisor}
            software={software}
          />
          <RightHandDetails
            videoData={videoData}
            beCode={beCode}
            sbeCode={linkedHostCpy}
            attributes={responsibilitiesAndOutcomes}
          />
        </HStack>
      </VStack>
    </Box>
  )
}

export default Internship
