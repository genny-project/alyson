import { Box, HStack, Text } from '@chakra-ui/react'
import { iconColor, iconColorOnHighlight, selectedSidebarBoxColor } from 'utils/constants'

import { equals } from 'ramda'
import { useState } from 'react'
import { Iconly } from 'react-iconly'
import icons from 'utils/icons'

const InternmatchSideBarItem = ({
  trueQuestionCode,
  handleClick,
  name,
  hasChildIcons,
  currentSidebarItem,
  dispatchSetCurrentSidebarItem,
  dispatchSetCurrentWaitingForBackendResponse,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const imQuestionCode = trueQuestionCode + '_IM'
  const isSelected = equals(imQuestionCode)(currentSidebarItem)

  const onClick = questionCode => {
    dispatchSetCurrentSidebarItem(questionCode)
    dispatchSetCurrentWaitingForBackendResponse('true')
    handleClick()
  }

  return (
    <Box
      role="group"
      test-id={imQuestionCode}
      onClick={() => onClick(imQuestionCode)}
      onMouseOver={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
      as={hasChildIcons ? 'div' : 'button'}
      w="204px"
      h="64px"
      bg={isSelected && selectedSidebarBoxColor}
      borderRadius="20px"
      paddingX="1.5rem"
    >
      <HStack spacing={5}>
        <Box display="flex" cursor={'pointer'} width={'1.38rem'} height={'1.38rem'}>
          {icons[imQuestionCode] ? (
            <>
              <Iconly
                name={icons[imQuestionCode]}
                set="two-tone"
                primaryColor={
                  isSelected
                    ? 'var(--chakra-colors-internmatch-secondary)'
                    : isHovered
                    ? 'var(--chakra-colors-internmatch-primaryLight)'
                    : 'var(--chakra-colors-internmatch-light)'
                }
                secondaryColor={
                  isSelected
                    ? 'var(--chakra-colors-internmatch-secondaryLight)'
                    : isHovered
                    ? 'var(--chakra-colors-internmatch-primaryLightAlpha40)'
                    : 'var(--chakra-colors-internmatch-lightAlpha40)'
                }
                stroke="bold"
                size="medium"
              />
            </>
          ) : (
            <Box />
          )}
        </Box>
        {hasChildIcons ? (
          <HStack w={'full'}>
            <Text
              color={
                isSelected
                  ? 'var(--chakra-colors-internmatch-secondary)'
                  : isHovered
                  ? 'var(--chakra-colors-internmatch-primaryLight)'
                  : 'var(--chakra-colors-internmatch-light)'
              }
            >
              {name}
            </Text>

            <Iconly
              set="two-tone"
              name="ChevronDown"
              primaryColor={isSelected ? iconColorOnHighlight : iconColor}
              stroke="bold"
              size="small"
            />
          </HStack>
        ) : (
          <Text
            textStyle={isSelected ? 'internmatch.iconTextOnHighlight' : 'internmatch.iconText'}
            textAlign={'left'}
            color={
              isSelected
                ? 'var(--chakra-colors-internmatch-secondary)'
                : 'var(--chakra-colors-internmatch-light)'
            }
            _groupHover={{
              color: !isSelected && 'var(--chakra-colors-internmatch-primaryLight)',
            }}
          >
            {name}
          </Text>
        )}
      </HStack>
    </Box>
  )
}

export default InternmatchSideBarItem
