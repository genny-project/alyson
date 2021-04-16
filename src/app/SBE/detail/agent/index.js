import { useSelector, useDispatch } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import useApi from 'api'

import getActions from 'app/SBE/utils/get-actions'
import Attribute from 'app/BE/attribute'
import Action from 'app/BE/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { closeDrawer } from 'redux/app'
import { useIsMobile } from 'utils/hooks'
import AgentMobile from './mobile_view'
import { topHeight } from 'app/SBE/detail/helpers/set-top-height'
import DetailHeader from 'app/layouts/components/header'
import ProfilePicture from 'app/layouts/components/profile_picture'

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
      <Box
        position="absolute"
        right="5"
        zIndex="modal"
        height={topHeight}
        overflow="hidden"
        transition="height 1s"
      >
        <VStack align="flex-end" mt="5">
          {actions && (
            <HStack>
              {actions.map(action => (
                <Action
                  parentCode={sbeCode}
                  code={action}
                  targetCode={beCode}
                  key={action}
                  size="md"
                  colorScheme="blue"
                />
              ))}
            </HStack>
          )}
          <Attribute code={beCode} attribute={'PRI_LINKEDIN_URL'} />
        </VStack>
      </Box>
      <ProfilePicture src={src} />
      <VStack pt="5rem" overflow="scroll" h={`calc(100vh - ${topHeight})`}>
        <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
          {name?.value}
        </Text>
        <Attribute code={beCode} attribute={'PRI_STATUS'} />
        <HStack w="65vw" align="start" pt="5" spacing="5">
          <VStack align="start" w="50%">
            <HStack spacing="10" align="start">
              <FontAwesomeIcon icon={faUser} />
              <VStack align="start">
                <Text fontWeight="semibold">Contact details</Text>
                <Attribute code={beCode} attribute={'PRI_MOBILE'} />
                <Attribute code={beCode} attribute={'PRI_ADDRESS_FULL'} />
                <Attribute code={beCode} attribute={'PRI_EMAIL'} />
              </VStack>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  )
}

export default Agent
