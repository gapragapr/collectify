import { Routes, Route } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import PagesWrapper from "./components/pages/PagesWrapper/PagesWrapper"
import Form from "./components/widgets/Form/Form"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useGetCurrentUserQuery } from "./api/userApi"
import { logout } from "./store/slices/userSlice"

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.userSlice.user)
  const {data, isError: currentUserError} = useGetCurrentUserQuery(`${currentUser?.username}`, {pollingInterval: 5000})

  useEffect(() => {
    if (currentUserError || data?.status === 'blocked') {
      dispatch(logout())
    }
  }, [currentUserError, data])

  return (
    <NextUIProvider navigate={navigate}>
      <div className="flex items-center min-h-screen flex-col bg-gray-50 font-sans">
          <Routes>
            <Route path="/*" element={<PagesWrapper/>} />
            <Route path="/form/*" element={<Form/>} />
          </Routes>
      </div>
    </NextUIProvider>
  )
}

export default App
