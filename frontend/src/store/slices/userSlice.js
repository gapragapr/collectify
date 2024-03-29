import { createSlice } from "@reduxjs/toolkit";
import { sharedApi } from "../../api/sharedApi";

import { userApi } from "../../api/userApi";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isLogined: localStorage.getItem('isLogined') ? Boolean(localStorage.getItem('isLogined')) : false,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    },
    reducers: {
        logout: (state, action) => {
            state.user = null
            state.isLogined = false

            localStorage.removeItem('isLogined')
            localStorage.removeItem('user')
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(sharedApi.endpoints.loginUser.matchFulfilled, (state, action) => {
            state.user = action.payload
            state.isLogined = true

            localStorage.setItem('isLogined', true)
            localStorage.setItem('user', JSON.stringify(state.user))
        });
        builder.addMatcher(sharedApi.endpoints.registerUser.matchFulfilled, (state, action) => {
            state.user = action.payload
            state.isLogined = true

            localStorage.setItem('isLogined', true)
            localStorage.setItem('user', JSON.stringify(action.payload))
        });
        builder.addMatcher(userApi.endpoints.getCurrentUser.matchFulfilled, (state, action) => {
            state.user = action.payload
            state.isLogined = true

            localStorage.setItem('isLogined', true)
            localStorage.setItem('user', JSON.stringify(state.user))
        })
    }
    
})

export const {logout} = userSlice.actions

export default userSlice.reducer