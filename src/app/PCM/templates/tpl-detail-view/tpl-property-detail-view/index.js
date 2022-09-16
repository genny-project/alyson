import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
import { getFields, getColumnDefs } from 'app/PCM/helpers/sbe-utils'
import { useGetActionsFromCode } from 'app/SBE/utils/get-actions'
import { filter, find, map, equals, includes } from 'ramda'
import Attribute from 'app/BE/attribute'
import { VStack, Wrap, WrapItem, Text, HStack, Box } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import AmenityField from './amenity-field'
import PropAction from './prop-action'

const TemplatePropertyDetailView = ({ mappedPcm }) => {
  const sbeCode = mappedPcm.PRI_LOC1

  const mappedSbe = useGetMappedBaseEntity(sbeCode)
  const baseEntityCode = mappedSbe.PRI_CODE?.value || ''
  const mappedValues = getFields(getColumnDefs(mappedSbe))

  const actions = filter(e => e)(
    map(act => act?.attributeCode)(useGetActionsFromCode(sbeCode) || []),
  )

  const findCode = code => find(equals(code))(mappedValues) || ''

  const textColor = 'product.primary'

  const headingCode = findCode('PRI_PROPERTY_HEADING')
  const suburbCode = findCode('PRI_ADDRESS_SUBURB')
  const stateCode = findCode('PRI_ADDRESS_STATE')

  const suburb = useSelector(selectCode(baseEntityCode, suburbCode))?.valueString || ''
  const state = useSelector(selectCode(baseEntityCode, stateCode))?.valueString || ''

  const amentities = filter(includes('PRI_NUMBER_OF_'))(mappedValues) || []

  const rooms = filter(includes('ROOM'))(mappedValues) || []

  const descriptionCode = findCode('PRI_PROPERTY_DESCRIPTION')

  const rentAmountCode = findCode('PRI_RENTAL_AMOUNT')
  const rentAmount = useSelector(selectCode(baseEntityCode, rentAmountCode))?.value || ''

  const rentFreqCode = findCode('_LNK_RENTAL_FREQUENCY__PRI_NAME')
  const rentFreq = useSelector(selectCode(baseEntityCode, rentFreqCode))?.value || ''

  const imageCode = findCode('PRI_IMAGE_URL')

  return (
    <VStack w={'100%'} alignItems="flex-start">
      <Attribute code={baseEntityCode} attribute={imageCode} />
      <HStack justify="space-between" w={'100%'}>
        <VStack alignItems="flex-start" maxWidth={'50%'}>
          <Attribute
            code={baseEntityCode}
            attribute={headingCode}
            config={{ fontSize: '4xl', color: textColor }}
          />
          <Text color={textColor} fontSize="2xl">
            {suburb}, {state}
          </Text>
          <Wrap>
            {rooms.map((room, index) => (
              <WrapItem key={`${sbeCode}-${baseEntityCode}-${index}-room-wrapitem`}>
                <AmenityField
                  key={`${sbeCode}-${baseEntityCode}-${index}-room`}
                  code={baseEntityCode}
                  attributeCode={room}
                />
              </WrapItem>
            ))}
          </Wrap>

          <Text color={textColor} fontSize="2xl" paddingTop={8}>
            About this home
          </Text>
          <Attribute code={baseEntityCode} attribute={descriptionCode} />
          <Text color={textColor} fontSize="1xl" paddingTop={8}>
            Amenities
          </Text>
          <Wrap>
            {amentities.map((item, index) => (
              <WrapItem key={`${sbeCode}-${baseEntityCode}-${index}-amentity-wrapitem`}>
                <AmenityField
                  key={`${sbeCode}-${baseEntityCode}-${index}-amenity`}
                  code={baseEntityCode}
                  attributeCode={item}
                />
              </WrapItem>
            ))}
          </Wrap>
        </VStack>
        <VStack w={'400px'}>
          <Box border={'1px'} borderColor="lightgray" borderRadius="3xl" width={'100%'} padding={2}>
            <VStack>
              <Box
                borderRadius="3xl"
                backgroundColor={'product.secondaryLight'}
                p={1}
                paddingX={3}
                width={'100%'}
                textAlign="center"
              >
                Available From
              </Box>
              <HStack paddingTop={'4pt'}>
                <Box
                  borderRadius={'3xl'}
                  backgroundColor={'product.secondary'}
                  textColor={'white'}
                  p={1}
                  paddingX={3}
                >
                  ${rentAmount}/{rentFreq}
                </Box>
              </HStack>
              <Box height={'200pt'}></Box>
            </VStack>
          </Box>
          <VStack width="70%">
            {actions.map(action => (
              <PropAction
                key={action}
                parentCode={sbeCode}
                code={action}
                targetCode={baseEntityCode}
              />
            ))}
          </VStack>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default TemplatePropertyDetailView
