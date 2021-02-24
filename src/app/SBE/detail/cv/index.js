import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Box, Divider } from '@chakra-ui/react'

import Header from './templates/header'
import DetailSection from '../default-view/templates/detail-section'
import getActions from 'app/SBE/utils/get-actions'
import sectionAttributes from './utils/section-attributes'

const Cv = ({ sbeCode, targetCode }) => {
  const sbe = useSelector(selectCode(sbeCode))

  const rows = useSelector(selectRows(sbeCode))

  if (!sbe) return null

  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const actions = getActions(sbe)

  if (!beCode) return null

  const {
    contactDetails,
    internshipDetail,
    careerObj,
    imageAttribute,
    headerAttribute,
    videoAttribute,
  } = sectionAttributes

  return (
    <Box mx={10}>
      <Header
        beCode={beCode}
        sbeCode={sbeCode}
        imageSrc={imageAttribute}
        headerAttribute={headerAttribute}
        videoAttribute={videoAttribute}
        actions={actions}
      />
      <Divider />
      <DetailSection beCode={beCode} details={contactDetails} />
      <Divider />
      <DetailSection beCode={beCode} details={internshipDetail} />
      <Divider />
      <DetailSection beCode={beCode} details={careerObj} />
    </Box>
  )
}

export default Cv
