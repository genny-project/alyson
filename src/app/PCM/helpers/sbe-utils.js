import { filter, has, includes, reduce, sort, values, replace } from 'ramda'

export const getColumnDefs = mappedSbe => {
  return filter(obj => {
    if (has('attributeCode')(obj)) {
      return includes('COL_')(obj.attributeCode)
    }
    return false
  })(sort((a, b) => a.index - b.index)(values(mappedSbe)))
}

export const getFields = columnDefs => {
  return reduce((acc, elem) => {
    const attr = replace('COL_', '')(elem.attributeCode)

    acc = [...acc, attr]

    return acc
  }, [])(columnDefs)
}
