import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Stack,
  Text,
  useTheme,
} from '@chakra-ui/react'
import {
  faCheckCircle,
  faEnvelope,
  faGraduationCap,
  faHourglass,
  faMapMarkerAlt,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons'

import AcceptedRejectedLists from './acceptedRejectedLists'
import Attribute from 'app/BE/attribute'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TenantInformation from './tenantInformation'
import UploadedDocuments from './uploadedDocuments'
import { map } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'

const TemplateApplicationDetailView = ({ mappedPcm, depth }) => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  const userCode = useSelector(selectCode('USER'))
  const userFirstName = useSelector(selectCode(userCode, 'PRI_FIRSTNAME'))?.value

  const sbeCode = mappedPcm.PRI_LOC1
  const targetCode = useSelector(selectCode(sbeCode, 'PRI_TARGET_CODE'))?.value

  const tenantFullName = useSelector(selectCode(targetCode, 'PRI_NAME'))?.value

  const tenantImage = useSelector(selectCode(targetCode, 'PRI_IMAGE'))?.value
  const tenantJobRole = useSelector(selectCode(targetCode, 'PRI_ROLE_AT_COMPANY'))?.value
  const reasonToMove = useSelector(selectCode(targetCode, 'LNK_MOVE_REASON'))?.value

  const { getImageSrc } = useApi()

  const tenantInformation = [
    { icon: faPhoneAlt, attr: 'PRI_MOBILE' },
    { icon: faEnvelope, attr: 'PRI_EMAIL' },
    { icon: faMapMarkerAlt, attr: 'PRI_ADDRESS_COUNTRY' },
    { icon: faGraduationCap, attr: 'LNK_CAMPUS_SELECTION' },
  ]

  return (
    <>
      <Text fontSize="2.25rem" fontWeight={'400'}>{`Hi ${userFirstName}`}</Text>
      <Text marginBlock={5}>{'Please review these pending Pre-Approval Applications'}</Text>

      <Grid
        templateColumns={isMobile ? '1fr' : 'clamp(6rem, 10vw, 12rem) 1fr'}
        gap={'1.25rem'}
        borderRadius={40}
        padding={5}
        bg={'product.gray50'}
        position={'relative'}
        marginBlockStart={isMobile ? 12 : 0}
      >
        <AspectRatio w={'clamp(6rem, 10vw, 12rem)'} ratio={1}>
          <Avatar name={tenantFullName} src={getImageSrc(tenantImage)} />
        </AspectRatio>

        <Grid templateColumns={isMobile ? '1fr' : '1fr 2fr'}>
          <Grid gap={'0.5rem'} alignContent={'center'}>
            <Text as="h2" fontSize={'1.5rem'} fontWeight={'bold'}>
              {tenantFullName}
            </Text>
            <Text fontSize={'1.1rem'} fontWeight={'normal'}>
              {tenantJobRole}
            </Text>
            <Text opacity={0.5}>{reasonToMove}</Text>
          </Grid>

          <Grid gap={isMobile ? '0' : '0.75rem'} placeContent={'start'} color="product.primary">
            {map(({ icon, attr }, index) => (
              <Flex key={`${icon}-${index}`}>
                <Text as="p" marginInlineEnd={3}>
                  <FontAwesomeIcon icon={icon} />
                </Text>
                <Attribute code={targetCode} attribute={attr} />
              </Flex>
            ))(tenantInformation)}
          </Grid>
        </Grid>

        <Text
          paddingBlock={'clamp(0.5rem, 2vw, 1rem)'}
          paddingInline={'clamp(0.75rem, 5vw, 3.5rem)'}
          bg={'product.secondaryAccent'}
          borderRadius={20}
          position={'absolute'}
          top={'-1.8rem'}
          right={'3.75rem'}
          color={theme.colors.text.dark}
          boxShadow={'0.25rem 0.25rem 0.75rem rgb(0 0 0/.25)'}
        >
          <FontAwesomeIcon icon={faHourglass} />
          <Text as="span" marginInlineStart={4}>
            {'Pending Approval'}
          </Text>
        </Text>
      </Grid>

      <UploadedDocuments code={targetCode} />

      <Grid
        templateColumns={isMobile ? '1fr' : '1fr 1fr'}
        gap={'1rem'}
        marginBlockStart={'clamp(1rem, 3vw, 3.75rem)'}
      >
        <Box>
          <TenantInformation code={targetCode} />
        </Box>

        <Box display={'none'}>
          <AcceptedRejectedLists />
        </Box>
      </Grid>

      <Stack
        marginBlockStart={'clamp(1.25rem, 5vw, 4.38rem)'}
        alignItems={'flex-end'}
        justifyContent={'flex-end'}
      >
        <Button
          borderRadius={20}
          background={'product.secondary'}
          paddingBlock={'1.15rem'}
          paddingInline={'2rem'}
          height={'auto'}
          color={'product.white'}
          borderWidth="1px"
          borderStyle="solid"
          borderColor="product.secondary"
          _hover={{
            background: theme.colors.background.light,
            color: 'product.secondary',

            borderColor: 'product.secondary',
            variant: 'outline',
          }}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          <Text as="span" marginInlineStart={4}>
            Mark this as complete
          </Text>
        </Button>
      </Stack>
    </>
  )
}

export default TemplateApplicationDetailView
