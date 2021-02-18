import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Box, Divider } from '@chakra-ui/react'

import Header from './templates/header'
import DetailSection from './templates/detail-section'
import getActions from 'app/SBE/utils/get-actions'
import sectionAttributes from './utils/section-attributes'

const Cv = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const actions = getActions(sbe)

  const rows = useSelector(selectRows(sbeCode))
  const code = rows[0]

  if (!sbe || !rows.length) return null

  const {
    contactDetails,
    internshipDetail,
    careerObj,
    imageAttribute,
    headerAttribute,
  } = sectionAttributes

  return (
    <Box w="90vw">
      <Header
        code={code}
        sbeCode={sbeCode}
        imageSrc={imageAttribute}
        headerAttribute={headerAttribute}
        actions={actions}
      />
      <Divider />
      <DetailSection code={code} details={contactDetails} />
      <Divider />
      <DetailSection code={code} details={internshipDetail} />
      <Divider />
      <DetailSection code={code} details={careerObj} />
    </Box>
  )
}

export default Cv
