import { useSelector } from 'react-redux'
import { selectDetail } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import Cv from './cv'
import Company from './company'
import Internship from './internship'
import Rep from './rep'
import Profile from './profile'
import DefaultView from './default-view'
import getDetailType from './helpers/get-detail-type'

const BaseEntityDetail = () => {
  const code = useSelector(selectDetail)
  const displayMode = useSelector(selectCode(code, 'SCH_DISPLAY_MODE'))
  const displayType = getDetailType(displayMode?.value)

  if (displayType === 'CV') {
    return <Cv sbeCode={code} />
  }

  if (displayType === 'COMPANY') {
    return <Company sbeCode={code} />
  }

  if (displayType === 'INTERNSHIP') {
    return <Internship sbeCode={code} />
  }

  if (displayType === 'APPLICATION') {
    return <Internship sbeCode={code} />
  }

  if (displayType === 'REP') {
    return <Rep sbeCode={code} />
  }

  if (displayType === 'USER_PROFILE') {
    return <Profile sbeCode={code} />
  }

  return <DefaultView sbeCode={code} />
}

export default BaseEntityDetail
