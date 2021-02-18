import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { faUser, faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { Box, Divider } from '@chakra-ui/react'

import Header from './templates/header'
import DetailSection from './templates/detail-section'
import getActions from 'app/SBE/utils/get-actions'

const contactDetails = {
  sectionIcon: faUser,
  title: 'Contact Details',
  attributes: ['PRI_NAME', 'PRI_MOBILE', 'PRI_EMAIL', 'PRI_ADDRESS_FULL'],
}

const aboutMyself = {
  sectionIcon: faBriefcase,
  title: 'About Myself',
  attributes: [],
}

const moreInfo = {
  sectionIcon: faGraduationCap,
  title: 'More Information',
  attributes: [],
}

const DefaultView = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))

  if (!sbe || !rows.length) return null

  const code = rows[0]
  const actions = getActions(sbe)

  const imageAttribute = 'PRI_IMAGE_URL'

  const headerAttribute = 'PRI_NAME'

  return (
    <Box>
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
      <DetailSection code={code} details={aboutMyself} />
      <Divider />
      <DetailSection code={code} details={moreInfo} />
    </Box>
  )
}

export default DefaultView
