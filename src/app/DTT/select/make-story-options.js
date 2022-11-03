import { map } from 'ramda'

const makeStoryOptions = data => {
  return map(row => {
    return {
      code: row.value,
      baseEntityAttributes: [{ attributeCode: 'PRI_NAME', valueString: row.label }],
    }
  })(data)
}

export default makeStoryOptions
