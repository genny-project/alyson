const getLabelAndValueFromObject = obj => {
  const label = obj?.attributeName || ''
  const value = obj?.value || false

  return { label, value }
}

export default getLabelAndValueFromObject
