import React from 'react'
import ContentWrapper from '../../shared/ContentWrapper/ContentWrapper'
import Header from '../../widgets/Header/Header'
import { Routes, Route } from 'react-router-dom'

import MainPage from '../MainPage/MainPage'
import UserPage from '../UserPage/UserPage'
import ViewCollectionPage from '../ViewCollectionPage/ViewCollectionPage'

const PagesWrapper = () => {
    return (
      <div>
        <Header />
        <ContentWrapper>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/:username' element={<UserPage />}/>
                <Route path='/:username/:collectionId/view' element={<ViewCollectionPage />}/>
            </Routes>
        </ContentWrapper>
      </div>
    )
}

export default PagesWrapper