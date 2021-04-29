const safelyParseDate = maybeDate => {
  try {
    return new Date(maybeDate)
  } catch (_) {
    return new Date()
  }
}

export default safelyParseDate
