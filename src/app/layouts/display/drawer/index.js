import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { closeDrawer } from 'redux/app'
import { selectDrawer } from 'redux/app/selectors'

const DisplayDrawer = () => {
  const drawer = useSelector(selectDrawer)
  const dispatch = useDispatch()

  const isOpen = drawer !== 'NONE'

  return (
    <Drawer isOpen={isOpen} onClose={() => dispatch(closeDrawer())}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <div>hi</div>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default DisplayDrawer
