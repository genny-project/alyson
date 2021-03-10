import { Drawer, DrawerOverlay, DrawerContent } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { closeDrawer } from 'redux/app'
import { selectDrawer } from 'redux/app/selectors'
import Detail from 'app/SBE/detail'

const DisplayDrawer = () => {
  const drawer = useSelector(selectDrawer)
  const dispatch = useDispatch()

  const isOpen = drawer !== 'NONE'

  return (
    <Drawer placement="bottom" isOpen={isOpen} onClose={() => dispatch(closeDrawer())}>
      <DrawerOverlay>
        <DrawerContent w="70vw" ml="15vw" borderTopRadius="lg">
          {/* <DrawerCloseButton /> */}
          {drawer === 'DETAIL' && <Detail />}
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default DisplayDrawer
