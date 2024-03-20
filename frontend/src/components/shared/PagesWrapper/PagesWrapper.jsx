import React from 'react'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import Header from '../../widgets/Header/Header'
import { Routes, Route } from 'react-router-dom'

import MainPage from '../../pages/MainPage/MainPage'
import UserPage from '../../pages/UserPage/UserPage'

const PagesWrapper = () => {
    return (
      <div>
        <Header />
        <ContentWrapper>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/:username' element={<UserPage />}/>
            </Routes>
        </ContentWrapper>
      </div>
    )
}

export default PagesWrapper