import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserQuery } from '../../../api/sharedApi'

import SectionWrapper from '../../shared/SectionWrapper/SectionWrapper'
import CreateCollectionModal from '../../widgets/CreateCollectionModal/CreateCollеctionModal'

import {Skeleton, Button} from "@nextui-org/react";

import { FolderArrowDownIcon, FolderPlusIcon } from '@heroicons/react/24/outline'

const UserPage = () => {
  const {username} = useParams()
  const {data, isError, isLoading} = useGetUserQuery(username)

  const skeletonArray = Array.from({length: 6}, () => '')

  useEffect(() => {
    console.log('hello')
  }, [])

  useEffect(() => {
    

  }, [data, isLoading, isError])
  

  return (
    <div>
      <SectionWrapper sectionName={'Collections'}>
        {isLoading ? 
          <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-14 mt-6'>
            {skeletonArray.map((_, index) => {
               return (
                <div key={index} className='w-full mb-6 hover:scale-[1.01] bg-white shadow-sm cursor-pointer space-y-5 p-4'>
                  <Skeleton className="rounded-lg">
                    <div className="h-60  bg-default-300"></div>
                  </Skeleton>
                  <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-5 w-4/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">  
                    <div className="h-5 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </div>
               </div>)
            })}
          </div> 
        : null}
      </SectionWrapper>
      <div className='w-full mt-6 flex justify-end'>
        <Button color='primary' endContent={<FolderArrowDownIcon className='w-6'/>} className='mr-6'>Download all as CSV</Button>
        <CreateCollectionModal />
      </div>
    </div>
  )
}

export default UserPage