import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { IconButton, Menu, Icon } from '@material-ui/core'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import ChildMenuItem from './ChildMenuItem'

const AsksMenu = ({ questionCode }) => {
  const data = useSelector(selectCode(questionCode))

  if (!data) return null

  return (
    <PopupState variant="popover">
      {popupState => (
        <>
          <IconButton variant="outlined" color="secondary" {...bindTrigger(popupState)}>
            <Icon>add_circle</Icon>
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            {data.map(childCode => (
              <ChildMenuItem key={childCode} questionCode={questionCode} childCode={childCode} />
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  )
}

export default AsksMenu
