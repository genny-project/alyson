const getDate = (valueFromBackend: string | undefined) =>
  valueFromBackend ? new Date(`${valueFromBackend}z`) : new Date()

export default getDate
