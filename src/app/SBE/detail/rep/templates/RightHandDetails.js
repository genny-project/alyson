import { includes, replace } from 'ramda'
import LinkedInternships from 'app/SBE/detail/rep/linked_internships'

const RightHandDetails = ({ sbeCode }) => {
  return (
    <>
      {includes('SBE_HOST_CPY_REP_', sbeCode) && (
        <LinkedInternships
          sbeCode={replace('SBE_HOST_CPY_REP_', 'SBE_LINKED_INTERNSHIP_OF_SUPERVISOR_', sbeCode)}
        />
      )}
    </>
  )
}

export default RightHandDetails
