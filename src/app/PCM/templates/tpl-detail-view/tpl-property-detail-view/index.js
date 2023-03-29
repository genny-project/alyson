import { Box, Divider, Grid, HStack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { compose, equals, filter, find, includes, isEmpty, not } from 'ramda'
import { selectCode, selectCodeUnary } from 'redux/db/selectors'

import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Attribute from 'app/BE/attribute'
import Button from 'app/DTT/event_button'
import MapView from 'app/layouts/map_view'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { doubleBang, isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'
import { isObject } from 'utils/helpers/is-type'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { useIsMobile } from 'utils/hooks'
import FavouriteComponent from '../../template-components/favourite-component'
import useGetDetailData from '../get-detail-data'
import AmenityField from './amenity-field'

const TemplatePropertyDetailView = ({ mappedPcm }) => {
  const { baseEntityCode, fields } = useGetDetailData(mappedPcm)
  const { PRI_QUESTION_CODE: questionCode } = mappedPcm

  const userCode = compose(useSelector, selectCode)('USER')

  const userFavouritesAttribute =
    compose(useSelector, selectCodeUnary(userCode))('LNK_FAV_PROPS') || {}
  const userFavourites = safelyParseJson(userFavouritesAttribute?.value, [])
  const isStarred = includes(baseEntityCode)(userFavourites)

  const applyButtonData = compose(useSelector, selectCodeUnary(questionCode))('QUE_APPLY') || {}
  const { sourceCode } = applyButtonData || {}
  const longitudeObject =
    compose(useSelector, selectCodeUnary(baseEntityCode))('PRI_ADDRESS_LONGITUDE') || {}
  const longitude = longitudeObject?.value || ''
  const latitudeObject =
    compose(useSelector, selectCodeUnary(baseEntityCode))('PRI_ADDRESS_LATITUDE') || {}
  const latitude = latitudeObject?.value || ''
  const coordinates = { latitude, longitude }

  const isMobile = useIsMobile()

  let showApplyButton = equals(isObject(applyButtonData)) && compose(not, isEmpty)(applyButtonData)

  const textColor = 'product.primary500'
  const buttonColor = 'product.secondary'

  const findCode = code => find(equals(code))(fields) || ''

  const headingCode = findCode('PRI_NAME')
  const suburbCode = findCode('PRI_ADDRESS_SUBURB')
  const stateCode = findCode('PRI_ADDRESS_STATE')

  const suburb =
    compose(useSelector, selectCodeUnary(baseEntityCode))(suburbCode)?.valueString || ''
  const state = compose(useSelector, selectCodeUnary(baseEntityCode))(stateCode)?.valueString || ''

  const amentities = filter(includes('PRI_NUMBER_OF_'))(fields) || []
  const addressFullJson =
    useSelector(selectCode(baseEntityCode, 'PRI_ADDRESS_FULL'))?.valueString || ''
  const addressFull = safelyParseJson(addressFullJson)
  const addressSuburb = addressFull?.suburb
  const addressState = addressFull?.state
  const streetAddress = addressFull?.streetAddress

  const rooms = filter(includes('ROOM'))(fields) || []

  const descriptionCode = findCode('PRI_DESCRIPTION') || findCode('PRI_PROPERTY_DESCRIPTION')
  const rentAmountCode = findCode('PRI_RENTAL_AMOUNT')
  const rentAmount =
    compose(useSelector, selectCodeUnary(baseEntityCode))(rentAmountCode)?.valueInteger || ''

  const rentFreqCode = findCode('_LNK_RENTAL_FREQUENCY__PRI_NAME')
  const rentFreq =
    compose(useSelector, selectCodeUnary(baseEntityCode))(rentFreqCode)?.value || 'week'

  const availableFromDate =
    useSelector(selectCode(baseEntityCode, 'PRI_AVAILABLE_DATE'))?.valueDate || ''

  const availableFromDateReadableFormat = isNotNullOrUndefinedOrEmpty(availableFromDate)
    ? format(new Date(availableFromDate), 'dd MMM yyyy')
    : ' '

  //PRI_IMAGES is now used for the multi image display
  const imageCode = findCode('PRI_IMAGES') || findCode('PRI_IMAGE_URL')

  //Get suburb, state if both not null, otherwise just the one that isn't null
  const getLocation = () => {
    let _suburb = suburb || addressSuburb
    let _state = state || addressState
    if (doubleBang(_suburb) && doubleBang(_state)) {
      return `${suburb}, ${state}`
    }
    if (doubleBang(_suburb) || doubleBang(_state)) {
      return _suburb || _state
    }
    if (doubleBang(streetAddress)) {
      return streetAddress
    }
  }

  const location = getLocation()

  const buttonConfig = {
    variant: 'solid',
    bg: buttonColor,
    color: '#ffffff',
    borderRadius: '3xl',
    w: isMobile ? 'full' : '15rem',
  }

  return (
    <Grid w={'100%'} alignItems="flex-start" spacing={0} gap={'clamp(1rem, 1vw + 1rem, 2.4rem)'}>
      <Attribute code={baseEntityCode} attribute={imageCode} />

      <Grid
        templateColumns={'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))'}
        gap={'clamp(1rem, 4.75vw + 0.75rem, 12.5rem)'}
        justify="space-between"
        w={'100%'}
      >
        <VStack alignItems="flex-start" spacing={0}>
          <HStack>
            <Attribute
              code={baseEntityCode}
              attribute={headingCode}
              config={{
                fontSize: '4xl',
                color: textColor,
                fontWeight: 'medium',
                textTransform: 'capitalize',
              }}
            />
            <FavouriteComponent
              starred={isStarred}
              sourceCode={userCode}
              targetCode={baseEntityCode}
            />
          </HStack>

          <Text color={textColor} fontSize={'2xl'} fontWeight={'normal'} paddingBlockStart={2}>
            {location}
          </Text>

          <Wrap paddingBlockStart={3}>
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

          <Text
            as="h2"
            color={textColor}
            fontSize="2xl"
            fontWeight={'medium'}
            paddingBlockStart={'clamp(4.25rem, 5vw, 1.5rem)'}
          >
            About this home
          </Text>

          <Attribute
            code={baseEntityCode}
            attribute={descriptionCode}
            config={{ wordBreak: 'break-all' }}
          />

          <Divider
            borderColor={'#FCE7E1'}
            paddingBlockStart={'clamp(2rem, 5vw, 4rem)'}
            w={'min(100%, 22rem)'}
          />

          <Text
            as="h3"
            color={textColor}
            fontSize="xl"
            paddingBlockStart={'clamp(1.5rem, 5vw, 4.25rem)'}
            paddingBlockEnd={'clamp(0.9rem, 2vw, 1.8rem)'}
          >
            Amenities
          </Text>

          <Wrap spacing={5}>
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
        <VStack w={'min(100%, 30rem)'} spacing={0}>
          <Box
            width={'100%'}
            padding={5}
            boxShadow={'0 0 2rem rgb(0 0 0 / .1)'}
            borderRadius={'2rem'}
            marginBlockEnd={'1.1rem'}
          >
            <Grid gap={'1.1rem'}>
              <HStack
                borderRadius="3xl"
                backgroundColor={'product.secondaryLight'}
                paddingY={3}
                paddingX={3}
                width={'100%'}
                textAlign="center"
                color={textColor}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <FontAwesomeIcon icon={faCalendarDay} />
                <Text as="p">{`Available From ${availableFromDateReadableFormat}`}</Text>
              </HStack>
              <HStack paddingTop={'4pt'}>
                <Box
                  borderRadius={'3xl'}
                  backgroundColor={'product.secondary'}
                  textColor={'white'}
                  p={1}
                  paddingX={7}
                >
                  ${rentAmount} / {rentFreq}
                </Box>

                <Box
                  borderRadius={'3xl'}
                  backgroundColor={'product.secondary'}
                  textColor={'white'}
                  p={1}
                  paddingX={7}
                  flex={1}
                  textAlign={'center'}
                >
                  {rentFreq === 'week'
                    ? `$${rentAmount * 52}`
                    : rentFreq === 'month'
                    ? `$${rentAmount * 12}`
                    : rentFreq === 'fortnight'
                    ? `$${rentAmount * 26}`
                    : `$${rentAmount}`}
                  / {'annum'}
                </Box>
              </HStack>
              <MapView coordinates={coordinates} />
            </Grid>
          </Box>
          {showApplyButton && (
            <Button
              askData={applyButtonData}
              parentCode={questionCode}
              sourceCode={sourceCode}
              config={buttonConfig}
            />
          )}
        </VStack>
      </Grid>
    </Grid>
  )
}

export default TemplatePropertyDetailView
