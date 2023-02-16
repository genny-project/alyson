import { equals, compose, not } from 'ramda'
import { Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'

import { selectCodeUnary } from 'redux/db/selectors'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import InternmatchSideBarItem from 'app/PCM/components/sidebar-items/internmatch-sidebar'
import LojingSideBarItem from 'app/PCM/components/sidebar-items/lojing-sidebar'
import { selectCurrentSidebarItem } from 'redux/app/selectors'
import { setCurrentSidebarItem, setCurrentWaitingForBackendResponse } from 'redux/app'
import { useIsProductLojing } from 'utils/helpers/check-product-name'
import DefaultEventButton from 'app/PCM/components/evt-button/default-event-button'

const EvtButton = ({
  questionCode,
  childCode,
  iconId,
  vert,
  isNotChildAsk = false,
  value,
  sidebarItem,
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
  const dispatchSetCurrentWaitingForBackendResponse = compose(
    dispatch,
    setCurrentWaitingForBackendResponse,
  )
  const isProductLojing = useIsProductLojing()

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

  if (!data) return null

  if (not(sidebarItem))
    return (
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
      />
    )

  if (!childAsks)
    return isProductLojing ? (
      <LojingSideBarItem
        trueQuestionCode={trueQuestionCode}
        handleClick={handleClick}
        name={name}
        currentSidebarItem={currentSidebarItem}
      />
    ) : (
      <InternmatchSideBarItem
        trueQuestionCode={trueQuestionCode}
        handleClick={handleClick}
        name={name}
        currentSidebarItem={currentSidebarItem}
        dispatchSetCurrentSidebarItem={dispatchSetCurrentSidebarItem}
        dispatchSetCurrentWaitingForBackendResponse={dispatchSetCurrentWaitingForBackendResponse}
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
                dispatchSetCurrentWaitingForBackendResponse('true')
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
