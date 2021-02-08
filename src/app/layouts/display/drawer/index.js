import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { closeDrawer } from 'redux/app'
import { selectDrawer } from 'redux/app/selectors'
import Detail from 'app/SBE/detail'

const DisplayDrawer = () => {
  const drawer = useSelector(selectDrawer)
  const dispatch = useDispatch()

  const isOpen = drawer !== 'NONE'

  return (
    <Drawer size="full" isOpen={isOpen} onClose={() => dispatch(closeDrawer())}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>{drawer === 'DETAIL' && <Detail />}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default DisplayDrawer
