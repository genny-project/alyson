export interface AppState {
  [key: string]: string | object | Array<string> | null
  cmds: Array<Object>
  DISPLAY: string
  DRAWER: string
  DIALOG: string
  TOAST: object | null
}
