import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const sharedApi = createApi({
    reducerPath: 'sharedApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_BASE_API_URI, 
        mode: 'cors'
    }),
    endpoints: (buidler) => ({
        registerUser: buidler.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data
            })
        }),
        loginUser: buidler.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data,
            })
        }),
        getUser: buidler.query({
            query: (username) => ({
                url: `/${username}`
            }),
            providesTags: ['UserCollections']
        }),
        getCollection: buidler.query({
            query: (path) => ({
                url: path
            }),
        }),
        getLargestCollections: buidler.query({
            query: () => ({
                url: 'shared/largest/collections'
            })
        }),
        getLastCollections: buidler.query({
            query: () => ({
                url: 'shared/last/collections'
            })
        }),
        getRandomTags: buidler.query({
            query: () => ({
                url: '/shared/random/tags'
            })
        })
    })
})

export const {useRegisterUserMutation, useLoginUserMutation, useGetUserQuery, useGetCollectionQuery, useGetLargestCollectionsQuery, useGetLastCollectionsQuery, useGetRandomTagsQuery} = sharedApi