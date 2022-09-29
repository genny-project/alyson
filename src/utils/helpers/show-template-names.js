import { equals } from 'ramda'

const showTemplateNames = equals(localStorage.getItem('showTemplateNames'))('true')

export default showTemplateNames
