import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './screen/HomeScreen'
import AboutScreen from './screen/AboutScreen'
import { ChatPage } from './screen/chat/ChatPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
