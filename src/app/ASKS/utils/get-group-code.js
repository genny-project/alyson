import { pathOr } from 'ramda'

const getGroupCode = pathOr('', [
  'attribute',
  'dataType',
  'validationList',
  0,
  'selectionBaseEntityGroupList',
  0,
])

export default getGroupCode
