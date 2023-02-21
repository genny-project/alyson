import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { compose, includes } from 'ramda'
import { projectCodeString, internmatch, lojing } from 'utils/constants'

const useGetProductName = () => {
  const projectCode = compose(useSelector, selectCode)(projectCodeString)
  const productName = includes(internmatch)(projectCode)
    ? internmatch
    : includes(lojing)(projectCode)
    ? lojing
    : undefined

  return productName
}

export default useGetProductName
