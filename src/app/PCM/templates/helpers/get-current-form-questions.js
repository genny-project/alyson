const getCurrentFormQuestions = askData => {
  let questionStore = []

  const getQuestionsList = individualAsk => {
    const { questionCode, childAsks } = individualAsk
    questionStore = childAsks?.length ? questionStore : questionStore.concat(questionCode)
    if (childAsks?.length) {
      childAsks?.map(individualAsk => getQuestionsList(individualAsk))
    }
    return questionStore
  }
  askData?.map(individualAsk => getQuestionsList(individualAsk))
  return questionStore
}

export default getCurrentFormQuestions
