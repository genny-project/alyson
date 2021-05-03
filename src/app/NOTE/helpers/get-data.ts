import { compose, filter, includes, keys, replace, split } from 'ramda'
import { Keyable } from 'utils/types'

export const getTabs = compose(filter(includes('Tab_')), keys)

export const getTitle = replace('Tab_', '')

export const getApps = (notes: Keyable) => split(',', notes?.Tab_Intern?.linkedAPPs || '')
