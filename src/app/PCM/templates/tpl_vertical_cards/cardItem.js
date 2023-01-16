import { AspectRatio, Box, HStack, Text } from '@chakra-ui/react'
import { filter, includes, map } from 'ramda'

import AmenityField from 'app/PCM/templates/tpl-detail-view/tpl-property-detail-view/amenity-field.js'
import Attribute from 'app/BE/attribute'
import { selectCode } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'

const CardItem = ({ mappedValues, baseEntityCode, actions, sbeCode, primaryColor }) => {
  const isMobile = useIsMobile()
  const hasDisplayImage = includes('_LNK_PROPERTY__PRI_IMAGES')(mappedValues)
  const attrName = useSelector(selectCode(baseEntityCode, 'PRI_CREATED'))?.attributeName || ''

  const suburb =
    useSelector(selectCode(baseEntityCode, '_LNK_PROPERTY__PRI_ADDRESS_SUBURB'))?.value || ''
  const state =
    useSelector(selectCode(baseEntityCode, '_LNK_PROPERTY__PRI_ADDRESS_STATE'))?.value || ''

  const location = !!suburb && !!state ? `${suburb}, ${state}` : suburb || state

  const amenities = filter(includes('PRI_NUMBER_OF_'))(mappedValues) || []

  return (
    <Box
      paddingBlock={3}
      paddingInlineStart={isMobile || !!hasDisplayImage ? 3 : '21.5rem'}
      paddingInlineEnd={3}
      bg={'white'}
      border={`1px solid`}
      borderRadius="3xl"
      borderColor={primaryColor}
      fontWeight="400"
      color={primaryColor}
      position={'relative'}
      cursor={'pointer'}
    >
      {!!hasDisplayImage && (
        <AspectRatio
          ratio={16 / 9}
          bg={'gray.100'}
          position={isMobile ? 'static' : 'absolute'}
          top={3}
          left={3}
          h={isMobile ? '10rem' : 'calc(100% - 1.5rem)'}
          w={isMobile ? 'full' : '20rem'}
          borderRadius={'xl'}
        >
          <Attribute
            code={baseEntityCode}
            attribute={'_LNK_PROPERTY__PRI_IMAGES'}
            config={{ carddisplay: 'true', showsingleimgonly: 'true' }}
          />
        </AspectRatio>
      )}

      <HStack
        position={isMobile ? 'static' : 'absolute'}
        top={3}
        right={3}
        fontSize={'sm'}
        paddingBlockEnd={1}
        borderBottom={`1px solid `}
        borderBottomColor={primaryColor}
        w={'fit-content'}
        marginBlock={isMobile ? 3 : 0}
      >
        <Text>{attrName}</Text>
        <Attribute code={baseEntityCode} attribute={'PRI_CREATED'} />
      </HStack>

      <Attribute
        code={baseEntityCode}
        attribute={'_LNK_PROPERTY__PRI_NAME'}
        config={{
          carddisplay: 'true',
          fontSize: 'xl',
          mt: 3,
          _empty: {
            display: 'none',
          },
        }}
      />

      <Text>{location}</Text>

      <HStack mt={5}>
        {map(itemCode => (
          <AmenityField key={itemCode} code={baseEntityCode} attributeCode={itemCode} />
        ))(amenities)}
      </HStack>

      <Attribute
        code={baseEntityCode}
        attribute={'_LNK_PROPERTY__PRI_DESCRIPTION'}
        config={{
          carddisplay: 'true',
          mt: 5,
          noOfLines: 3,
          alignSelf: 'flex-start',
          _empty: {
            display: 'none',
          },
        }}
      />
    </Box>
  )
}

export default CardItem
