import { AppState } from './app/types'
import { DBState } from './db/types'

export interface Item {
  [key: string]: any
}
export type TargetCode = string
export type Items = Array<Item>
export interface MsgPayload {
  items: Items
  data_type: string
  aliasCode?: string
  parentCode?: string
  replace: boolean
  targetCodes?: Array<TargetCode>
  linkedApps?: string
  code?: string
}

export interface CmdPayload {
  cmd_type: string
  code: string
  sourceCode?: string
  targetCode?: string
  exec: boolean
  targetCodes?: Array<string>
}

interface MessageData {
  code: string
  parentCode: string | undefined
  rootCode: string | undefined
  targetCode: string | undefined
}
export interface Message {
  data_type: string | undefined
  event_type: string
  msg_type: string
  redirect: Boolean
  token: string
  data: MessageData
}

export interface RootState {
  app: AppState
  db: DBState
}
