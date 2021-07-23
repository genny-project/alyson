import { useSelector } from 'react-redux'

import { selectRows } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import 'app/layouts/components/css/hide-scroll.css'
import DesktopView from 'app/SBE/detail-profile/detail-layout/application/detail-sections/desktop'
import MobileView from 'app/SBE/detail-profile/detail-layout/application/detail-sections/mobile'

const DetailLayoutInternship = ({ sbeCode, targetCode }) => {
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null
  const isMobile = useIsMobile()

  return (
    <>
      {isMobile ? (
        <MobileView beCode={beCode} sbeCode={sbeCode} />
      ) : (
        <DesktopView beCode={beCode} sbeCode={sbeCode} />
      )}
    </>
  )
}
export default DetailLayoutInternship
