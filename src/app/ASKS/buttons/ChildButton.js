import { useSelector } from 'react-redux'
import { Button, Menu, MenuItem } from '@material-ui/core'
import { selectCode } from 'redux/db/selectors'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

const ChildButton = ({ questionCode, childCode }) => {
  const data = useSelector(selectCode(questionCode, childCode))

  if (!data) return null

  const { name, childAsks } = data

  const onClick = () => sendAskClick(childCode, childCode)

  console.log(childAsks, 'hi')

  if (!childAsks)
    return (
      <Button
        style={{ textTransform: 'none' }}
        size="small"
        color="secondary"
        variant="outlined"
        onClick={onClick}
      >
        {name}
      </Button>
    )
  return (
    <PopupState variant="popover">
      {popupState => (
        <>
          <Button size="small" variant="outlined" {...bindTrigger(popupState)}>
            {name}
          </Button>
          <Menu {...bindMenu(popupState)}>
            {childAsks.map(childAsk => (
              <MenuItem
                onClick={() => sendAskClick(childAsk.questionCode, childAsk.questionCode)}
                test-id={childAsk.questionCode}
                button
                key={childAsk.questionCode}
              >
                {childAsk.name}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  )
}

export default ChildButton
