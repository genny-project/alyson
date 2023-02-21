import { Box, HStack, Text, Tooltip, useTheme } from '@chakra-ui/react'
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
  isSidebarCollapsed,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const imQuestionCode = trueQuestionCode + '_IM'

  const isSelected = equals(trueQuestionCode)(currentSidebarItem)

  const theme = useTheme()

  const onClick = questionCode => {
    dispatchSetCurrentSidebarItem(questionCode)
    handleClick()
  }

  return (
    <Tooltip label={isSidebarCollapsed ? name : ''}>
      <Box
        role="group"
        test-id={imQuestionCode}
        onClick={() => onClick(trueQuestionCode)}
        onMouseOver={() => {
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
        }}
        as={hasChildIcons ? 'div' : 'button'}
        w="full"
        paddingBlock={'1.13rem'}
        paddingInlineStart={'1.75rem'}
        paddingInlineEnd={isSidebarCollapsed ? '.5rem' : '1.75rem'}
        bg={isSelected && selectedSidebarBoxColor}
        borderRadius="20px"
      >
        <HStack spacing={isSidebarCollapsed ? 0 : 5}>
          <Box display="flex" cursor={'pointer'} width={'1.38rem'} height={'1.38rem'}>
            {icons[imQuestionCode] ? (
              <Iconly
                name={icons[imQuestionCode]}
                set="two-tone"
                primaryColor={
                  isSelected
                    ? theme.colors.internmatch.secondary
                    : isHovered
                    ? theme.colors.internmatch.primary400
                    : theme.colors.internmatch.light
                }
                secondaryColor={
                  isSelected
                    ? theme.colors.internmatch.secondary400
                    : isHovered
                    ? theme.colors.internmatch.primary400Alpha40
                    : theme.colors.internmatch.lightAlpha40
                }
                stroke="bold"
                size="medium"
              />
            ) : (
              <Box />
            )}
          </Box>
          {hasChildIcons ? (
            <HStack w={'full'}>
              <Text
                id={name}
                color={
                  isSelected
                    ? theme.colors.internmatch.secondary
                    : isHovered
                    ? theme.colors.internmatch.primary400
                    : theme.colors.internmatch.light
                }
                display={isSidebarCollapsed ? 'none' : 'inline-flex'}
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
              display={isSidebarCollapsed ? 'none' : 'inline-flex'}
              opacity={isSidebarCollapsed ? '0' : '1'}
              textStyle={isSelected ? 'internmatch.iconTextOnHighlight' : 'internmatch.iconText'}
              textAlign={'left'}
              color={
                isSelected ? theme.colors.internmatch.secondary : theme.colors.internmatch.light
              }
              transition={'all 0.25s ease'}
              _groupHover={{
                color: !isSelected && theme.colors.internmatch.primary400,
              }}
            >
              {name}
            </Text>
          )}
        </HStack>
      </Box>
    </Tooltip>
  )
}

export default InternmatchSideBarItem
