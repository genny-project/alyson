import { Keyable } from 'utils/types'

export interface AppState {
  [key: string]: string | object | Array<string> | null
  DISPLAY: string
  DRAWER: string
  DIALOG: string
  TOAST: Keyable | null
  DASHBOARD_COUNTS: Array<String> | null
  NOTES: string
  DUPLICATE_EMAILS: string
  FIELDMSG: object
  lastSentMessage: any
  lastReceivedMessage: any
  highlightedQuestion: string
  currentSidebarItem: string
}

export interface BaseEntityAttribute {
  attributeCode: string
  attributeName: string
  baseEntityCode: string
  created: string
  index: number
  inferred: boolean
  privacyFlag: boolean
  readOnly: boolean
  value: string
  valueString: string
  weight: number
}
