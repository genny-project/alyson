import { Box, Grid, HStack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { compose, equals, filter, find, includes, isEmpty, not } from 'ramda'

import AmenityField from './amenity-field'
import Attribute from 'app/BE/attribute'
import Button from 'app/DTT/event_button'
import MapView from 'app/layouts/map_view'
import { selectCodeUnary } from 'redux/db/selectors'
import useGetDetailData from '../get-detail-data'
import { useSelector } from 'react-redux'

const TemplatePropertyDetailView = ({ mappedPcm }) => {
  const { baseEntityCode, fields } = useGetDetailData(mappedPcm)
  const { PRI_QUESTION_CODE: questionCode } = mappedPcm
  const applyButtonData = compose(useSelector, selectCodeUnary(questionCode))('QUE_APPLY') || {}
  const { sourceCode } = applyButtonData || {}
  const longitudeObject =
    compose(useSelector, selectCodeUnary(baseEntityCode))('PRI_ADDRESS_LONGITUDE') || {}

  const longitude = longitudeObject?.value || ''
  const latitudeObject =
    compose(useSelector, selectCodeUnary(baseEntityCode))('PRI_ADDRESS_LATITUDE') || {}
  const latitude = latitudeObject?.value || ''
  const coordinates = { latitude, longitude }

  let showApllyButton =
    equals(typeof applyButtonData, 'object') && compose(not, isEmpty)(applyButtonData)
  const findCode = code => find(equals(code))(fields) || ''
  const textColor = 'product.primary'
  const buttonColor = 'product.secondary'
  const headingCode = findCode('PRI_NAME')
  const suburbCode = findCode('PRI_ADDRESS_SUBURB')
  const stateCode = findCode('PRI_ADDRESS_STATE')

  const suburb =
    compose(useSelector, selectCodeUnary(baseEntityCode))(suburbCode)?.valueString || ''
  const state = compose(useSelector, selectCodeUnary(baseEntityCode))(stateCode)?.valueString || ''

  const amentities = filter(includes('PRI_NUMBER_OF_'))(fields) || []

  const rooms = filter(includes('ROOM'))(fields) || []

  const descriptionCode = findCode('PRI_DESCRIPTION') || findCode('PRI_PROPERTY_DESCRIPTION')
  const rentAmountCode = findCode('PRI_RENTAL_AMOUNT')
  const rentAmount =
    compose(useSelector, selectCodeUnary(baseEntityCode))(rentAmountCode)?.value || ''

  const rentFreqCode = findCode('_LNK_RENTAL_FREQUENCY__PRI_NAME')
  const rentFreq = compose(useSelector, selectCodeUnary(baseEntityCode))(rentFreqCode)?.value || ''

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
      <Grid
        templateColumns={'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))'}
        gap={'clamp(1rem, 5vw, 10rem)'}
        justify="space-between"
        w={'100%'}
      >
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
        <VStack w={'min(100%, 25rem)'} spacing={0}>
          <Box
            width={'100%'}
            padding={5}
            boxShadow={'0 0 2rem rgb(0 0 0 / .1)'}
            borderRadius={'2rem'}
            marginBlockEnd={'1.1rem'}
          >
            <Grid gap={'1.1rem'}>
              <Box
                borderRadius="3xl"
                backgroundColor={'product.secondaryLight'}
                paddingY={3}
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
              <MapView coordinates={coordinates} />
            </Grid>
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
      </Grid>
    </VStack>
  )
}

export default TemplatePropertyDetailView
