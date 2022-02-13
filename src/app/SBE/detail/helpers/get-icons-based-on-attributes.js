import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGraduationCap,
  faPlus,
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const iconsBasedOnAttributes = {
  PRI_EMAIL: faEnvelope,
  PRI_MOBILE: faPhoneAlt,
  _LNK_EDU_PROVIDER__PRI_NAME: faGraduationCap,
  PRI_ADDRESS_FULL: faMapMarkerAlt,
  ACT_PRI_EVENT_APPLY: faPlus,
}

const GetIconstBasedOnAttributes = ({ code, attributeCode, config = {} }) => {
  const data = useSelector(selectCode(code, attributeCode))
  const icon = data?.icon || iconsBasedOnAttributes[attributeCode]
  return <FontAwesomeIcon icon={icon} fixedWidth {...config} />
}
export const getIconsBasedOnAttributes = attributeCode => (
  <FontAwesomeIcon icon={iconsBasedOnAttributes[attributeCode]} fixedWidth />
)

export default GetIconstBasedOnAttributes
