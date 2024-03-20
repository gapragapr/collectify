import { createSlice } from "@reduxjs/toolkit";
import { sharedApi } from "../../api/sharedApi";

import Cookies from 'js-cookie'

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: Cookies.get('user') && JSON.parse(Cookies.get('user')) || null,
        isLogined: Cookies.get('isLogined') && Boolean(Cookies.get('isLogined')) || false
    },
    reducers: {
        logout: (state, action) => {
            state.user = null
            state.isLogined = false

            Cookies.remove('isLogined')
            Cookies.remove('user')
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(sharedApi.endpoints.loginUser.matchFulfilled, (state, action) => {
            state.user = action.payload
            state.isLogined = true

            Cookies.set('isLogined', true)
            Cookies.set('user', JSON.stringify(state.user))
        });
        builder.addMatcher(sharedApi.endpoints.registerUser.matchFulfilled, (state, action) => {
            state.user = action.payload
            state.isLogined = true

            Cookies.set('isLogined', true)
            Cookies.set('user', JSON.stringify(state.user))
        })
    }
    
})

export const {logout} = userSlice.actions

export default userSlice.reducer