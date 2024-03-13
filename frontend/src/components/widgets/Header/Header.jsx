import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

import SearchInput from '../../shared/SearchInput/SearchInput'

import { Button } from '@nextui-org/react'

const Header = () => {
    const navigate = useNavigate()

    const buttonClickHandler = (url) => {
        navigate(url)
    }

    return (
      <div className='flex items-center justify-between w-full p-6 box-border'>
        <Link className='mr-3' to={'./'}>LOGO</Link>
        <SearchInput />
        <div className='flex'>
            <Button color='primary' className='mx-3' onClick={() => buttonClickHandler('./form/login')} >Login</Button>
            <Button color='primary' className='mx-3' onClick={() => buttonClickHandler('./form/register')} >Register</Button>
        </div>
      </div>
    )
}

export default Header