import { Box, HStack, VStack } from '@chakra-ui/react'
import { equals, map } from 'ramda'

import Attribute from 'app/BE/attribute'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const CardItem = ({ mappedValues, baseEntityCode, actions, sbeCode, primaryColor }) => {
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
        {map((value, index) => {
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
              <Attribute
                code={baseEntityCode}
                attribute={value}
                config={
                  equals(value)('PRI_IMAGE_URL')
                    ? {
                        carddisplay: 'true',
                        w: 'min(100%, 20rem)',
                        h: 'auto',
                        borderRadius: 0,
                        borderTopLeftRadius: 'xl',
                        borderTopRightRadius: 'xl',
                        overflow: 'hidden',
                      }
                    : { carddisplay: 'true' }
                }
              />

              {index === 0 && (
                <Box position={'absolute'} top={2} right={2}>
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
        })(mappedValues)}
      </VStack>
    </Box>
  )
}

export default CardItem
