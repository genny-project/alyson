import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { compose } from 'ramda'

/**
 * Returns the value stored in redux with the key `PROJECT`.
 * This should be the name of the main project base entity.
 */

const projectCodeString = 'PROJECT'

const useGetProjectInformation = () => {
  const projectCode = compose(useSelector, selectCode)(projectCodeString)

  return { projectCode }
}

const useGetProjectCode = () => useSelector(selectCode('PROJECT'))

/**
 * Returns the attribute from PRJ_{clientId}@{attributeCode}, or undefined if it does not exist
 *
 * `attributeCode` - The attribute code for `PROJECT`
 *
 * Returns the attribute object, or undefined
 */
const useGetAttributeFromProjectBaseEntity = attributeCode => {
  return useSelector(selectCode(useGetProjectCode(), attributeCode))
}

export { useGetAttributeFromProjectBaseEntity, useGetProjectCode, useGetProjectInformation }
