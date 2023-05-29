import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import profileReducer from "./slices/profileSlice";

const reducers = combineReducers({
  profile: profileReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});
export const persistor = persistStore(store);
