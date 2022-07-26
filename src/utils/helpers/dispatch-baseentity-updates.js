const dispatchBaseEntityUpdates = (attributeCode, targetCode, userInput) => dispatchFn => {
  dispatchFn({
    data_type: 'BaseEntity',
    replace: true,
    items: [{ code: targetCode, baseEntityAttributes: [{ attributeCode, value: userInput }] }],
  })
}

export default dispatchBaseEntityUpdates
