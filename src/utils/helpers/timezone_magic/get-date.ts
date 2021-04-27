import { includes } from 'ramda'

const getDate = (valueFromBackend: string | undefined) =>
  valueFromBackend
    ? includes('Z', valueFromBackend)
      ? new Date(`${valueFromBackend}`)
      : new Date(`${valueFromBackend}z`)
    : new Date()

export default getDate
