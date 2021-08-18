import { parseISO } from 'date-fns'

const getDate = (valueFromBackend: string | undefined) => {
  if (valueFromBackend) {
    return parseISO(valueFromBackend.includes('Z') ? valueFromBackend : valueFromBackend + 'Z')
  }

  return null
}
export default getDate
