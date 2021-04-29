const timerResult = (result: number) =>
  result < 0 ? '' : result < 1000 ? `about ${result} ms` : `about ${result / 1000} seconds`

export default timerResult
