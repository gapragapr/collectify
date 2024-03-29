import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_BASE_API_URI,
        mode: 'cors' 
    }),
    endpoints: (builder) => ({
        createCollection: builder.mutation({
            query: (data) => ({
                url: '/user/create/collection',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['UserCollections']
        }),
        createCollectionItem: builder.mutation({
            query: (data) => ({
                url: '/user/create/collectionItem',
                method: 'POST',
                body: data
            })
        }),
        deleteCollection: builder.mutation({
            query: (data) => ({
                url: '/user/delete/collection',
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: ['UserCollections']
        }),
        deleteCollectionItem: builder.mutation({
            query: (data) => ({
                url: '/user/delete/collectionItem',
                method: 'DELETE',
                body: data
            })
        }),
        commentCollection: builder.mutation({
            query: (data) => ({
                url: data.path,
                method: 'POST',
                body: data.body
            })
        }),
        likeCollection: builder.mutation({
            query: (data) => ({
                url: data.path,
                method: 'POST',
                body: data.body
            })
        }),
        getCurrentUser: builder.query({
            query: (username) => ({
                url: `/${username}`
            })
        })
    })
})

export const {
    useCreateCollectionMutation, 
    useCreateCollectionItemMutation, 
    useDeleteCollectionMutation, 
    useDeleteCollectionItemMutation, 
    useCommentCollectionMutation, 
    useLikeCollectionMutation,
    useGetCurrentUserQuery
} = userApi