import { Routes, Route } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

import Header from "./components/widgets/Header/Header"
import ContentWrapper from "./components/shared/ContentWrapper/ContentWrapper"
import Form from "./components/widgets/Form/Form"

function App() {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <div className="flex items-center flex-col bg-gray-50">
        <ContentWrapper>
          <Header />
          <Routes>
            <Route path="/*" element={<h1>main</h1>} />
            <Route path="/form/*" element={<Form/>} />
          </Routes>
        </ContentWrapper>
      </div>
    </NextUIProvider>
  )
}

export default App
