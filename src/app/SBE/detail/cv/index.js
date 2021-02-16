import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import useApi from 'api'
import Header from './templates/header'
import DetailSection from './templates/detail-section'
import styles from './templates/styles'
import getActions from 'app/SBE/utils/get-actions'

const contactDetails = {
  sectionIcon: faUser,
  title: 'Contact Details',
  attributes: ['PRI_PREFERRED_NAME', 'PRI_MOBILE', 'PRI_EMAIL', 'PRI_ADDRESS_FULL'],
}

const internshipDetail = {
  sectionIcon: faUser,
  title: 'Internship Details',
  attributes: ['PRI_START_DATE', 'PRI_ASSOC_DURATION', 'PRI_TRANSPORT'],
}

const careerObj = {
  sectionIcon: faUser,
  title: 'Career Objective',
  attributes: ['PRI_CAREER_OBJ'],
}

const Cv = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode)) || ''
  const rows = useSelector(selectRows(sbeCode)) || ['']
  const code = rows[0]
  const actions = getActions(sbe)

  const imageAttribute = 'PRI_IMAGE_URL'

  const headerAttribute = 'PRI_NAME'

  return (
    <div style={styles.container}>
      <Header
        code={code}
        sbeCode={sbeCode}
        imageSrc={imageAttribute}
        headerAttribute={headerAttribute}
        actions={actions}
      />
      <DetailSection code={code} details={contactDetails} />
      <DetailSection code={code} details={internshipDetail} />
      <DetailSection code={code} details={careerObj} />
    </div>
  )
}

export default Cv
