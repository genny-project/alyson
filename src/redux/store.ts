import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import appReducer from './app'
import dbReducer from './db'
import { AppState } from './app/types'
import { DBState } from './db/types'

export default configureStore({
  middleware: [...getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })],
  reducer: {
    app: appReducer,
    db: dbReducer,
  },
})

export interface RootState {
  app: AppState
  db: DBState
}
