import { append, forEach, keys, length } from 'ramda'
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
  const asks = useSelector(selectCode(code, 'wholeData')) || []
  const raw = useSelector(selectCode(code, 'raw')) || {}
  const list = length(asks) > 0 ? asks : !!raw ? [raw] : [] // If the question is not a question group, return just the one question
  forEach((x: string) => {
    const ask = list[x]
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
          vert={false}
          value={undefined}
          isNotChildAsk={false}
          sidebarItem={false}
        />,
        out,
      )
    }
  }, keys(list) as string[])
  return out
}
export default mapQuestionGroup
