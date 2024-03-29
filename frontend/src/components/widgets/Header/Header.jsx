import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

import SearchInput from '../../shared/SearchInput/SearchInput'

import { Button } from '@nextui-org/react'

import UserWidget from '../UserWidget/UserWidget'

const Header = () => {
    const navigate = useNavigate()
    const {isLogined} = useSelector(state => state.userSlice)
    const {user} = useSelector(state => state.userSlice)

    const buttonClickHandler = (url) => {
      navigate(url)
    }

    return (
      <div className='flex flex-nowrap items-center justify-between w-full p-3 sm:p-6 box-border'>
        <Link to={'./'}>LOGO</Link>
        <SearchInput />
        {isLogined ? 
          <div>
            <UserWidget user={user} />
          </div>
          : 
          <div className='flex'>
              <Button color='primary' className='mx-3' onClick={() => buttonClickHandler('./form/login')} >Login</Button>
              <Button color='primary' className='mx-3' onClick={() => buttonClickHandler('./form/register')} >Register</Button>
          </div>
        }
      </div>
    )
}

export default Header