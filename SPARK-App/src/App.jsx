import { useState } from 'react'
import MenuBar from './components/menubar/MenuBar'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ViewCalculators from './pages/ViewCalculators'
import Sidebar from './components/sidebar/Sidebar'
import MiniDrawer from './components/MiniDrawer'
import PrimarySearchAppBar from './components/test'
function App() {

  return (
    <>
      <div className="App">
        {/* <Sidebar/> */}
        <MiniDrawer/>
        {/* <MiniDrawerTest/> */}
        {/* <PrimarySearchAppBar/> */}
        {/* <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/viewcalculators" element={<ViewCalculators/>}/>
        </Routes> */}
      </div>
    </>
  )
}

export default App
