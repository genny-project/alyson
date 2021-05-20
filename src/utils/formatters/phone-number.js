import {
  reduce,
  intersperse,
  splitEvery,
  last,
  splitAt,
  compose,
  concat,
  head,
  replace,
  tail,
} from 'ramda'

const chuckInDash = compose(intersperse(' '), splitEvery(3), last, splitAt(2))
const phoneNumberFormatter = number => {
  if (!number) return ''
  const firstThree = compose(head, splitAt(3))(number)
  const firstTwo = compose(head, splitAt(2))(number)
  if (firstThree === '610')
    return compose(reduce(concat, '+(61) '), chuckInDash)(replace('610', '61', number))
  return number[0] === '+'
    ? phoneNumberFormatter(tail(number))
    : number[0] !== '0'
    ? compose(reduce(concat, `+(${firstTwo}) `), chuckInDash)(number)
    : number[0] === '0'
    ? compose(reduce(concat, `+(${firstTwo}) `), chuckInDash)(`6${number}`)
    : compose(reduce(concat, `+(${firstTwo}) `), chuckInDash)(number)
}

export default phoneNumberFormatter
