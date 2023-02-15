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
}) => {
  const trueQuestionCodeIM = trueQuestionCode + '_IM'
  const isSelected = equals(trueQuestionCodeIM)(currentSidebarItem)
  const [isHovered, setIsHovered] = useState(false)

  const onClick = questionCode => {
    dispatchSetCurrentSidebarItem(questionCode)
    handleClick()
  }

  return (
    <Box
      role="group"
      test-id={trueQuestionCodeIM}
      onClick={() => onClick(trueQuestionCodeIM)}
      as="button"
      w={'full'}
      paddingBlock={'1.25rem'}
      paddingInline={'2.25rem'}
      bg={isSelected && selectedSidebarBoxColor}
      borderRadius="20px"
      paddingX="1.5rem"
      onMouseOver={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
    >
      <HStack spacing={5} w={'full'}>
        <Box display="flex" cursor={'pointer'} width={'1.38rem'} height={'1.38rem'}>
          {icons[trueQuestionCodeIM] ? (
            <>
              <Iconly
                name={icons[trueQuestionCodeIM]}
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
              textStyle={isSelected ? 'internmatch.iconTextOnHighlight' : 'internmatch.iconText'}
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
