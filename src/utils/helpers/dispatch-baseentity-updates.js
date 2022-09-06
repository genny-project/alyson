const dispatchBaseEntityUpdates = dispatchFn => (attributeCode, targetCode, userInput) => {
  dispatchFn({
    data_type: 'BaseEntity',
    replace: true,
    items: [{ code: targetCode, baseEntityAttributes: [{ attributeCode, value: userInput }] }],
  })
}

export default dispatchBaseEntityUpdates
