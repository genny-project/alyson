import Agent from './agent'
import Application from 'app/SBE/detail-profile/application'
import Company from './company'
import DefaultView from './default-view'
import EduProDetail from './edu_pro'
import Intern from 'app/SBE/detail-profile/intern'
import Internship from 'app/SBE/detail-profile/internship'
import Rep from './rep'
import getDetailType from './helpers/get-detail-type'
import getUserType from 'utils/helpers/get-user'
import { head } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { selectDetail } from 'redux/app/selectors'
import { useSelector } from 'react-redux'

const BaseEntityDetail = ({ targetCode, defaultView }) => {
  const code = useSelector(selectDetail)
  const displayMode = useSelector(selectCode(code, 'SCH_DISPLAY_MODE'))
  const displayType = getDetailType(displayMode?.value)

  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))

  const beCode = head(useSelector(selectCode(code, 'rows')) || [targetCode])

  if (defaultView) return <DefaultView sbeCode={code} targetCode={beCode} />
  if (displayType === 'CV') {
    return <Intern sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'COMPANY') {
    return <Company sbeCode={code} targetCode={beCode} userType={userType} />
  }

  if (displayType === 'INTERNSHIP') {
    return <Internship sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'APPLICATION') {
    return <Application sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'REP') {
    return <Rep sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'AGENT') {
    return <Agent sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'EDU_PRO') {
    return <EduProDetail sbeCode={code} targetCode={beCode} />
  }

  return <DefaultView sbeCode={code} targetCode={beCode} />
}

export default BaseEntityDetail
