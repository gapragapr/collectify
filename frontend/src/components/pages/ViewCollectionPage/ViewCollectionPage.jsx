import React, { useEffect, useState, useCallback } from 'react'

import {Image, Chip, Link, Checkbox, Tooltip, Textarea, Button} from '@nextui-org/react'
import { HandThumbUpIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import CommentCard from '../../widgets/CommentCard/CommentCard'
import CollectionTable from '../../widgets/CollectionTable/CollectionTable'
import Markdown from 'react-markdown'
import useGenerateChipColor from '../../../hooks/useGenerateChipColor'
import remarkGfm from 'remark-gfm'

import { useParams } from 'react-router-dom'
import { useGetCollectionQuery } from '../../../api/sharedApi'
import { useCommentCollectionMutation, useLikeCollectionMutation } from '../../../api/userApi'
import { useSelector } from 'react-redux'

const ViewCollectionPage = () => {
    const {username, collectionId} = useParams()
    const {user} = useSelector(state => state.userSlice)
    const {data: getCollectionData, isError: getCollectionDataError, isLoading: getCollectionDataLoading, refetch } = useGetCollectionQuery(`/${username}/${collectionId}`, {pollingInterval: 3000})
    const [commentCollection, {data: commentCollectionData, isError: commentCollectionError, isLoading: commentCollectionLoading}] = useCommentCollectionMutation()
    const [likeCollection] = useLikeCollectionMutation()
    const [isLiked, setIsLiked] = useState(false)
    const [columns, setColumns] = useState([
        {
            key: 'index',
            label: 'INDEX'
        },
        {
            key: 'id',
            label: 'ID'
        },
        {
            key: 'name',
            label: 'NAME'
        },
    ])

    const [createdComment, setCreatedComment] = useState({
        userInitiatorId: user?._id,
        commentData: {
            commentAuthor: {
                commentAuthorId: user?._id,
                commentAuthorUsername: user?.username
            },
            commentText: '',
        }
    })

    useEffect(() => {
        if (commentCollectionData && !commentCollectionError && !commentCollectionLoading) {
            setCreatedComment({
                ...createdComment,
                commentData: {
                    ...createdComment.commentData,
                    commentText: ''
                }
            })
            refetch()
        }
    }, [commentCollectionData])

    

    useEffect(() => {
        if (getCollectionData) {
            setColumns(prevState => [
                prevState[0],
                prevState[1],
                prevState[2],
                ...getCollectionData.userCollection.collectionCustomFields.map(field => ({ key: field.fieldName, label: field.fieldName, type: field.fieldType })),
                {
                    key: 'tags',
                    label: 'TAGS'
                },
            ]);
            if (user && getCollectionData.userCollection.collectionLikes && getCollectionData.userCollection.collectionLikes.findIndex(item => item.likeAuthor == user._id) !== -1){
                setIsLiked(true)
            } else {
                setIsLiked(false)
            }
        }
    }, [getCollectionData])

    const clickAddCommentButtonHandler = () => {
        commentCollection({
            body: createdComment,
            path: `${getCollectionData.username}/${getCollectionData.userCollection._id}/comment`
        })
    }

    const changeTextareaHandler = (e) => {
        setCreatedComment({
            ...createdComment,
            commentData: {
                ...createdComment.commentData,
                commentText: e.target.value
            }
        })
    }

    const renderCell = useCallback((item, columnKey) => {
        const customField = item.collectionItemCustomFields.find(field => field.fieldName === columnKey)

        switch (columnKey) {
            case 'index':
                return getCollectionData.userCollection.collectionItems.findIndex(collectionItem => item._id === collectionItem._id) + 1
            case 'id':
                return <Tooltip offset={-5} content={item._id}><p className='max-w-20 text-ellipsis overflow-hidden'>{item._id}</p></Tooltip>
            case 'name':
                return <Tooltip offset={-5} content={item.collectionItemName}><p className='max-w-20 text-ellipsis overflow-hidden'>{item.collectionItemName}</p></Tooltip>
            case 'tags':
                return item.collectionItemTags.map(tag => <p className='italic'>{tag.tagName}</p>)
            default:
                if (typeof customField?.fieldValue == 'boolean'){
                   return <Checkbox isSelected={customField?.fieldValue} /> 
                }
                return customField?.fieldValue

        }        
    })

    const clickLikeCollectionButtonHandler = () => {
        if (user) {
            likeCollection({
                body: {userInitiatorId: user._id},
                path: `${getCollectionData.username}/${getCollectionData.userCollection._id}/like`
            })
        }
    }
    

    return (
        <div className='flex w-full flex-col items-center'>
            <div className='flex flex-col xl:flex-row'>
                <div className='xl:w-480 shadow-md xl:mr-6 mb-3'>
                    <div className='relative'>
                        <Image src={getCollectionData?.userCollection?.collectionImg} className='w-full' />
                        <div className='absolute top-0 left-0 z-10 w-full pt-4 pr-4 flex justify-end'>
                            <div onClick={clickLikeCollectionButtonHandler} className={`flex items-center px-2 py-1 rounded-md cursor-pointer selection:bg-none hover:scale-[1.05] hover:shadow-md transition-all ${isLiked ? 'bg-rose-600 text-white' : 'bg-gray-100 text-black'}`}>
                                <p className='mr-3'>{getCollectionData?.userCollection?.collectionLikes.length || 0}</p>
                                <HandThumbUpIcon className='w-6' />
                            </div>
                        </div>
                        <div className='absolute bottom-0 left-0 z-10 bg-gradient-to-t from-black w-full p-4 pt-24 flex justify-between items-center'>
                            <p className='text-white font-bold '>
                                {getCollectionData?.userCollection?.collectionName}
                                <Link href={`/${username}`} className='cursor-pointer ml-3'>@{getCollectionData?.username}</Link>
                            </p>
                            <Chip color='secondary' variant='dot' className='text-white'>{getCollectionData?.userCollection?.collectionTopic}</Chip>
                        </div>
                    </div>
                    <div className='max-h-40 min-h-11 overflow-auto bg-gray-100 p-3'>
                        <Markdown remarkPlugins={[remarkGfm]}>{getCollectionData?.userCollection?.collectionDescription || 'No description'}</Markdown>
                    </div>
                </div>
                <CollectionTable columns={columns} items={getCollectionData?.userCollection?.collectionItems} generateChipColor={useGenerateChipColor} renderCell={renderCell} />
            </div>
            {user && 
                <>
                    {!getCollectionData?.userCollection?.collectionComments.find(comment => comment.commentAuthor.commentAuthorId == user._id) && 
                        <div className='w-full flex mt-6'>
                            <Textarea onChange={changeTextareaHandler} value={createdComment.commentData.commentText} className='w-full h-fit' label={'Comment text'} />
                            <Button onClick={clickAddCommentButtonHandler} isLoading={commentCollectionLoading} className='h-30 ml-3 w-30' color='primary' variant='flat'><PaperAirplaneIcon className='w-6'/></Button>
                        </div>
                    }
                </>
            }
            {getCollectionData?.userCollection?.collectionComments.length > 0 && 
                <div className='w-full flex flex-col items-start mt-6'>
                    {getCollectionData.userCollection.collectionComments.map(comment => {
                        return <CommentCard commentData={comment} key={comment._id} />
                    })}
                </div>
            }
        </div>
    )
}

export default ViewCollectionPage