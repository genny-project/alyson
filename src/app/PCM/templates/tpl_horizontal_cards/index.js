import { Box, Grid, HStack, VStack } from '@chakra-ui/react'
import { filter, includes, map } from 'ramda'
import { getColumnDefs, getFields } from '../../helpers/sbe-utils'
import { selectCode, selectKeys } from 'redux/db/selectors'

import Attribute from 'app/BE/attribute'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
import { useSelector } from 'react-redux'
import Title from 'app/SBE/table/Title'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { useGetActionsFromCode } from 'app/SBE/utils/get-actions'

const TemplateHorizontalCards = ({ mappedPcm, depth }) => {
  const sbeCodePrefix = mappedPcm.PRI_LOC1
  const keys = useSelector(selectKeys)
  const sbeCode = (filter(key => includes(sbeCodePrefix)(key) && !includes('@')(key))(keys) || [
    '',
  ])[0]
  const actions = useGetActionsFromCode(sbeCode)
  const actionCodes = map(act => act?.attributeCode || '')(actions)
  const mappedSbe = useGetMappedBaseEntity(sbeCode)
  const mappedValues = getFields(getColumnDefs(mappedSbe))

  const rows = useSelector(selectCode(sbeCode, 'rows')) || []

  const primaryColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.valueString || ''
  return (
    <Box padding={'10px'}>
      <Box paddingBottom={3}>
        <Title sbeCode={sbeCode} />
      </Box>
      <Grid templateColumns={'repeat(auto-fit, minmax(12.5rem, 1fr))'} gap={4}>
        {rows.map(item => (
          <Card
            actions={actionCodes}
            key={`CARD-${item || ''}`}
            mappedValues={mappedValues}
            baseEntityCode={item}
            primaryColor={primaryColor}
            sbeCode={sbeCode}
          />
        ))}
      </Grid>
    </Box>
  )
}

//Image is hardcoded for the demo, need to remove it after the demo.

const Card = ({ mappedValues, baseEntityCode, primaryColor, actions, sbeCode }) => {
  return (
    <Box border={`1px solid`} borderRadius="3xl" borderColor={primaryColor} p="5">
      <VStack>
        {mappedValues.map((value, index) => {
          const fontSize = index === 0 ? 'xl' : 'md'
          return (
            <HStack
              justify={'space-between'}
              fontSize={fontSize}
              key={`CARD-ATTRIBUTE-${baseEntityCode}-${value}`}
              alignSelf="start"
              color="#004654"
              fontWeight="400"
              w={'full'}
            >
              <Attribute code={baseEntityCode} attribute={value} config={{ carddisplay: 'true' }} />
              {index === 0 && (
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
                    >
                      <FontAwesomeIcon icon={faEllipsisV} size="xs" />
                    </Box>
                  }
                />
              )}
            </HStack>
          )
        })}
      </VStack>
    </Box>
  )
}

export default TemplateHorizontalCards
