import React from 'react'
import { Input } from '@nextui-org/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const SearchInput = () => {
  return (
    <Input label={'Search'} endContent={<MagnifyingGlassIcon className='w-6 h-full cursor-pointer fill-gray-300' />} />
  )
}

export default SearchInput