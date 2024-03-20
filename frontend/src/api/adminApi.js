import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API_URI }),
    endpoints: (builder) => ({
        changeuserParams: builder.mutation({
            query: (data) => ({
                url: `/admin/change/userParam/${data.userId}`,
                method: 'POST',
                body: data
            })
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `/admin/delete/user/${data.userId}`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const {useChangeuserParamsMutation, useDeleteUserMutation} = adminApi