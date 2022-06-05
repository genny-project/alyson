import { append, forEach, keys } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import EvtButton from '../components/evt-button'

/**
 * Returns a list of JSX.Elements, mapped entirely from a question group.
 * The Element return is based on fn, but if nothing is provided, will return an EvtButton
 * @param code - Question group to map
 * @returns
 */
const mapQuestionGroup = (
  fn: (ask: { [x: string]: any }, question: { [x: string]: any }) => JSX.Element | undefined,
) => (code: string) => {
  let out: JSX.Element[] = []
  const asks = useSelector(selectCode(code, 'wholeData'))

  forEach((x: string) => {
    const ask = asks[x]
    const question = ask.question

    if (fn) {
      out = append(fn(ask, question)!, out)
    } else {
      out = append(
        <EvtButton
          key={ask?.question.attributeCode || ''}
          questionCode={code}
          childCode={ask?.questionCode || ''}
          iconId={question?.icon || ''}
        />,
        out,
      )
    }
  }, keys(asks) as string[])

  return out
}

export default mapQuestionGroup
