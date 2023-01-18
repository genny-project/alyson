import { Box, Grid, HStack, VStack, theme } from '@chakra-ui/react'
import { filter, includes, map } from 'ramda'
import { getColumnDefs, getFields } from '../../helpers/sbe-utils'
import { selectCode, selectKeys } from 'redux/db/selectors'

import Attribute from 'app/BE/attribute'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Title from 'app/SBE/table/Title'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { useGetActionsFromCode } from 'app/SBE/utils/get-actions'
import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
import useProductColors from 'utils/productColors'
import { useSelector } from 'react-redux'

const TemplateHorizontalCards = ({ mappedPcm, depth }) => {
  const sbeCodePrefix = mappedPcm?.PRI_LOC1 || ''
  const keys = useSelector(selectKeys)
  const sbeCode = (filter(key => includes(sbeCodePrefix)(key) && !includes('@')(key))(keys) || [
    '',
  ])[0]
  const actions = useGetActionsFromCode(sbeCode) || []
  const actionCodes = map(act => act?.attributeCode || '')(actions)
  const mappedSbe = useGetMappedBaseEntity(sbeCode)
  const mappedValues = getFields(getColumnDefs(mappedSbe))

  const rows = useSelector(selectCode(sbeCode, 'rows')) || []
  const { buttonBackgroundColor } = useProductColors()

  return (
    <Box padding={'10px'}>
      <Box paddingBottom={3}>
        <Title sbeCode={sbeCode} />
      </Box>
      <Grid templateColumns={'repeat(auto-fill, minmax(min(100%, 16.5rem), 1fr))'} gap={8}>
        {rows.map(item => (
          <Card
            actions={actionCodes}
            key={`CARD-${item || ''}`}
            mappedValues={mappedValues}
            baseEntityCode={item}
            primaryColor={buttonBackgroundColor}
            sbeCode={sbeCode}
          />
        ))}
      </Grid>
    </Box>
  )
}

//Image is hardcoded for the demo, need to remove it after the demo.

const Card = ({ mappedValues, baseEntityCode, actions, sbeCode, primaryColor }) => {
  return (
    <Box
      p={3}
      bg={'white'}
      border={`1px solid`}
      borderRadius="3xl"
      borderColor={primaryColor}
      cursor={'pointer'}
      transition={'all 0.25s ease-in-out'}
      role="group"
      _hover={{
        background: 'product.gradient100',
      }}
    >
      <VStack spacing={2}>
        {mappedValues.map((value, index) => {
          const fontSize = index === 0 ? 'xl' : 'md'

          return (
            <HStack
              justify={'space-between'}
              fontSize={fontSize}
              key={`CARD-ATTRIBUTE-${baseEntityCode}-${value}`}
              alignSelf="start"
              color="product.primary"
              fontWeight="400"
              w={'full'}
              position={'relative'}
              _groupHover={{
                color: 'white',
              }}
            >
              <Box
                w={'min(100%, 40rem)'}
                h={'auto'}
                borderRadius={0}
                borderTopLeftRadius={'xl'}
                borderTopRightRadius={'xl'}
                overflow={'hidden'}
              >
                <Attribute
                  code={baseEntityCode}
                  attribute={value}
                  config={{ carddisplay: 'true', showSingleImgOnly: 'true' }}
                />
              </Box>

              {index === 0 && (
                <Box position={'absolute'} top={2} right={2} zIndex={theme.zIndices.modal}>
                  <ContextMenu
                    actions={actions}
                    code={baseEntityCode}
                    parentCode={sbeCode}
                    button={
                      <Box
                        align="start"
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="6px"
                        px="2"
                        bg="white"
                        color={'#004654 !important'}
                      >
                        <FontAwesomeIcon icon={faEllipsisV} size="xs" />
                      </Box>
                    }
                  />
                </Box>
              )}
            </HStack>
          )
        })}
      </VStack>
    </Box>
  )
}

export default TemplateHorizontalCards
