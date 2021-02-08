import { includes } from 'ramda'

const setDisplayCode = state => items => {
  if (!items) return
  if (items.length === 1) {
    const code = items[0].code

    if (code && includes('SBE_', code)) {
      const displayCode = items[0].baseEntityAttributes?.find(
        attr => attr.attributeCode === 'SCH_DISPLAY_MODE',
      )

      if (!displayCode) {
        state.TABLE = code
      } else if (includes('DETAIL_VIEW', displayCode.valueString || '')) {
        state.DETAIL = code
      }
    }
  }
}

export default setDisplayCode
