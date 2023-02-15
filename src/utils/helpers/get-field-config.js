import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import { selectFieldMessage } from 'redux/app/selectors'
import { useSelector } from 'react-redux'
import { internmatch, lojing } from 'utils/constants'
import useGetProductName from './get-product-name'

const productFieldConfigs = {}

productFieldConfigs[internmatch] = {}
productFieldConfigs[lojing] = { radioVertical: true }

const useGetFieldConfig = () => productFieldConfigs[useGetProductName()]

export default useGetFieldConfig
