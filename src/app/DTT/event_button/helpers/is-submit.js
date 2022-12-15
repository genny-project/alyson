import { equals, toUpper } from 'ramda'

const submit = 'SUBMIT'

const isSubmitButton = buttonName => equals(submit)(toUpper(buttonName || ''))

export default isSubmitButton
