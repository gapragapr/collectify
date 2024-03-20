import React from 'react'

const ContentWrapper = ({children}) => {
    return (
      <div className='xl:w-1440 lg:w-976 md:w-768 sm:w-480 p-6 box-border flex flex-col my-8'>
        {children}
      </div>
    )
}

export default ContentWrapper