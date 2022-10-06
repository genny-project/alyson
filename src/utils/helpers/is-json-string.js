const isJsonString = string => {
  try {
    JSON.parse(string)
  } catch (e) {
    return false
  }
  return true
}

export default isJsonString
