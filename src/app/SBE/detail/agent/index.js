import { useSelector, useDispatch } from 'react-redux'
import { Box, HStack, VStack } from '@chakra-ui/react'
import useApi from 'api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { selectCode, selectRows } from 'redux/db/selectors'
import { closeDrawer } from 'redux/app'
import { useIsMobile } from 'utils/hooks'
import { topHeight } from 'app/SBE/detail/helpers/set-top-height'
import AgentMobile from './mobile_view'
import getActions from 'app/SBE/utils/get-actions'
import DetailHeader from 'app/layouts/components/header'
import ProfilePicture from 'app/layouts/components/profile_picture'
import DetailSubHeader from 'app/layouts/components/subheader'
import DetailSection from 'app/layouts/components/detail_section'

const subHeaderAttributes = ['PRI_STATUS']

const contactDetails = {
  title: 'Contact Details',
  attributes: ['PRI_MOBILE', 'PRI_ADDRESS_FULL', 'PRI_EMAIL', 'PRI_LINKEDIN_URL'],
}

const Agent = ({ sbeCode, targetCode }) => {
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))

  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const addressData = useSelector(selectCode(beCode, 'PRI_ADDRESS_FULL'))
  const address = addressData?.value
  const image = useSelector(selectCode(beCode, 'PRI_IMAGE_URL'))
  const { getImageSrc } = useApi()
  const src = getImageSrc(image?.value)
  const name = useSelector(selectCode(beCode, 'PRI_NAME'))
  const actions = getActions(sbe)

  const isMobile = useIsMobile()

  if (!beCode) return null
  if (isMobile)
    return (
      <AgentMobile
        onClose={onClose}
        actions={actions}
        sbeCode={sbeCode}
        beCode={beCode}
        src={src}
        name={name}
      />
    )

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
          name={name}
          beCode={beCode}
          sbeCode={sbeCode}
          actions={actions}
          subHeaderAttributes={subHeaderAttributes}
        />
        <HStack w="65vw" align="start" pt="5" spacing="5">
          <VStack align="start" w="50%">
            <HStack spacing="10" align="start">
              <FontAwesomeIcon icon={faUser} />
              <DetailSection
                config={{ textStyle: 'body2' }}
                noTitle={false}
                code={beCode}
                details={contactDetails}
                hideLabel
              />
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  )
}

export default Agent
