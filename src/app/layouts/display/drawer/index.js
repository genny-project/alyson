import { Drawer, DrawerOverlay, DrawerContent } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { closeDrawer } from 'redux/app'
import { selectDrawer } from 'redux/app/selectors'
import Detail from 'app/SBE/detail'
import { useIsMobile } from 'utils/hooks'

const DisplayDrawer = () => {
  const drawer = useSelector(selectDrawer)
  const dispatch = useDispatch()

  const isOpen = drawer !== 'NONE'

  const isMobile = useIsMobile()

  return (
    <Drawer placement="bottom" isOpen={isOpen} onClose={() => dispatch(closeDrawer())}>
      <DrawerOverlay>
        <DrawerContent
          w={isMobile ? '90vw' : '70vw'}
          ml={isMobile ? '5vw' : '15vw'}
          borderTopRadius="lg"
        >
          {drawer === 'DETAIL' && <Detail />}
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default DisplayDrawer
