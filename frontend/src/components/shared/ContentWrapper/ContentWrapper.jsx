import React from 'react'

const ContentWrapper = ({children}) => {
    return (
      <div className='xl:w-1440 lg:w-976 md:w-768 sm:w-480 flex flex-col items-center'>
        {children}
      </div>
    )
}

export default ContentWrapper