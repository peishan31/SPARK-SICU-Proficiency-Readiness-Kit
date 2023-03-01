import { useEffect, useState } from 'react'
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
import Subchapters from './pages/Subchapters'
import Login from './pages/login/Login'
function App() {
  const [token, setToken] = useState()

  // if (!token) {
  //   return <Login setToken={setToken}/>
  // }

  return (
    <>
      <div className="App">
        {/* if not logged in or localstorage is null then don't render mini drawer */}
      
        <MiniDrawer/>
        
        
      </div>
    </>
  )
}

export default App
