import React, { useEffect, useRef, useState } from 'react'

import { Link, Input, Button, button } from '@nextui-org/react'

import { LockClosedIcon, LockOpenIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/solid'

import useValidation from '../../../hooks/useValidation'
import { useRegisterUserMutation } from '../../../api/sharedApi'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
    const [userData, setUserData] = useState({email: null, username: null, password: null})
    const [showPassword, setShowPassword] = useState(false)
    const [formError, setFormError] = useState({email: {errorMessage: null}, username: {errorMessage: null}, password: {errorMessage: null}})
    const passwordInputRef = useRef(null)

    const navigate = useNavigate()

    const [registerUser, {isLoading, data, error}] = useRegisterUserMutation()

    let timeout

    useEffect(() => {
        if (data) {
            navigate('../../')
        }
    }, [data])

    useEffect(() => {
        error?.data?.type ? setFormError({
            ...formError,
            [error.data.type]: {
               errorMessage: error.data.message
            } 
                
        }) : null
    }, [error])

    useEffect(() => {
        return(() => {
            clearTimeout(timeout)
        })
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

        if (value === '') {
            setUserData({
                ...userData,
                [type]: null
            })
            setFormError({
                ...formError,
                [type]: {
                    errorMessage: `Enter ${type}, please`
                }
            })
        }
        
        
        if (useValidation(value, type)) {
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
        } else {
            setFormError({
                ...formError,
                [type]: {
                    errorMessage: `Enter valid ${type}, please`
                }
            })
        }
    }

    const blurInputHandler = (e, inputType) => {
        if (!userData[inputType] && e.target.value === ''){
            return setFormError({
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
           await registerUser(userData)
        }
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
          <div className='rounded-md bg-white shadow-md p-6'>
              <p className='text-center mb-6 font-bold text-lg'>Hello, user!</p>
              <Input 
                className='mb-6' 
                label={'Email'} 
                type='email' 
                endContent={<EnvelopeIcon className={`w-6 h-full items-center ${formError.email.errorMessage ? 'fill-rose-500' : 'fill-gray-300'}`}/>} 
                onValueChange={(value) => changeInputHandler(value, 'email')}
                onBlur={(e) => blurInputHandler(e, 'email')}
                errorMessage={formError.email.errorMessage}
                isInvalid={formError.email.errorMessage !== null}
                />
              <Input 
                className='mb-6'
                label={'Username'}
                type='text'
                onValueChange={(value) => changeInputHandler(value, 'username')}
                endContent={<UserIcon className={`w-6 h-full items-center ${formError.username.errorMessage ? 'fill-rose-500' : 'fill-gray-300'}`}/>}
                errorMessage={formError.username.errorMessage}
                isInvalid={formError.username.errorMessage !== null}
                onBlur={(e) => blurInputHandler(e, 'username')}  
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
                onBlur={(e) => blurInputHandler(e, 'password')}
                errorMessage={formError.password.errorMessage}
                isInvalid={formError.password.errorMessage !== null}
                />
              <Button isLoading={isLoading} onClick={clickButtonHandler} className='w-full mt-8 font-bold uppercase' color='primary'>Register</Button>
              <p className='mt-3'>Already have account? <Link href='./login' showAnchorIcon className='cursor-pointer' >Sign in!</Link></p>
          </div>
        </div>
    )
}

export default RegisterForm