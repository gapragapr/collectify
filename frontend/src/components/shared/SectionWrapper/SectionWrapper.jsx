import React from 'react'

const SectionWrapper = ({sectionName, children}) => {
  return (
    <div>
        <h2>{sectionName}</h2>
        <div>
            {children}
        </div>
    </div>
  )
}

export default SectionWrapper