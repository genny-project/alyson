import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Avatar, Box, Flex, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import useApi from 'api'

import getActions from 'app/SBE/utils/get-actions'
import Attribute from 'app/BE/attribute'
import Action from 'app/BE/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText, faTimesCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import { closeDrawer } from 'redux/app'
import { includes, map, replace } from 'ramda'
import LinkedInternships from 'app/SBE/detail/rep/linked_internships'
import { useIsMobile } from 'utils/hooks'
import RepMobile from './mobile_view'
import ProfilePicture from 'app/layouts/components/profile_picture'

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
        <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
          {name?.value}
        </Text>
        <Box mb="1rem">
          {assocHC ? <Text>{`${jobTitle}, ${assocHC}`}</Text> : <Text>{`${jobTitle}`}</Text>}
        </Box>
        <Flex justifyContent="center" mb="1rem">
          {actions && (
            <HStack>
              {map(action => (
                <Action
                  parentCode={sbeCode}
                  code={action}
                  targetCode={beCode}
                  key={action}
                  size="md"
                  colorScheme="blue"
                />
              ))(actions)}
            </HStack>
          )}
        </Flex>
        <HStack w="65vw" align="start" pt="5" spacing="5">
          <VStack align="start" w="50%">
            <HStack spacing="10" align="start" mb="1rem">
              <FontAwesomeIcon icon={faUser} />
              <VStack align="start">
                <Text fontWeight="semibold">{`Contact details`}</Text>
                <Attribute code={beCode} attribute={'PRI_MOBILE'} />
                <Attribute code={beCode} attribute={'PRI_EMAIL'} />
                <Attribute code={beCode} attribute={'PRI_LINKEDIN_URL'} />
              </VStack>
            </HStack>
            <HStack spacing="10" align="start" mb="1rem">
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
              <VStack align="start">
                <Text fontWeight="semibold">{`About Myself`}</Text>
                <Attribute code={beCode} attribute={'PRI_BIO'} />
                <HStack>
                  <Text w="8rem" fontWeight="semibold">
                    Department
                  </Text>
                  <Attribute code={beCode} attribute={'PRI_DEPARTMENT'} />
                </HStack>
              </VStack>
            </HStack>
          </VStack>
          {includes('SBE_HOST_CPY_REP_', sbeCode) && (
            <LinkedInternships
              sbeCode={replace(
                'SBE_HOST_CPY_REP_',
                'SBE_LINKED_INTERNSHIP_OF_SUPERVISOR_',
                sbeCode,
              )}
            />
          )}
        </HStack>
      </VStack>
    </Box>
  )
}

export default Rep
