import { useSelector } from 'react-redux'
import { selectDetail } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import Cv from './intern'
import Company from './company'
import Internship from './internship'
import Rep from './rep'
import Profile from './profile'
import Agent from './agent'
import DefaultView from './default-view'
import getDetailType from './helpers/get-detail-type'

const BaseEntityDetail = ({ targetCode }) => {
  const code = useSelector(selectDetail)
  const displayMode = useSelector(selectCode(code, 'SCH_DISPLAY_MODE'))
  const displayType = getDetailType(displayMode?.value)

  if (displayType === 'CV') {
    return <Cv sbeCode={code} targetCode={targetCode} />
  }

  if (displayType === 'COMPANY') {
    return <Company sbeCode={code} targetCode={targetCode} />
  }

  if (displayType === 'INTERNSHIP') {
    return <Internship sbeCode={code} targetCode={targetCode} />
  }

  if (displayType === 'APPLICATION') {
    return <Internship sbeCode={code} targetCode={targetCode} />
  }

  if (displayType === 'REP') {
    return <Rep sbeCode={code} targetCode={targetCode} />
  }

  if (displayType === 'USER_PROFILE') {
    return <Profile sbeCode={code} targetCode={targetCode} />
  }

  if (displayType === 'AGENT') {
    return <Agent sbeCode={code} targetCode={targetCode} />
  }

  return <DefaultView sbeCode={code} targetCode={targetCode} />
}

export default BaseEntityDetail
