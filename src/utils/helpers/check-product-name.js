import { equals } from 'ramda'

import useGetProductName from 'utils/helpers/get-product-name'
import { lojing, internmatch } from 'utils/constants'

const useCheckProductName = projectName => {
  const productName = useGetProductName()
  return equals(productName)(projectName)
}

export const useIsProductLojing = () => useCheckProductName(lojing)
export const useIsProductInternmatch = () => useCheckProductName(internmatch)

export default useCheckProductName
