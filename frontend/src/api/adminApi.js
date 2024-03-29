import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API_URI }),
    endpoints: (builder) => ({
        changeuserParams: builder.mutation({
            query: (data) => ({
                url: `/admin/change/userParam/${data.userId}`,
                method: 'POST',
                body: data.body
            })
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `/admin/delete/user/${data.userId}`,
                method: 'DELETE',
                body: data.body
            })
        })
    })
})

export const {useChangeuserParamsMutation, useDeleteUserMutation} = adminApi