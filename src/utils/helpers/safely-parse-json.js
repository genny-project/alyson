const safelyParseJson = (value, defaultValue) => {
  try {
    return JSON.parse(value) || defaultValue || {}
  } catch {
    return defaultValue || {}
  }
}

export default safelyParseJson
