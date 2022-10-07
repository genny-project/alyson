import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { compose } from 'ramda'
import { projectCodeString } from 'utils/constants'

/**
 * Returns the value stored in redux with the key `PROJECT`.
 * This should be the name of the main project base entity.
 */

const useGetProjectInformation = () => {
  const projectCode = compose(useSelector, selectCode)(projectCodeString)
  return { projectCode }
}

/**
 * Returns the attribute from PRJ_{clientId}@{attributeCode}, or undefined if it does not exist
 *
 * `attributeCode` - The attribute code for `PROJECT`
 *
 * Returns the attribute object, or undefined
 */
const useGetAttributeFromProjectBaseEntity = attributeCode => {
  const { projectCode } = useGetProjectInformation()
  return useSelector(selectCode(projectCode, attributeCode))
}

export { useGetAttributeFromProjectBaseEntity, useGetProjectInformation }
