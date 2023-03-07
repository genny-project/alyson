import { Box, HStack, Text } from '@chakra-ui/react'
import { compose, equals, filter, includes, isEmpty, map, not } from 'ramda'
import { selectCode, selectCodeUnary } from 'redux/db/selectors'

import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import Attribute from 'app/BE/attribute'
import FavouriteComponent from 'app/PCM/templates/template-components/favourite-component/index.js'
import AmenityField from 'app/PCM/templates/tpl-detail-view/tpl-property-detail-view/amenity-field.js'
import { useSelector } from 'react-redux'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { useIsMobile } from 'utils/hooks'

const CardItem = ({ mappedValues, baseEntityCode, primaryColor, sbeCode }) => {
  const isMobile = useIsMobile()
  const userCode = useSelector(selectCode('USER'))
  const userType = useSelector(selectCode(userCode, 'LNK_ROLE'))?.value || ''
  const isAgentOrAdmin = includes('ADMIN', userType) || includes('AGENT', userType)

  const userFavouritesAttribute =
    compose(useSelector, selectCodeUnary(userCode))('LNK_FAV_PROPS') || {}
  const userFavourites = safelyParseJson(userFavouritesAttribute?.value, [])
  const isStarred = includes(baseEntityCode)(userFavourites)

  const isTableProperties = equals(sbeCode, 'SBE_TABLE_PROPERTIES')

  const attrName = useSelector(selectCode(baseEntityCode, 'PRI_CREATED_DATE'))?.attributeName || ''

  const suburb =
    useSelector(
      selectCode(
        baseEntityCode,
        isTableProperties ? 'PRI_ADDRESS_SUBURB' : '_LNK_PROPERTY__PRI_ADDRESS_SUBURB',
      ),
    )?.value || ''

  const state =
    useSelector(
      selectCode(
        baseEntityCode,
        isTableProperties ? 'PRI_ADDRESS_STATE' : '_LNK_PROPERTY__PRI_ADDRESS_STATE',
      ),
    )?.value || ''

  const propertyName =
    useSelector(
      selectCode(baseEntityCode, isTableProperties ? 'PRI_NAME' : '_LNK_PROPERTY__PRI_NAME'),
    )?.value || ''

  const location = !!suburb && !!state ? `${suburb}, ${state}` : suburb || state || ''

  const amenities = filter(includes('PRI_NUMBER_OF_'))(mappedValues) || []
  const displayImages = useSelector(selectCode(baseEntityCode, 'PRI_IMAGES'))?.value || []
  const hasDisplayImage = not(isEmpty(displayImages))

  const rentalAmt = useSelector(selectCode(baseEntityCode, 'PRI_RENTAL_AMOUNT'))?.value || ''
  const rentalFreq =
    useSelector(selectCode(baseEntityCode, '_LNK_RENTAL_FREQUENCY__PRI_NAME'))?.value || ''

  const createdDate = useSelector(selectCode(baseEntityCode, 'PRI_CREATED_DATE'))?.valueDate || ''

  const handleDetailView = () => {
    sendEvtClick({
      parentCode: sbeCode,
      code: 'ACT_VIEW',
      targetCode: baseEntityCode,
    })
  }

  return (
    <>
      <Box
        paddingBlock={3}
        paddingInlineStart={isMobile || !hasDisplayImage ? 3 : '21.5rem'}
        paddingInlineEnd={3}
        bg={'white'}
        border={`1px solid`}
        borderRadius="3xl"
        borderColor={primaryColor}
        fontWeight="400"
        color={primaryColor}
        position={'relative'}
        cursor={'pointer'}
        minH={!isMobile && !!hasDisplayImage ? '18.5rem' : 'inherit'}
      >
        {!!hasDisplayImage && (
          <Box
            bg={'gray.100'}
            position={isMobile ? 'static' : 'absolute'}
            top={3}
            left={3}
            h={isMobile ? 'auto' : 'calc(100% - 1.5rem)'}
            w={isMobile ? 'full' : '20rem'}
            borderRadius={'xl'}
            overflow={'hidden'}
            maxH={'18.5rem'}
            onClick={handleDetailView}
          >
            <Attribute
              code={baseEntityCode}
              attribute={'PRI_IMAGES'}
              config={{ carddisplay: 'true', showSingleImgOnly: 'true' }}
            />
          </Box>
        )}

        {!!createdDate && !isAgentOrAdmin ? (
          <HStack
            position={isMobile ? 'static' : 'absolute'}
            top={8}
            right={3}
            fontSize={'sm'}
            paddingBlockEnd={1}
            borderBottom={`1px solid `}
            borderBottomColor={primaryColor}
            w={'fit-content'}
            marginBlock={isMobile ? 3 : 0}
          >
            <Text>{attrName}</Text>
            <Attribute code={baseEntityCode} attribute={'PRI_CREATED_DATE'} />
          </HStack>
        ) : (
          <HStack
            position={isMobile ? 'static' : 'absolute'}
            top={8}
            right={3}
            fontSize={'sm'}
            borderBottom={`1px solid `}
            borderBottomColor={primaryColor}
            w={'fit-content'}
            marginBlock={isMobile ? 3 : 0}
          >
            <FavouriteComponent
              starred={isStarred}
              sourceCode={userCode}
              targetCode={baseEntityCode}
              showLabel={true}
            />
          </HStack>
        )}

        <Box mt={isMobile ? 3 : 16} onClick={handleDetailView}>
          <Text fontSize={'1.13rem'} fontWeight={'700'} mb={'.75rem'}>
            {propertyName}
          </Text>

          <Text
            onClick={handleDetailView}
            _empty={{
              display: 'none',
            }}
          >
            {location}
          </Text>

          <HStack mt={5}>
            {map(itemCode => (
              <AmenityField key={itemCode} code={baseEntityCode} attributeCode={itemCode} />
            ))(amenities)}
          </HStack>

          {isTableProperties ? (
            <Attribute
              code={baseEntityCode}
              attribute={'PRI_DESCRIPTION'}
              config={{
                carddisplay: 'true',
                fontWeight: 400,
                noOfLines: 3,
                marginBlock: 5,
                fontSize: 'sm',
                alignSelf: 'flex-start',
                pointerEvents: 'none',
                _empty: {
                  display: 'none',
                },
              }}
            />
          ) : (
            <Attribute
              code={baseEntityCode}
              attribute={'_LNK_PROPERTY__PRI_DESCRIPTION'}
              config={{
                carddisplay: 'true',
                marginBlock: 5,
                noOfLines: 3,
                alignSelf: 'flex-start',
                pointerEvents: 'none',
                _empty: {
                  display: 'none',
                },
              }}
            />
          )}

          {!!rentalAmt && (
            <Text
              as="span"
              paddingBlock={'.75rem'}
              paddingInline={'2rem'}
              bg={'#E6F3F4'}
              borderRadius={'full'}
              display={'inline-flex'}
              fontSize={'sm'}
            >
              {`$${rentalAmt} / ${rentalFreq}`}
            </Text>
          )}
        </Box>
      </Box>
    </>
  )
}

export default CardItem
