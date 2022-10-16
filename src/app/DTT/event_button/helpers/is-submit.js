import { equals } from 'ramda'
import convertToUppercase from 'utils/formatters/uppercase-convert'

const submit = 'SUBMIT'

const isSubmitButton = buttonName => equals(submit)(convertToUppercase(buttonName))

export default isSubmitButton
