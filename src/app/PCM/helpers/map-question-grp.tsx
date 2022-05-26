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
const mapQuestionGroup = (code: string) => (
  fn: (questionCode: string, attributeCode: string, iconId: string) => JSX.Element | undefined,
) => {
  let out: JSX.Element[] = []
  // Currently using wholeData as allAttributes doesn't seem to store anything for questiin groups
  const questions = useSelector(selectCode(code, 'questions'))

  forEach((x: string) => {
    const ask = useSelector(selectCode(code, questions[x].targetCode))
    const question = questions[x]

    if (fn) {
      out = append(
        fn(ask?.questionCode || '', ask?.question?.attributeCode || '', question?.icon || '')!,
        out,
      )
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
  }, keys(questions) as string[])

  return out
}

export default mapQuestionGroup
