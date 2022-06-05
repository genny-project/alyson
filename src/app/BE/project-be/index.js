import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

/**
 * Returns the value stored in redux with the key `PROJECT`.
 * This should be the name of the main project base entity.
 */
const useGetProjectCode = () => {
  return useSelector(selectCode('PROJECT'))
}

/**
 * Returns the attribute from PRJ_{clientId}@{attributeCode}, or undefined if it does not exist
 * @param attributeCode - The attribute code for PRJ_{clientId}
 * @returns - The attribute object, or undefined
 */
const useGetAttributeFromProjectBaseEntity = attributeCode => {
  return useSelector(selectCode('PROJECT', attributeCode))
}

export { useGetAttributeFromProjectBaseEntity, useGetProjectCode }
