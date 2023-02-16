import { equals, compose } from 'ramda'
import { Box, Menu, MenuButton, MenuItem, MenuList, useTheme } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'

import { selectCodeUnary } from 'redux/db/selectors'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import InternmatchSideBarItem from 'app/PCM/components/sidebar-items/internmatch-sidebar'
import LojingSideBarItem from 'app/PCM/components/sidebar-items/lojing-sidebar'
import { selectCurrentSidebarItem } from 'redux/app/selectors'
import { setCurrentSidebarItem } from 'redux/app'
import { useIsProductLojing } from 'utils/helpers/check-product-name'
import DefaultEventButton from 'app/PCM/components/evt-button/default-event-button'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'

const EvtButton = ({
  questionCode,
  childCode,
  iconId,
  vert,
  isNotChildAsk = false,
  value,
  isSidebarItem,
}) => {
  const data = compose(useSelector, selectCodeUnary(questionCode))(childCode)

  const targetCode = compose(useSelector, selectCodeUnary(questionCode))('targetCode')
  const sourceCode = compose(useSelector, selectCodeUnary(questionCode))('sourceCode')
  const processId = compose(useSelector, selectCodeUnary(questionCode))('processId')
  const attrCode = compose(useSelector, selectCodeUnary(questionCode))('attributeCode')

  const trueQuestionCode = isNotChildAsk ? questionCode : childCode
  const currentSidebarItem = useSelector(selectCurrentSidebarItem)
  const dispatch = useDispatch()
  const dispatchSetCurrentSidebarItem = compose(dispatch, setCurrentSidebarItem)
  const isProductLojing = useIsProductLojing()
  const theme = useTheme()

  const bgColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.valueString || '#234371'
  const color = theme.colors.text.dark

  if (!data) return null

  const { name, childAsks } = data

  const handleClick = () => {
    const pid = equals(data['processId'] || 'no-idq')('no-idq') ? processId : data['processId']

    sendEvtClick({
      targetCode,
      sourceCode,
      parentCode: isNotChildAsk ? undefined : questionCode,
      code: trueQuestionCode,
      attributeCode: attrCode,
      value,
      processId: pid,
    })
  }

  console.log('isSidebarItem=====>', { isSidebarItem })

  if (!childAsks)
    return isSidebarItem ? (
      isProductLojing ? (
        <LojingSideBarItem
          trueQuestionCode={trueQuestionCode}
          handleClick={handleClick}
          name={name}
          currentSidebarItem={currentSidebarItem}
          dispatchSetCurrentSidebarItem={dispatchSetCurrentSidebarItem}
        />
      ) : (
        <InternmatchSideBarItem
          trueQuestionCode={trueQuestionCode}
          handleClick={handleClick}
          name={name}
          currentSidebarItem={currentSidebarItem}
          dispatchSetCurrentSidebarItem={dispatchSetCurrentSidebarItem}
        />
      )
    ) : (
      <DefaultEventButton
        childAsks={childAsks}
        trueQuestionCode={trueQuestionCode}
        iconId={iconId}
        vert={vert}
        name={name}
        handleClick={handleClick}
        sourceCode={sourceCode}
        targetCode={targetCode}
        processId={processId}
        bgColor={bgColor}
        color={color}
      />
    )

  return (
    <Box>
      <Menu placement="right-start">
        <MenuButton test-id={trueQuestionCode}>
          {isProductLojing ? (
            <LojingSideBarItem
              trueQuestionCode={trueQuestionCode}
              name={name}
              hasChildIcons={true}
              currentSidebarItem={currentSidebarItem}
            />
          ) : (
            <InternmatchSideBarItem
              trueQuestionCode={trueQuestionCode}
              name={name}
              hasChildIcons={true}
              currentSidebarItem={currentSidebarItem}
            />
          )}
        </MenuButton>

        <MenuList minW="350px">
          {childAsks.map(childAsk => (
            <MenuItem
              onClick={() => {
                dispatchSetCurrentSidebarItem(trueQuestionCode)
                sendEvtClick({
                  code: childAsk.questionCode,
                  parentCode: childAsk.questionCode,
                  attributeCode: childAsk.attributeCode,
                  sourceCode: sourceCode,
                  targetCode: targetCode,
                  processId: processId,
                })
              }}
              test-id={childAsk.questionCode}
              key={childAsk.questionCode}
              _focus={{ bg: '#3AB8B5', color: '#ffffff' }}
              fontSize="14px"
              fontWeight="400"
            >
              {childAsk.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default EvtButton
