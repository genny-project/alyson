import { always, compose, includes, propOr } from 'ramda'

type UserType = 'HOST_CPY_REP' | 'AGENT' | 'INTERN' | 'EDU_PRO_REP' | 'ADMIN' | 'DEV'

interface CapMap {
  [key: string]: Array<UserType>
}

const HOST_CPY_REP = 'HOST_CPY_REP'
const AGENT = 'AGENT'
const DEV = 'DEV'
const INTERN = 'INTERN'
const EDU_PRO_REP = 'EDU_PRO_REP'
const ADMIN = 'ADMIN'

export const hideQuickAdd = 'hideQuickAdd'
export const placeholder = 'placeholder'
export const seeAgent = 'seeAgent'
export const seeDev = 'seeDev'

const capMap = {
  [hideQuickAdd]: [HOST_CPY_REP],
  [placeholder]: [AGENT, INTERN, EDU_PRO_REP, ADMIN, HOST_CPY_REP],
  [seeAgent]: [AGENT],
  [seeDev]: [DEV, AGENT],
} as CapMap

export const caps = (userType: UserType) =>
  userType === ADMIN
    ? always(true)
    : (can: string) => compose(includes(userType), propOr([], can))(capMap)
