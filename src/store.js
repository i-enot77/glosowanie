import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { customizationApi } from "./services/api";
import { authenticationReducer } from "./services/authenticationSlice";

const rootReducer = combineReducers({
  auth: authenticationReducer,
  [customizationApi.reducerPath]: customizationApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customizationApi.middleware),
});

setupListeners(store.dispatch);
