import { parseISO } from 'date-fns'

const getDate = (valueFromBackend: string | undefined) => {
  if (valueFromBackend) {
    return parseISO(valueFromBackend)
  }

  return null
}
export default getDate
