import React, { useRef, useState, useEffect } from 'react'

import { Link, Input, Button } from '@nextui-org/react'

import { EnvelopeIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid'

import { useNavigate } from 'react-router-dom'

import { useLoginUserMutation } from '../../../api/sharedApi'

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [userData, setUserData] = useState({ userLoginData: null, password: null })
    const [formError, setFormError] = useState({ userLoginData: {errorMessage: null}, password: {errorMessage: null} })
    const passwordInputRef = useRef(null)

    const navigate = useNavigate()

    let timeout

    const [loginUser, {isLoading, data, error}] = useLoginUserMutation()

    useEffect(() => {
        if (data) {
            navigate('../../')
        }
    }, [data])

    useEffect(() => {
        switch (error?.status) {
            case 404:
            case 403: 
                setFormError({
                    ...formError,
                    userLoginData: {
                        errorMessage: error.data.message
                    }
                })
                break;
            case 409: 
                setFormError({
                    ...formError,
                    password: {
                        errorMessage: error.data.message
                    }
                })
                break;
                
        }
    }, [error])

    useEffect(() => {
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    const clickLockIconHandler = () => {
        setShowPassword(!showPassword)
        timeout = setTimeout(() => {
            passwordInputRef.current.focus()
            const passwordInputLength = passwordInputRef.current.value.length
            passwordInputRef.current.setSelectionRange(passwordInputLength, passwordInputLength)
        }, 0)
    }

    const changeInputHandler = (value, type) => {
        setShowPassword(false)
        setUserData({
            ...userData,
            [type]: value
        })
        setFormError({
            ...formError,
            [type]: {
                errorMessage: null
            }
        })
    }

    const blurInputHandler = (inputType) => {
        if (!userData[inputType]) {
            setFormError({
                ...formError,
                [inputType]: {
                    errorMessage: `Enter ${inputType}, please`
                }
            })
        }
    }

    const clickButtonHandler = async () => {
        let updatedFormError = { ...formError };
        Object.keys(userData).forEach(key => {
            if (!userData[key]) {
                updatedFormError = {
                    ...updatedFormError,
                    [key]: {
                        errorMessage: `Enter ${key}, please`
                    }
                };
                
            }
        });

        setFormError(updatedFormError);

        if (Array.from(Object.values(userData)).every(item => item !== null)) {
            await loginUser(userData)
        }
    }

    return (
      <div className='w-full h-screen flex items-center justify-center'>
          <div className='rounded-md bg-white shadow-md p-6'>
              <p className='text-center mb-6 font-bold text-lg'>Welcome back!</p>
              <Input 
                className='mb-6' 
                label={'Email or username'} 
                type='text' 
                endContent={<EnvelopeIcon className={`w-6 h-full items-center ${formError.userLoginData.errorMessage ? 'fill-rose-500' : 'fill-gray-300'}`}/>} 
                onValueChange={(value) => changeInputHandler(value, 'userLoginData')}
                onBlur={() => blurInputHandler('userLoginData')}
                errorMessage={formError.userLoginData.errorMessage}
                isInvalid={formError.userLoginData.errorMessage !== null}
                />
              <Input 
                ref={passwordInputRef} 
                label={'Password'} 
                type={showPassword ? 'text' : 'password'} 
                endContent={showPassword ? <LockOpenIcon onClick={clickLockIconHandler} 
                                                className={`w-6 h-full items-center ${formError.password.errorMessage ? 'fill-rose-500' : 'fill-gray-300'} cursor-pointer`}/> : 
                                            <LockClosedIcon onClick={clickLockIconHandler} 
                                                className={`w-6 h-full items-center ${formError.password.errorMessage ? 'fill-rose-500' : 'fill-gray-300'} cursor-pointer`}/>} 
                onValueChange={(value) => changeInputHandler(value, 'password')}
                onBlur={() => blurInputHandler('password')}
                errorMessage={formError.password.errorMessage}
                isInvalid={formError.password.errorMessage !== null}
                />
              <Button onClick={clickButtonHandler} isLoading={isLoading} className='w-full mt-8 font-bold uppercase' color='primary'>Login</Button>
              <p className='mt-3'>Don't have an account? <Link href='./register' showAnchorIcon className='cursor-pointer' >Sign up!</Link></p>
          </div>
      </div>
  )
}

export default LoginForm