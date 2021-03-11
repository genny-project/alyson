import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import appReducer from './app'
import dbReducer from './db'
import { saveState, loadState } from './localStore'
import throttle from 'lodash.throttle'

const store = configureStore({
  middleware: [...getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })],
  reducer: {
    app: appReducer,
    db: dbReducer,
  },
  preloadedState: loadState(),
})

store.subscribe(throttle(() => saveState(store.getState()), 1000))

export default store
