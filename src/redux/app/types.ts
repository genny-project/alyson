import { TargetCode } from 'redux/types'
import { Keyable } from 'utils/types'

export interface AppState {
  [key: string]: string | object | Array<string> | null
  cmds: Array<Object>
  DISPLAY: string
  DRAWER: string
  DIALOG: string
  TOAST: Keyable | null
  DASHBOARD_COUNTS: Array<String> | null
  NOTES: null | Array<TargetCode>
}

export interface BaseEntityAttribute {
  attributeCode: string
  attributeName: string
  baseEntityCode: string
  created: string
  index: Number
  inferred: boolean
  privacyFlag: boolean
  readOnly: boolean
  value: string
  valueString: string
  weight: number
}
