import moment from 'moment'

import { DATE_FORMAT, WITH_TIME } from 'utils/constants'

const formatDate = (date, includeTime) => {
  const momentDate = moment(date)
  if (!momentDate.isValid()) return ''
  return momentDate.format(includeTime ? WITH_TIME : DATE_FORMAT)
}

export default formatDate
