import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Box, Divider } from '@chakra-ui/react'

import Header from './templates/header'
import DetailSection from './templates/detail-section'
import getActions from 'app/SBE/utils/get-actions'
import sectionAttributes from './utils/section-attributes'

const Cv = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))

  const rows = useSelector(selectRows(sbeCode))

  if (!sbe || !rows.length) return null

  const beCode = rows[0]
  const actions = getActions(sbe)

  const {
    contactDetails,
    internshipDetail,
    careerObj,
    imageAttribute,
    headerAttribute,
  } = sectionAttributes

  return (
    <Box mx={10}>
      <Header
        beCode={beCode}
        sbeCode={sbeCode}
        imageSrc={imageAttribute}
        headerAttribute={headerAttribute}
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
