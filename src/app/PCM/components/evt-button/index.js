import { equals, compose } from 'ramda'
import { Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'

import { selectCodeUnary } from 'redux/db/selectors'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import InternmatchSideBarItem from 'app/PCM/components/sidebar-items/internmatch-sidebar'
import LojingSideBarItem from 'app/PCM/components/sidebar-items/lojing-sidebar'
import { selectCurrentSidebarItem } from 'redux/app/selectors'
import { setCurrentSidebarItem } from 'redux/app'
import { useIsProductLojing } from 'utils/helpers/check-product-name'
import DefaultEvtButton from './default-evt-button'

const EvtButton = ({
  questionCode,
  childCode,
  isSidebarButton = false,
  isNotChildAsk = false,
  vert = false,
  iconId,
  value,
}) => {
  const data = compose(useSelector, selectCodeUnary(questionCode))(childCode)

  const targetCode = compose(useSelector, selectCodeUnary(questionCode))('targetCode')
  const sourceCode = compose(useSelector, selectCodeUnary(questionCode))('sourceCode')
  const processId = compose(useSelector, selectCodeUnary(questionCode))('processId')
  const attrCode = compose(useSelector, selectCodeUnary(questionCode))('attributeCode')

  const trueQuestionCode = isNotChildAsk ? questionCode : childCode
  const currentSidebarItem = useSelector(selectCurrentSidebarItem)
  const dispatch = useDispatch()
  const dispatchSetCurrentSidebarItem = isSidebarButton
    ? compose(dispatch, setCurrentSidebarItem)
    : () => {}
  const isProductLojing = useIsProductLojing()

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

  const buttonObject = isSidebarButton ? (
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
    <DefaultEvtButton
      name={name}
      questionCode={questionCode}
      vert={vert}
      handleClick={handleClick}
    />
  )

  if (!childAsks) return buttonObject

  return (
    <Box>
      <Menu placement="right-start">
        <MenuButton test-id={trueQuestionCode}>{buttonObject}</MenuButton>

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
