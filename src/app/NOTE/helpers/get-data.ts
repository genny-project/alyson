import { compose, filter, includes, keys, replace } from 'ramda'

export const getTabs = compose(filter(includes('Tab_')), keys)

export const getTitle = replace('Tab_', '')
