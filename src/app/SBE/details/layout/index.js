import { useBoolean } from '@chakra-ui/hooks'
import { Box } from '@chakra-ui/layout'
import { add } from 'ramda'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import 'app/layouts/components/css/hide-scroll.css'
import LeftDetail from 'app/SBE/details/template/LeftDetail.js'
import RightDetail from 'app/SBE/details/template/RightDetail.js'

const DetailLayout = ({ sbeCode, targetCode, details = [[], []] }) => {
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null
  const isMobile = useIsMobile()
  const [mini, setMini] = useBoolean(isMobile)
  const [delta, setDelta] = useState(0)
  const onScroll = e => {
    setMini.on()
    setDelta(0)
  }
  const onWheel = e => setDelta(add(e.deltaY))
  useEffect(() => {
    if (delta < -300) {
      setMini.off()
      setDelta(0)
    }
  }, [delta, setMini])

  return (
    <Box className="nobar" minH="90vh" overflowY="scroll" onScroll={onScroll} onWheel={onWheel}>
      <Box w="100%" alignItems="start" display="flex">
        <LeftDetail beCode={beCode} sbeCode={sbeCode} />
        <RightDetail beCode={beCode} />
      </Box>
    </Box>
  )
}
export default DetailLayout
