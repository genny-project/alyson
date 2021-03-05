export interface Item {
  [key: string]: any
}

export interface MsgPayload {
  items: Array<Item>
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
