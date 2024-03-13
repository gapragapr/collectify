import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm'

const Form = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginForm/>} />
      <Route path='/register' element={<RegisterForm/>}/>
    </Routes>
  )
}

export default Form