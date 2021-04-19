import { useSelector, useDispatch } from 'react-redux'
import { replace } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Box, HStack, VStack } from '@chakra-ui/react'
import useApi from 'api'

import getActions from 'app/SBE/utils/get-actions'

import { closeDrawer } from 'redux/app'
import Lane from 'app/SBE/lane'
import { useIsMobile } from 'utils/hooks'
import CompanyMobile from './mobile_view'
import { topHeight } from 'app/SBE/detail/helpers/set-top-height'
import DetailHeader from 'app/layouts/components/header'
import ProfilePicture from 'app/layouts/components/profile_picture'
import DetailSubHeader from 'app/layouts/components/subheader'
import LeftHandDetails from './templates/LeftHandDetails'

const subHeaderAttributes = ['PRI_ASSOC_INDUSTRY']

const contactdetails = {
  title: 'Contact Details',
  attributes: ['PRI_MOBILE', 'PRI_LEGAL_NAME', 'PRI_ABN', 'PRI_LINKEDIN_URL'],
}

const Company = ({ sbeCode, targetCode }) => {
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
  const url = useSelector(selectCode(beCode, 'PRI_COMPANY_WEBSITE_URL'))
  const name = useSelector(selectCode(beCode, 'PRI_NAME'))
  const status = useSelector(selectCode(beCode, 'PRI_STATUS'))
  const actions = getActions(sbe)

  const isMobile = useIsMobile()

  if (!beCode) return null
  if (isMobile)
    return (
      <CompanyMobile
        name={name}
        status={status}
        url={url}
        topHeight={topHeight}
        onClose={onClose}
        actions={actions}
        sbeCode={sbeCode}
        beCode={beCode}
        src={src}
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
          url={url}
          name={name}
          beCode={beCode}
          sbeCode={sbeCode}
          actions={actions}
          subHeaderAttributes={subHeaderAttributes}
        />

        <HStack w="65vw" align="start" pt="5" spacing="5">
          <LeftHandDetails beCode={beCode} contactdetails={contactdetails} status={status} />
          <Lane sbeCode={replace('SBE_HOST_CPY_', 'SBE_LINKED_INTERNSHIP_OPP_', sbeCode)} />
        </HStack>
      </VStack>
    </Box>
  )
}

export default Company
