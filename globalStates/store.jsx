import { combineReducers, configureStore } from "@reduxjs/toolkit"
import coursesReducer from "./features/courses/courseSlices"
import sidebarReducer from "./features/leftSidbar/sidbarSlice"
import authReducer from "./features/auth/authSlice"

import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({
  courses: coursesReducer,
  sidebar: sidebarReducer,
  auth: authReducer,
})

// export const store = configureStore({
//   reducer: {
//     courses: coursesReducer,
//     sidebar: sidebarReducer,
//     auth: authReducer,
//   },
// })

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "courses"], // Only persist these slices
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist uses non-serializable values
    }),
})

export const persistor = persistStore(store)
