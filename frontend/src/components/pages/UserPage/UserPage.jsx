import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserQuery } from '../../../api/sharedApi'
import { useChangeuserParamsMutation } from '../../../api/adminApi'
import { useDeleteUserMutation } from '../../../api/adminApi'
import { useGetCurrentUserQuery } from '../../../api/userApi'

import { useSelector } from 'react-redux'

import CreateCollectionModal from '../../widgets/CreateCollectionModal/CreateCollеctionModal'
import CollectionCard from '../../widgets/CollectionCard/CollectionCard'

import {Button, Select, SelectItem} from "@nextui-org/react";

import { FolderArrowDownIcon } from '@heroicons/react/24/outline'

const UserPage = () => {
  const {username} = useParams()

  const [isCurrentUser, setIsCurrentUser] = useState(false)

  const currentUser = useSelector(state => state.userSlice.user)

  const {data: getUserData, isError, refetch} = useGetUserQuery(username)
  const [changeUserParams, {data: changeUserParamsData}] = useChangeuserParamsMutation()
  const [deleteUser, {data: deleteUserData}] = useDeleteUserMutation()
  const {refetch: refetchCurrentUser } = useGetCurrentUserQuery(currentUser?.username)

  useEffect(() => {
    if (currentUser?.username === username) {
      setIsCurrentUser(true)
    } 
  }, [])

  useEffect(() => {
    if (changeUserParamsData){
      refetch()
      refetchCurrentUser()
    }
  }, [changeUserParamsData])

  useEffect(() => {
    if (deleteUserData) {
      refetch()
      refetchCurrentUser()
    }
  }, [deleteUserData])

  const changeSelectHandler = (e, param) => {
    changeUserParams({
      userId: getUserData._id,
      body: {
        userInitiatorId: currentUser._id,
        param: param,
        paramValue: e.target.value
      }
    })
  }

  const clickDeleteUserButtonHandler = () => {
    deleteUser({
      userId: getUserData._id,
      body: {
        userInitiatorId: currentUser._id,
      }
    })
  }

  return (
    <div className={`min-h-[75vh] flex flex-col justify-between`}>
      {isError && <div>User not found</div>}
      {!isError && 
        <>
          {currentUser?.role == 'admin' && 
            <div className='p-3 bg-white rounded-md w-fit'>
              <div className='flex flex-col'>
                <p>username: {getUserData?.username}</p>
                <p className='flex items-center mb-3 mt-3'>role: 
                  <Select onChange={(e) => changeSelectHandler(e, 'role')} aria-label="User role" className='ml-3 w-32' selectedKeys={[getUserData?.role]}>
                    <SelectItem key={getUserData?.role}>{getUserData?.role}</SelectItem>
                    <SelectItem key={getUserData?.role === 'admin' ? 'user' : 'admin'}>{getUserData?.role === 'admin' ? 'user' : 'admin'}</SelectItem>
                  </Select>
                </p>
                <p className='flex items-center mb-6'>status: 
                  <Select onChange={(e) => changeSelectHandler(e, 'status')} aria-label="User status" className='ml-3 w-32' selectedKeys={[getUserData?.status]}>
                    <SelectItem key={getUserData?.status}>{getUserData?.status}</SelectItem>
                    <SelectItem key={getUserData?.status === 'active' ? 'blocked' : 'active'}>{getUserData?.status === 'active' ? 'blocked' : 'active'}</SelectItem>
                  </Select>  
                </p>
                <Button onClick={clickDeleteUserButtonHandler} color='danger'>Delete user</Button>
              </div>
            </div>
          }
          {getUserData && getUserData.userCollections.length > 0 &&
            <div className='grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 gap-5 items-start'>
              {getUserData.userCollections.map((item, index) => {
                return (
                  <CollectionCard refetch={refetch} key={index} collectionData={item} />
                )
              })}
            </div>
          }
          {
            getUserData && getUserData.userCollections.length == 0 &&
              <div className='w-full h-full flex justify-center items-center'>
                <p className='mt-[200px]'>NO CONTENT</p>
              </div>
          }
          {isCurrentUser && 
            <div className='mt-6 flex justify-between'>
              {getUserData?.userCollections.length > 0 && <Button color='primary' endContent={<FolderArrowDownIcon className='w-6'/>} className='mr-6'>Download all as CSV</Button>}
              <CreateCollectionModal refetch={refetch} />
            </div>
          }
        </>
      }
        
      
    </div>
  )
}

export default UserPage