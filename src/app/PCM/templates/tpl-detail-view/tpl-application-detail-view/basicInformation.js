import { AspectRatio, Avatar, Flex, Grid, Text, useTheme } from '@chakra-ui/react'
import {
  faBriefcase,
  faEnvelope,
  faGraduationCap,
  faHourglass,
  faMapMarkerAlt,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons'

import Attribute from 'app/BE/attribute'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { map } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'

const BasicInformation = ({ code, isStudent }) => {
  const theme = useTheme()
  const isMobile = useIsMobile()
  const { getImageSrc } = useApi()

  const escapeChars = string => {
    return string.replace(/[[\]']+/g, '').replace(/"/g, '')
  }

  const tenantFullName = useSelector(selectCode(code, 'PRI_NAME'))?.value || ''
  const tenantImageCode = useSelector(selectCode(code, 'PRI_IMAGE'))?.value || ''
  const tenantImage = escapeChars(tenantImageCode)

  const tenantJobRole = useSelector(selectCode(code, 'PRI_ROLE_AT_COMPANY'))?.value || ''
  const reasonToMoveCode = useSelector(selectCode(code, 'LNK_MOVE_REASON'))?.value || ''
  // const reasonToMoveCodeFormatted = reasonToMoveCode.replace(/[[\]']+/g, '').replace(/"/g, '')
  const reasonToMoveCodeFormatted = escapeChars(reasonToMoveCode)

  const campusSelectionCode = useSelector(selectCode(code, 'LNK_CAMPUS_SELECTION'))?.value || ''
  // const campusSelectionCodeFormatted = campusSelectionCode.replace(/[[\]']+/g, '').replace(/"/g, '')
  const campusSelectionCodeFormatted = escapeChars(campusSelectionCode)

  const reasonToMove = useSelector(selectCode(reasonToMoveCodeFormatted, 'PRI_NAME'))?.value || ''

  const tenantInformation = [
    { icon: faPhoneAlt, attr: 'PRI_MOBILE' },
    { icon: faEnvelope, attr: 'PRI_EMAIL' },
    { icon: faMapMarkerAlt, attr: 'PRI_ADDRESS_COUNTRY' },
  ]

  return (
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
          {map(({ icon, attr }) => (
            <Flex key={attr}>
              <Text as="p" marginInlineEnd={3}>
                <FontAwesomeIcon icon={icon} />
              </Text>
              <Attribute code={code} attribute={attr} />
            </Flex>
          ))(tenantInformation)}

          <Flex>
            <Text as="p" marginInlineEnd={3}>
              <FontAwesomeIcon icon={isStudent ? faGraduationCap : faBriefcase} />
            </Text>
            <Attribute
              code={isStudent ? campusSelectionCodeFormatted : code}
              attribute={isStudent ? 'PRI_NAME' : 'PRI_COMPANY_NAME'}
            />
          </Flex>
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
  )
}

export default BasicInformation
