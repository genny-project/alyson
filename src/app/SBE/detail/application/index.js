import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Box, Divider, HStack, Link, Text, VStack } from '@chakra-ui/react'
import useApi from 'api'

import getActions from 'app/SBE/utils/get-actions'
import Attribute from 'app/BE/attribute'
import Software from '../internship/templates/Software'
import { topHeight } from 'app/SBE/detail/helpers/set-top-height'
import DetailHeader from 'app/layouts/components/header'
import ProfilePicture from 'app/layouts/components/profile_picture'
import Actions from 'app/layouts/components/actions'

const Application = ({ sbeCode, targetCode }) => {
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
        <Link href={url?.value}>
          <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
            {name?.value}
          </Text>
        </Link>
        <Attribute code={beCode} attribute={'PRI_ASSOC_INDUSTRY'} />
        <Attribute code={beCode} attribute={'PRI_STATUS'} />
        <Actions actions={actions} sbeCode={sbeCode} beCode={beCode} />

        <HStack align="start" pt="1rem">
          <VStack align="start">
            <Text textStyle="body1">Internship Supervisor</Text>
            <Attribute code={beCode} attribute={'PRI_SUPER_NAME'} />
            <Attribute code={beCode} attribute={'PRI_SUPER_JOB_TITLE'} />
            <Attribute code={beCode} attribute={'PRI_SUPER_EMAIL'} />
            <Attribute code={beCode} attribute={'PRI_SUPER_MOBILE'} />
          </VStack>
          <VStack align="start">
            <HStack>
              <Text>Internship Hosted By</Text>
              <Attribute config={{ textStyle: 'body1' }} code={beCode} attribute={'PRI_ASSOC_HC'} />
            </HStack>
            <HStack>
              <Text>Intern Applying</Text>
              <Attribute
                config={{ textStyle: 'body1' }}
                code={beCode}
                attribute={'PRI_INTERN_NAME'}
              />
            </HStack>
            <HStack>
              <Text>Start Date</Text>
              <Attribute
                config={{ textStyle: 'body1' }}
                code={beCode}
                attribute={'PRI_START_DATE'}
              />
            </HStack>
            <HStack>
              <Text>Days</Text>
              <Attribute
                config={{ textStyle: 'body1' }}
                code={beCode}
                attribute={'PRI_WHICH_DAYS_STRIPPED'}
              />
            </HStack>
            <HStack>
              <Text>Software to be Used</Text>
              <Software value={software?.value || ''} />
            </HStack>
          </VStack>
        </HStack>
        <Divider w="90%" pt="5" />
        <VStack w="full" align="start" p="5" pl="10">
          <VStack align="start">
            <Text textStyle="body1">Roles and Responsibilities</Text>
            <Box p="5">
              <Attribute code={beCode} attribute={'PRI_ROLES_AND_RESPONSIBILITIES'} />
            </Box>
          </VStack>
          <VStack align="start">
            <Text textStyle="body1">Base Learning Outcomes</Text>
            <Box p="5">
              <Attribute code={beCode} attribute={'PRI_BASE_LEARNING_OUTCOMES'} />
            </Box>
          </VStack>
          <VStack align="start">
            <Text textStyle="body1">Specific Learning Outcomes</Text>
            <Box p="5">
              <Attribute code={beCode} attribute={'PRI_SPECIFIC_LEARNING_OUTCOMES'} />
            </Box>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default Application
