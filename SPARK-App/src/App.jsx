import { useState } from 'react'
import MenuBar from './components/menubar/MenuBar'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import CreateChapter from './pages/CreateChapter'
import Chapters from './pages/Chapters'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MenuBar/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="createChapter" element={<CreateChapter />} />
          <Route path="chapters" element={<Chapters />} />
        </Routes>
      </div>
    </>
  )
}

export default App
