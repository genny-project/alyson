import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGraduationCap,
  faPlus,
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'

const iconsBasedOnAttributes = {
  PRI_EMAIL: faEnvelope,
  PRI_MOBILE: faPhoneAlt,
  _LNK_EDU_PROVIDER__PRI_NAME: faGraduationCap,
  PRI_ADDRESS_FULL: faMapMarkerAlt,
  ACT_PRI_EVENT_APPLY: faPlus,
}

const GetIconstBasedOnAttributes = ({ attributeCode, config = {} }) => {
  return <FontAwesomeIcon icon={iconsBasedOnAttributes[attributeCode]} fixedWidth {...config} />
}
export const getIconsBasedOnAttributes = attributeCode => (
  <FontAwesomeIcon icon={iconsBasedOnAttributes[attributeCode]} fixedWidth />
)

export default GetIconstBasedOnAttributes
