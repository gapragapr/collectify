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
            })
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
            })
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
                url: `/${data.username}/${data.collectionId}/comment`,
                method: 'POST',
                body: data
            })
        }),
        likeCollection: builder.mutation({
            query: (data) => ({
                url: `/${data.username}/${data.collectionId}/like`,
                method: 'POST',
                body: data
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
    useLikeCollectionMutation
} = userApi