import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";

import { sharedApi } from "../api/sharedApi";
import { userApi } from "../api/userApi";
import { adminApi } from "../api/adminApi";

const rootReducer = combineReducers({
    [sharedApi.reducerPath]: sharedApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    userSlice: userSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware().concat(sharedApi.middleware).concat(userApi.middleware).concat(adminApi.middleware)
    }
})