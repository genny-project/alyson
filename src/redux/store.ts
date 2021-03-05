import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import appReducer from './app'
import dbReducer from './db'

export default configureStore({
  middleware: [...getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })],
  reducer: {
    app: appReducer,
    db: dbReducer,
  },
})
