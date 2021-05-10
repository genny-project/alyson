import { useSelector, useDispatch } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Box, HStack, VStack, Text, Link, Button } from '@chakra-ui/react'
import useApi from 'api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'

import getActions from 'app/SBE/utils/get-actions'
import { closeDrawer } from 'redux/app'
import { useIsMobile } from 'utils/hooks'
import InternsMobileView from './mobile_view'
import ProfilePicture from 'app/layouts/components/profile_picture'
import DetailSubHeader from 'app/layouts/components/subheader'
import DetailHeader from './template/Header'
import LeftHandDetails from './template/LeftHandDetails'
import RightHandDetails from './template/RightHandDetails'
import fixLnk from 'app/BE/attribute/fix-lnk.ts'
import { isNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'

const subHeaderAttributes = ['PRI_PREFERRED_NAME']

const contactDetails = {
  title: 'Contact Details',
  attributes: ['PRI_MOBILE', 'PRI_EMAIL', 'PRI_ADDRESS_FULL', 'PRI_LINKEDIN_URL'],
}

const horizontalLayoutDetails = {
  attributes: ['PRI_STUDENT_ID', 'PRI_ASSOC_EP'],
}

const internshipDetails = {
  title: 'Internship Details',
  attributes: ['PRI_START_DATE', 'PRI_ASSOC_DURATION', 'PRI_TRANSPORT'],
}

const recentEmployment = {
  title: 'Recent Employment',
  attributes: ['PRI_PREV_EMPLOYER', 'PRI_PREV_JOB_TITLE'],
}

const Intern = ({ sbeCode, targetCode }) => {
  const isMobile = useIsMobile()
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const image = useSelector(selectCode(beCode, 'PRI_IMAGE_URL'))
  const internsName = useSelector(selectCode(beCode, 'PRI_NAME'))
  const video = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))
  const careerObj = useSelector(selectCode(beCode, 'PRI_CAREER_OBJ'))
  const software = useSelector(selectCode(beCode, 'PRI_ASSOC_CURRENT_SOFTWARE'))

  const { getImageSrc, getSrc } = useApi()
  const videoSrc = getSrc(video?.value)
  const src = getImageSrc(image?.value)

  const actions = getActions(sbe)

  const api = useApi()
  const cvData = useSelector(selectCode(beCode, fixLnk('PRI_CV')))

  const careerObjText = careerObj?.value
  const topHeight =
    isNullOrUndefinedOrEmpty(videoSrc) && isNullOrUndefinedOrEmpty(careerObjText) ? '10vh' : '35vh'

  if (!beCode) return null

  return isMobile ? (
    <InternsMobileView
      onClose={onClose}
      careerObj={careerObj}
      videoSrc={videoSrc}
      internsName={internsName}
      beCode={beCode}
      actions={actions}
      src={src}
      sbeCode={sbeCode}
    />
  ) : (
    <Box
      w="70vw"
      h="100vh"
      style={{
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem',
      }}
    >
      <DetailHeader
        videoSrc={videoSrc}
        careerObjText={careerObjText}
        video={video}
        topHeight={topHeight}
      />
      <ProfilePicture src={src} />
      <Box overflow="scroll" h={`calc(100vh - ${topHeight})`}>
        <VStack pt="5rem" overflowX="hidden">
          <DetailSubHeader
            name={internsName}
            beCode={beCode}
            sbeCode={sbeCode}
            actions={actions}
            subHeaderAttributes={subHeaderAttributes}
          />
          {cvData?.value && (
            <Link
              isExternal
              p="2"
              color="primary"
              href={api.getSrc(cvData?.value)}
              style={{ textDecoration: 'none' }}
            >
              <Button
                colorScheme="blue"
                variant="solid"
                leftIcon={<FontAwesomeIcon size="lg" icon={faFileDownload} />}
              >
                <Text>{`Download CV`}</Text>
              </Button>
            </Link>
          )}

          <HStack w="65vw" align="start" pt="5" spacing="5">
            <LeftHandDetails
              beCode={beCode}
              contactDetails={contactDetails}
              horizontalLayoutDetails={horizontalLayoutDetails}
              internshipDetails={internshipDetails}
            />
            <RightHandDetails
              beCode={beCode}
              software={software}
              recentEmployment={recentEmployment}
              careerObj={careerObj}
            />
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}

export default Intern
