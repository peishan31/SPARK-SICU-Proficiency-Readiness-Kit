import { useState } from 'react'
import MenuBar from './components/menubar/MenuBar'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ViewCalculators from './pages/ViewCalculators'
import CreateSubchapter from './pages/CreateSubchapter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MenuBar/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/viewcalculators" element={<ViewCalculators/>}/>
          <Route path="/createsubchapter" element={<CreateSubchapter/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
