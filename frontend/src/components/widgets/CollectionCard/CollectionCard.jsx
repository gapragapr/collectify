import React, { useEffect, useState } from 'react'
import { Chip } from '@nextui-org/react'
import { HandThumbUpIcon, TrashIcon, PencilSquareIcon, EyeIcon } from '@heroicons/react/24/outline'
import { useDeleteCollectionMutation } from '../../../api/userApi'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useNavigate } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../../../api/userApi'

import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem, Card, CardHeader, CardBody } from "@nextui-org/react";
import EditColletionModal from '../EditCollectionModal/EditColletionModal'

import { useSelector } from 'react-redux'

function CollectionCard({collectionData, refetch}) {
    const navigate = useNavigate()
    const {user} = useSelector(state => state.userSlice)
    useGetCurrentUserQuery(user?.username)

    const [action, setAction] = useState(null)

    const [deleteCollection, {data}] = useDeleteCollectionMutation()

    useEffect(() => {
        if (data) {
            refetch()
        }
    }, [data])

    const clickDeleteButtonHandler = () => {
        deleteCollection({
            userInitiatorId: user._id,
            collectionAuthorId: collectionData.collectionAuthor,
            collectionId: collectionData._id
        })
    }

    const clickOtherButtonHandler = (action) => {
        setAction(action)
    }

    return (
    <>
        <Dropdown showArrow={true} placement="bottom-end" backdrop='opaque'>
            <DropdownTrigger>
                <Card className='cursor-pointer hover:scale-[1.01]'>
                    <CardHeader>
                        <img src={collectionData.collectionImg} className='object-cover lg:h-96 h-80 w-full'/>
                    </CardHeader>
                    <CardBody>
                        <p className='font-bold text-xl mb-3'>{collectionData.collectionName}</p>
                        <Markdown  className={'font-thin text-sm min-h-10 bg-gray-100 p-3 rounded-md text-md mb-5 max-h-[150px] overflow-auto'} remarkPlugins={[remarkGfm]}>{collectionData.collectionDescription}</Markdown>
                        <div className='flex justify-between items-center'>
                            <Chip variant='dot' color='secondary' size='sm'>{collectionData.collectionTopic}</Chip>
                            <div className='flex items-center rounded-lg bg-gray-100 px-2 py-1 box-border'>
                                <p className='mr-2'>{collectionData.collectionLikes.length || 0}</p>
                                <HandThumbUpIcon className='w-5' />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="view" onClick={() => navigate(`./${collectionData._id}/view`)} className="text-xl" endContent={<EyeIcon className='w-5'/>}>View collection</DropdownItem>
                {user?.role === 'admin' || collectionData.collectionAuthor === user?._id ? <DropdownItem key="edit" onClick={() => clickOtherButtonHandler('edit')} className="text-xl" endContent={<PencilSquareIcon className='w-5'/>}>Edit collection</DropdownItem> : null}
                {user?.role === 'admin' || collectionData.collectionAuthor === user?._id ? <DropdownItem key="delete" onClick={clickDeleteButtonHandler} className="text-xl text-danger" color="danger" endContent={<TrashIcon className='w-5'/>}>Delete collection</DropdownItem> : null}
            </DropdownMenu>
        </Dropdown>
        {action == 'edit' && <EditColletionModal collectionData={collectionData} actionFn={setAction}/>}
    </>
    )
}

export default CollectionCard