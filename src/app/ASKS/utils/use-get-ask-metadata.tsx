import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

interface AskMetadata {
  name: string | undefined
  attributeCode: string | undefined
  targetCode: string | undefined
  sourceCode: string | undefined
  processId: string | undefined
}

export const useGetAskMetadata = (code: string): AskMetadata => {
  const name: string | undefined = useSelector(selectCode(code, 'title'))
  const attributeCode: string | undefined = useSelector(selectCode(code, 'attributeCode'))
  const targetCode: string | undefined = useSelector(selectCode(code, 'targetCode'))
  const sourceCode: string | undefined = useSelector(selectCode(code, 'sourceCode'))
  const processId: string | undefined = useSelector(selectCode(code, 'processId'))

  return { name, attributeCode, targetCode, sourceCode, processId }
}
