import { TargetCode } from 'redux/types'

export interface Tag {
  name: string
  value: Number
}
export interface Note {
  content: string
  created: string
  id: Number
  sourceCode: TargetCode
  tags: Array<Tag>
  targetCode: TargetCode
}
export interface Notes {
  [key: string]: Note | null
}
export interface DBState {
  [key: string]: string | object | Array<string> | any
  NOTES: Notes
}
