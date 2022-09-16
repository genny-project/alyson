import { AspectRatio, Avatar, Box, Button, Grid, Stack, Text, useTheme } from '@chakra-ui/react'
import { faCheckCircle, faHourglass } from '@fortawesome/free-solid-svg-icons'
import { filter, map, slice } from 'ramda'
import { getColumnDefs, getFields } from '../../../helpers/sbe-utils'

import AcceptedRejectedLists from './acceptedRejectedLists'
import DetailField from '../detail-field'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TenantInformation from './tenantInformation'
import UploadedDocuments from './uploadedDocuments'
import { selectCode } from 'redux/db/selectors'
import { useGetActionsFromCode } from 'app/SBE/utils/get-actions'
import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'

const TemplateApplicationDetailView = ({ mappedPcm, depth }) => {
  const userCode = useSelector(selectCode('USER'))
  const userFirstName = useSelector(selectCode(userCode, 'PRI_FIRSTNAME'))?.value
  const theme = useTheme()
  const isMobile = useIsMobile()

  const sbeCode = mappedPcm.PRI_LOC1

  const mappedSbe = useGetMappedBaseEntity(sbeCode)
  const baseEntityCode = mappedSbe.PRI_CODE?.value || ''
  const mappedValues = getFields(getColumnDefs(mappedSbe))

  const actions = filter(e => e)(
    map(act => act?.attributeCode)(useGetActionsFromCode(sbeCode) || []),
  )

  const tenantName = mappedValues[0]
  const tenantDetails = slice(1, mappedValues.length - 1)(mappedValues)

  const tenantNameValue = useSelector(selectCode(baseEntityCode, tenantName))?.value

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
          <Avatar name={tenantNameValue} src="" />
        </AspectRatio>

        <Grid
          templateColumns={isMobile ? '1fr' : '1fr 2fr'}
          paddingBlockStart={isMobile ? '0' : '2rem'}
        >
          <Box>
            <DetailField
              sbeCode={sbeCode}
              code={baseEntityCode}
              attributeCode={tenantName}
              index={0}
            />
          </Box>

          <Grid gap={isMobile ? '0' : '1rem'} placeContent={'start'} color="product.primary">
            {tenantDetails.map((attributeCode, index) => {
              return (
                <DetailField
                  key={`${attributeCode}-${index}`}
                  sbeCode={sbeCode}
                  code={baseEntityCode}
                  attributeCode={attributeCode}
                  index={index}
                  actions={actions}
                />
              )
            })}
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

      <UploadedDocuments />

      <Grid
        templateColumns={isMobile ? '1fr' : '1fr 1fr'}
        gap={'1rem'}
        marginBlockStart={'clamp(1rem, 3vw, 3.75rem)'}
      >
        <Box>
          <TenantInformation />
        </Box>

        <Box>
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
