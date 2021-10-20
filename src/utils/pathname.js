import { compose, mergeAll, addIndex, map } from 'ramda'

const getKey = idx =>
  idx === 0
    ? 'domain'
    : idx === 1
    ? 'parentCode'
    : idx === 2
    ? 'code'
    : idx === 3
    ? 'targetCode'
    : 'default'

const makePathname = ({ parentCode, code, targetCode }) =>
  `/home/${btoa(parentCode)}/${btoa(code)}${targetCode ? `/${btoa(targetCode)}` : ''}`

const readParams = compose(
  mergeAll,
  addIndex(map)((param, idx) => ({
    [getKey(idx)]: idx
      ? param === 'TE9HT1VU'
        ? ''
        : (() => {
            try {
              return atob(param)
            } catch (err) {
              console.error(err)
              return ''
            }
          })()
      : param,
  })),
)

const pathNameLinkedApplication = makePathname({
  parentCode: 'QUE_FAKE_PARENT',
  code: 'ACT_CONFIRM_MEETING',
})

export { makePathname, readParams, pathNameLinkedApplication }
