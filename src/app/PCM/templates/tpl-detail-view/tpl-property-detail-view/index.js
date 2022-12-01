import { filter, find, equals, includes, compose, not, isEmpty } from 'ramda'
import Attribute from 'app/BE/attribute'
import { VStack, Wrap, WrapItem, Text, HStack, Box } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import AmenityField from './amenity-field'
import useGetDetailData from '../get-detail-data'
import Button from 'app/DTT/event_button'
import MapSearch from 'app/layouts/map_view'

const TemplatePropertyDetailView = ({ mappedPcm }) => {
  const { baseEntityCode, fields } = useGetDetailData(mappedPcm)
  const { PRI_QUESTION_CODE: questionCode } = mappedPcm
  const applyButtonData = useSelector(selectCode(questionCode, 'QUE_APPLY')) || {}
  const { sourceCode } = applyButtonData || {}

  let showApllyButton =
    equals(typeof applyButtonData, 'object') && compose(not, isEmpty)(applyButtonData)

  const findCode = code => find(equals(code))(fields) || ''

  const textColor = 'product.primary'
  const buttonColor = 'product.secondary'

  const headingCode = findCode('PRI_NAME')
  const suburbCode = findCode('PRI_ADDRESS_SUBURB')
  const stateCode = findCode('PRI_ADDRESS_STATE')

  const suburb = useSelector(selectCode(baseEntityCode, suburbCode))?.valueString || ''
  const state = useSelector(selectCode(baseEntityCode, stateCode))?.valueString || ''

  const amentities = filter(includes('PRI_NUMBER_OF_'))(fields) || []

  const rooms = filter(includes('ROOM'))(fields) || []

  const descriptionCode = findCode('PRI_PROPERTY_DESCRIPTION')

  const rentAmountCode = findCode('PRI_RENTAL_AMOUNT')
  const rentAmount = useSelector(selectCode(baseEntityCode, rentAmountCode))?.value || ''

  const rentFreqCode = findCode('_LNK_RENTAL_FREQUENCY__PRI_NAME')
  const rentFreq = useSelector(selectCode(baseEntityCode, rentFreqCode))?.value || ''

  const imageCode = findCode('PRI_IMAGE_URL')

  //Get suburb, state if both not null, otherwise just the one that isn't null
  const location = !!suburb && !!state ? `${suburb}, ${state}` : suburb || state

  const buttonConfig = {
    variant: 'solid',
    bg: buttonColor,
    color: '#ffffff',
    borderRadius: '3xl',
    w: 'full',
  }

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
            {location}
          </Text>
          <Wrap>
            {rooms.map((room, index) => (
              <WrapItem key={`${baseEntityCode}-${index}-room-wrapitem`}>
                <AmenityField
                  key={`${baseEntityCode}-${index}-room`}
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
              <WrapItem key={`${baseEntityCode}-${index}-amentity-wrapitem`}>
                <AmenityField
                  key={`${baseEntityCode}-${index}-amenity`}
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
              <MapSearch />
            </VStack>
          </Box>
          {showApllyButton && (
            <Button
              askData={applyButtonData}
              parentCode={questionCode}
              sourceCode={sourceCode}
              config={buttonConfig}
            />
          )}
        </VStack>
      </HStack>
    </VStack>
  )
}

export default TemplatePropertyDetailView
