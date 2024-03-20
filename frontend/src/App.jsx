import { Routes, Route } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

import Cookies from "js-cookie"

import PagesWrapper from "./components/shared/PagesWrapper/PagesWrapper"
import Form from "./components/widgets/Form/Form"

function App() {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <div className="flex items-center flex-col dark:bg-slate-800 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/*" element={<PagesWrapper/>} />
            <Route path="/form/*" element={<Form/>} />
          </Routes>
      </div>
    </NextUIProvider>
  )
}

export default App
