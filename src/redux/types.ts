import { AppState } from './app/types'
import { DBState } from './db/types'

export interface Item {
  [key: string]: any
}

export type Items = Array<Item>
export interface MsgPayload {
  items: Items
  data_type: string
  aliasCode?: string
  parentCode?: string
  replace: boolean
}

export interface CmdPayload {
  cmd_type: string
  code: string
  sourceCode?: string
  targetCode?: string
  exec: boolean
  targetCodes?: Array<string>
}

export interface RootState {
  app: AppState
  db: DBState
}
