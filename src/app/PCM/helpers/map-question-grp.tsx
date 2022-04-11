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
  const wholeData = useSelector(selectCode(code, 'wholeData'))

  forEach((x: string) => {
    if (fn) {
      out = append(
        fn(
          wholeData[x]?.questionCode || '',
          wholeData[x]?.question?.attributeCode || '',
          wholeData[x]?.question?.icon || '',
        )!,
        out,
      )
    } else {
      out = append(
        <EvtButton
          key={wholeData[x]?.question?.attributeCode || ''}
          questionCode={code}
          childCode={wholeData[x]?.questionCode || ''}
          iconId={wholeData[x]?.question?.icon || ''}
        />,
        out,
      )
    }
  }, keys(wholeData) as string[])

  return out
}

export default mapQuestionGroup
