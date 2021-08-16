import { parseISO } from 'date-fns'
import { includes } from 'ramda'

const getDate = (valueFromBackend: string | undefined) => {
  if (valueFromBackend) {
    return parseISO(
      includes('Z', valueFromBackend || '') ? valueFromBackend : valueFromBackend + 'Z',
    )
  }

  return null
}
export default getDate
