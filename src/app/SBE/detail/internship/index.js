import { faBriefcase, faCompactDisc, faInfo } from '@fortawesome/free-solid-svg-icons'

import DetailLayout from '../layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinkedHostCpy from './templates/LinkedHostCpy'
import { replace } from 'ramda'
import LinkedSupervisor from './templates/LinkedSupervisor'

const internshipDetail = {
  icon: <FontAwesomeIcon size="lg" icon={faBriefcase} />,
  header: 'Internship Details',
  attributes: [
    { attr: 'PRI_STATUS' },
    { attr: 'PRI_ASSOC_INDUSTRY', label: 'Industry' },
    { attr: 'PRI_WORKSITE', label: 'Onsite/Remote' },
    { attr: 'PRI_INTERNSHIP_START_DATE', label: 'Start Date' },
    { attr: 'PRI_WHICH_DAYS_STRIPPED', label: 'Days of Week' },
    { attr: 'PRI_DRESS_CODE', label: 'Dress Code' },
    { attr: 'PRI_ASSOC_NUM_INTERNS', label: 'Available Spots' },
  ],
}

const resp = {
  icon: <FontAwesomeIcon size="lg" icon={faInfo} />,
  header: 'Roles and Responsibilities',
  attributes: [{ attr: 'PRI_ROLES_AND_RESPONSIBILITIES' }],
}
const baseOutcomes = {
  icon: <FontAwesomeIcon size="lg" icon={faInfo} />,
  header: 'Learning Outcomes',
  attributes: [{ attr: 'PRI_BASE_LEARNING_OUTCOMES' }],
}
const specOutcomes = {
  icon: <FontAwesomeIcon size="lg" icon={faInfo} />,
  header: 'Specific Learning Outcomes',
  attributes: [{ attr: 'PRI_SPECIFIC_LEARNING_OUTCOMES' }],
}

const software = {
  icon: <FontAwesomeIcon size="lg" icon={faCompactDisc} />,
  header: 'Software',
  attributes: [{ attr: 'PRI_SOFTWARE' }],
}

const Internship = ({ sbeCode, targetCode }) => {
  const hostCpy = (
    <LinkedHostCpy sbeCode={replace('SBE_INTERNSHIP_', 'SBE_LINKED_HOST_CPY_', sbeCode)} />
  )

  const supervisor = (
    <LinkedSupervisor
      sbeCode={replace('SBE_INTERNSHIP_', 'SBE_LINKED_INTERN_SUPERVISOR_', sbeCode)}
    />
  )

  const details = [
    [internshipDetail, resp, hostCpy],
    [software, supervisor, baseOutcomes, specOutcomes],
  ]
  return <DetailLayout sbeCode={sbeCode} targetCode={targetCode} details={details} />
}

export default Internship
