import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { add } from 'ramda'
import { useBoolean } from '@chakra-ui/hooks'
import { Box } from '@chakra-ui/layout'

import { selectRows } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import 'app/layouts/components/css/hide-scroll.css'
import LeftDetailSection from 'app/SBE/detail-profile/detail-layout/intern/detail-sections/desktop/LeftDetailSection.js'
import RightDetailSection from 'app/SBE/detail-profile/detail-layout/intern/detail-sections/desktop/RightDetailSection.js'
import Header from 'app/SBE/detail-profile/detail-layout/intern/detail-sections/mobile/template/Header.js'

const DetailLayoutIntern = ({ sbeCode, targetCode }) => {
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

  const DesktopView = () => {
    return (
      <Box className="nobar" minH="90vh" overflowY="scroll" onScroll={onScroll} onWheel={onWheel}>
        <Box w="100%" alignItems="start" display="flex">
          <LeftDetailSection beCode={beCode} sbeCode={sbeCode} />
          <RightDetailSection beCode={beCode} />
        </Box>
      </Box>
    )
  }

  const MobileView = () => {
    return (
      <Box className="nobar" overflowY="scroll" onScroll={onScroll} onWheel={onWheel}>
        <Header beCode={beCode} sbeCode={sbeCode} />
      </Box>
    )
  }

  return <>{isMobile ? <MobileView /> : <DesktopView />}</>
}
export default DetailLayoutIntern
