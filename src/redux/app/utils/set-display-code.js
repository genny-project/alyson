import { includes, uniq } from 'ramda'

const setDisplayCode = state => items => {
  if (!items) return
  if (items.length === 1 && items[0]) {
    const code = items[0].code

    if (code && includes('SBE_', code)) {
      const displayCode = items[0].baseEntityAttributes?.find(
        attr => attr.attributeCode === 'SCH_DISPLAY_MODE',
      )

      if (includes('_COUNT_', code)) {
        state.DASHBOARD_COUNTS = uniq([...(state.DASHBOARD_COUNTS || []), code])
      }

      if (includes('DETAIL_VIEW', displayCode?.valueString || '')) {
        state.DETAIL = code
      } else {
        if (!includes('NESTED', displayCode?.valueString || '')) state.TABLE = code
      }
    }
  }
}

export default setDisplayCode
