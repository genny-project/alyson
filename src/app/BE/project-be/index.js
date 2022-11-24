import { selectCode, selectCodeUnary } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { compose } from 'ramda'
import { projectCodeString } from 'utils/constants'

/**
 * Returns the value stored in redux with the key `PROJECT`.
 * This should be the name of the main project base entity.
 */

const useGetProjectInformation = attributeCode => {
  const projectCode = compose(useSelector, selectCode)(projectCodeString)
  const attributeObject = compose(useSelector, selectCodeUnary(projectCode))(attributeCode)
  return { attributeObject, projectCode }
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

  return compose(useSelector, selectCodeUnary(projectCode))(attributeCode)
}

export { useGetAttributeFromProjectBaseEntity, useGetProjectInformation }
