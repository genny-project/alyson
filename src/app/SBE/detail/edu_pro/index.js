// const contactdetails = {
//   title: 'Details',
//   attributes: ['PRI_MOBILE', 'PRI_LINKEDIN_URL'],
// }

import DefaultView from '../default-view'

// const horizontalLayoutDetails = {
//   attributes: ['PRI_ABN', 'PRI_PROVIDER_ID', 'PRI_LEGAL_NAME'],
// }

const EduProDetail = ({ sbeCode, targetCode }) => {
  return <DefaultView sbeCode={sbeCode} targetCode={targetCode} />
}

export default EduProDetail
