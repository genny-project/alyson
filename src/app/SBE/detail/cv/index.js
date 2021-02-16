import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'

import useApi from 'api'
import Header from './templates/header'
import DetailSection from './templates/detail-section'
import styles from './templates/styles'
import getActions from 'app/SBE/utils/get-actions'

const contactDetails = {
  sectionIcon: 'person',
  title: 'Contact Details',
  attributes: ['PRI_PREFERRED_NAME', 'PRI_MOBILE', 'PRI_EMAIL', 'PRI_ADDRESS_FULL'],
}

const Cv = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode)) || ['']
  const code = rows[0]
  // const actions = getActions(sbe)

  const { getImageSrc } = useApi()
  const imageEntity = useSelector(selectCode(code, 'PRI_IMAGE_URL'))
  const imageSrc = getImageSrc(imageEntity?.value)

  const headerAttribute = 'PRI_NAME'

  return (
    <div style={styles.container}>
      <Header code={code} imageSrc={imageSrc} headerAttribute={headerAttribute} />
      <DetailSection code={code} details={contactDetails} />
    </div>
  )
}

export default Cv
