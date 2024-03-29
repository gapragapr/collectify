import React, { useEffect } from 'react'
import SectionWrapper from '../../shared/SectionWrapper/SectionWrapper'
import { useGetLargestCollectionsQuery, useGetLastCollectionsQuery, useGetRandomTagsQuery } from '../../../api/sharedApi'
import { useNavigate } from 'react-router-dom'
import { Chip } from '@nextui-org/react'

import CollectionCard from '../../widgets/CollectionCard/CollectionCard'

const MainPage = () => {
    const navigate = useNavigate()

    const {data: largestCollectionsData} = useGetLargestCollectionsQuery()
    const {data: lastCollectionsData} = useGetLastCollectionsQuery()
    const {data: randomTagsData} = useGetRandomTagsQuery()

    const clickCollectionCardHandler = (username, collectionId) => {
      navigate(`${username}/${collectionId}/view`)
    }

    return (
      <div>
        <SectionWrapper sectionName={'Largest collections'}>
          <div className='grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 gap-5 items-start mt-3 mb-6'>
            {largestCollectionsData && largestCollectionsData?.length > 0 ? (
              largestCollectionsData.map(collection => {
              return (
                <div key={collection.userCollection._id} className='cursor-pointer' onClick={() => clickCollectionCardHandler(collection.collectionAuthorUsername, collection.userCollection._id)}>
                  <div className='pointer-events-none'>
                    <CollectionCard collectionData={collection.userCollection}/>
                  </div>
                </div>
              );
            })
            ) : (
              <p>NO COLLECTIONS</p>
            )}
          </div>

        </SectionWrapper>
        <SectionWrapper sectionName={'Last collections'}>
          <div className='grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 gap-5 items-start mt-3 mb-6'>
            {lastCollectionsData && lastCollectionsData?.length > 0 ? (
              lastCollectionsData.map(collection => {
              return (
                <div key={collection.userCollection._id} className='cursor-pointer' onClick={() => clickCollectionCardHandler(collection.collectionAuthorUsername, collection.userCollection._id)}>
                  <div className='pointer-events-none'>
                    <CollectionCard collectionData={collection.userCollection}/>
                  </div>
                </div>
              );
            })
            ) : (
              <p>NO COLLECTIONS</p>
            )}
          </div>
        </SectionWrapper>
        <SectionWrapper sectionName={'Tags cloud'}>
          <div className='bg-white shadow-md p-6 rounded-lg mt-3'>
              {randomTagsData && randomTagsData.length > 0 ? (
                randomTagsData.map(tag => {
                  return <Chip className='mx-3 my-1 cursor-pointer' color='secondary' variant='flat' key={tag._id}>{tag.tagName}</Chip>
                })
              ) : (
                <p>NO TAGS</p>
              )}
          </div>
        </SectionWrapper>
      </div>
    )
}

export default MainPage