import { useState } from 'react'
import useApi from 'api'
import { useSelector, useDispatch } from 'react-redux'
import { Box, HStack, IconButton, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import getActions from 'app/SBE/utils/get-actions'
import { closeDrawer } from 'redux/app'
import { selectCode, selectRows } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import RepMobile from './mobile_view'
import ProfilePicture from 'app/layouts/components/profile_picture'
import DetailSubHeader from './templates/SubHeader'
import LeftHandDetails from './templates/LeftHandDetails'
import RightHandDetails from './templates/RightHandDetails'

const contactDetails = {
  title: 'Contact Details',
  attributes: ['PRI_MOBILE', 'PRI_EMAIL', 'PRI_LINKEDIN_URL'],
}

const Rep = ({ sbeCode, targetCode }) => {
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const image = useSelector(selectCode(beCode, 'PRI_IMAGE_URL'))
  const name = useSelector(selectCode(beCode, 'PRI_NAME'))
  const assocHC = useSelector(selectCode(beCode, 'PRI_ASSOC_HC'))?.value
  const jobTitle = useSelector(selectCode(beCode, 'PRI_JOB_TITLE'))?.value

  const { getImageSrc } = useApi()
  const src = getImageSrc(image?.value)

  const actions = getActions(sbe)

  const [topHeight, setTopHeight] = useState('1vh')

  const handleScroll = () => {
    if (topHeight !== '1vh') setTopHeight('1vh')
  }

  const isMobile = useIsMobile()
  if (!beCode) return null

  if (isMobile)
    return (
      <RepMobile
        onClose={onClose}
        src={src}
        name={name}
        jobTitle={jobTitle}
        assocHC={assocHC}
        actions={actions}
        sbeCode={sbeCode}
        beCode={beCode}
      />
    )

  return (
    <Box
      w="70vw"
      h="90vh"
      style={{
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem',
      }}
    >
      <Box position="absolute" right="2" top="2">
        <IconButton
          onClick={onClose}
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
        />
      </Box>
      <ProfilePicture src={src} />
      <VStack pt="5rem" onScroll={handleScroll} overflow="scroll" h={`calc(90vh - ${topHeight})`}>
        <DetailSubHeader
          name={name}
          assocHC={assocHC}
          jobTitle={jobTitle}
          actions={actions}
          beCode={beCode}
          sbeCode={sbeCode}
        />
        <HStack w="65vw" align="start" pt="5" spacing="5">
          <LeftHandDetails beCode={beCode} contactDetails={contactDetails} />
          <RightHandDetails sbeCode={sbeCode} />
        </HStack>
      </VStack>
    </Box>
  )
}

export default Rep
