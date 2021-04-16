import { useSelector, useDispatch } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Box, HStack, Link, Text, VStack } from '@chakra-ui/react'
import useApi from 'api'

import getActions from 'app/SBE/utils/get-actions'
import Attribute from 'app/BE/attribute'
import Action from 'app/BE/action'
import Status from 'app/DTT/status'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText, faUser } from '@fortawesome/free-solid-svg-icons'
import { closeDrawer } from 'redux/app'
import Lane from 'app/SBE/lane'
import { replace } from 'ramda'
import { useIsMobile } from 'utils/hooks'
import CompanyMobile from './mobile_view'
import { topHeight } from 'app/SBE/detail/helpers/set-top-height'
import DetailHeader from 'app/layouts/components/header'
import ProfilePicture from 'app/layouts/components/profile_picture'

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
        <Link href={url?.value}>
          <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
            {name?.value}
          </Text>
        </Link>
        <Attribute code={beCode} attribute={'PRI_ASSOC_INDUSTRY'} />
        <HStack>
          {actions.map(action => (
            <Action
              key={action}
              parentCode={sbeCode}
              targetCode={beCode}
              code={action}
              colorScheme="primary"
              size="md"
            />
          ))}
        </HStack>
        <HStack w="65vw" align="start" pt="5" spacing="5">
          <VStack align="start" w="50%">
            <HStack spacing="10" align="start">
              <FontAwesomeIcon icon={faUser} />
              <VStack align="start">
                <Text fontWeight="semibold">Contact details</Text>
                <Status.Read data={status} />
                <Attribute code={beCode} attribute={'PRI_MOBILE'} />
                <Attribute code={beCode} attribute={'PRI_LEGAL_NAME'} />
                <Attribute code={beCode} attribute={'PRI_ABN'} />
                <Attribute code={beCode} attribute={'PRI_LINKEDIN_URL'} />
              </VStack>
            </HStack>
            <HStack spacing="10" align="start">
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
              <VStack align="start">
                <Text fontWeight="semibold">Description</Text>
                <Attribute
                  code={beCode}
                  attribute={'PRI_COMPANY_DESCRIPTION'}
                  fallback={<Text>No company description</Text>}
                />
              </VStack>
            </HStack>
          </VStack>
          <Lane sbeCode={replace('SBE_HOST_CPY_', 'SBE_LINKED_INTERNSHIP_OPP_', sbeCode)} />
        </HStack>
      </VStack>
    </Box>
  )
}

export default Company
