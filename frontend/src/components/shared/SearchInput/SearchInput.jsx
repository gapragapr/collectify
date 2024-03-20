import React, { useRef } from 'react'
import { Input } from '@nextui-org/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const SearchInput = () => {
  const inputRef = useRef(null)

  const clickIconHandler = () => {
    inputRef.current.focus()
  }
  return (
    <Input ref={inputRef} label={'Search'} className='mx-3' endContent={<MagnifyingGlassIcon onClick={clickIconHandler} className='w-6 h-full cursor-pointer fill-gray-300' />} />
  )
}

export default SearchInput