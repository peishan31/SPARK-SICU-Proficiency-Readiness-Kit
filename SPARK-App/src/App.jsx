import { useState } from 'react'
import MenuBar from './components/menubar/MenuBar'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import CreateChapter from './pages/CreateChapter'
import Chapters from './pages/Chapters'
import ViewCalculators from './pages/viewCalculator/ViewCalculators'
import CreateSubchapter from './pages/CreateSubchapter'
import Sidebar from './components/sidebar/Sidebar'
import MiniDrawer from './components/miniDrawer/MiniDrawer'
import PrimarySearchAppBar from './components/test'
import SubchapterContent from './pages/subchapterContent/SubchapterContent'
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
          <Route path="createChapter" element={<CreateChapter />} />
          <Route path="chapters" element={<Chapters />} />
          <Route path="/viewcalculators" element={<ViewCalculators/>}/>
          <Route path="/createsubchapter" element={<CreateSubchapter/>}/>
          <Route path="/subchapterContent" element={<SubchapterContent/>}/>
        </Routes> */}
      </div>
    </>
  )
}

export default App
