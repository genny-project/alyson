import appReducer, {
  newCmd,
  newMsg,
  closeDrawer,
  closeDialog,
  addFilter,
  removeFilter,
  sendMessage,
} from 'redux/app'

const initialState = { filters: [], cmds: [], DISPLAY: 'DASHBOARD', DRAWER: 'NONE', DIALOG: 'NONE' }

describe('App Reducer', () => {
  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual(initialState)
  })
})
