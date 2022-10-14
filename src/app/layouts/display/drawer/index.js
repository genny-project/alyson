import { Drawer, DrawerOverlay, DrawerContent } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { closeDrawer } from 'redux/app'
import { selectDrawer } from 'redux/app/selectors'
import { useMobileValue } from 'utils/hooks'

const DisplayDrawer = () => {
  const drawer = useSelector(selectDrawer)
  const dispatch = useDispatch()

  const isOpen = drawer !== 'NONE'

  const w = useMobileValue(['100vw', '96vw'])
  const ml = useMobileValue(['0vw', '2vw'])
  const size = useMobileValue(['full'])

  return (
    <Drawer size={size} placement="bottom" isOpen={isOpen} onClose={() => dispatch(closeDrawer())}>
      <DrawerOverlay>
        <DrawerContent w={w} ml={ml} borderTopRadius="lg">{`Drawer`}</DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default DisplayDrawer
