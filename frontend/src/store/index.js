import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";

import { sharedApi } from "../api/sharedApi";

const rootReducer = combineReducers({
    [sharedApi.reducerPath]: sharedApi.reducer,
    userSlice: userSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware().concat(sharedApi.middleware)
    }
})