import React from 'react'
import SectionWrapper from '../../shared/SectionWrapper/SectionWrapper'

const MainPage = () => {
    return (
      <div>
        <SectionWrapper sectionName={'Largest collections'}></SectionWrapper>
        <SectionWrapper sectionName={'Last collection items'}></SectionWrapper>
        <SectionWrapper sectionName={'Tags cloud'}></SectionWrapper>
      </div>
    )
}

export default MainPage