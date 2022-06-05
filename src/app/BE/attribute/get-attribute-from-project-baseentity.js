import { selectCode } from 'redux/db/selectors'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import { apiConfig } from 'config/get-api-config'
import { useSelector } from 'react-redux'
/**
 * Returns the attribute from PRJ_{clientId}@{attributeCode}, or undefined if it does not exist
 * @param attributeCode - The attribute code for PRJ_{clientId}
 * @returns - The attribute object, or undefined
 */
const useGetAttributeFromProjectBaseEntity = attributeCode => {
  const { clientId } = apiConfig
  const appName = convertToUppercase(clientId)

  return useSelector(selectCode('PRJ_' + appName, attributeCode))
}

export default useGetAttributeFromProjectBaseEntity
