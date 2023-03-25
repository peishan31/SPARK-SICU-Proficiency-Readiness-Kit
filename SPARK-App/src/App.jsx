import { useEffect, useState } from 'react'
import './App.css'
import MiniDrawer from './components/miniDrawer/MiniDrawer'
import { useAppState, useActions } from './overmind'
import Login from './pages/login/Login'

function App() {
    
  // user in overmind
  const userState = useAppState().user
  // const userActions = useActions().user
  // const chapterActions = useActions().chapters
  // const chaptersState = useAppState().chapters
  // console.log("Actions: ", chapterActions.loadChapters());
  // console.log("State", chaptersState.chapters)

  // if (!userState.user) {
  //   return <Login/>
  // }

  if (!userState.currentUser) {
    return (
      <>
        <Login/>
      </>
    )
  }
    
  return (
    <>
      <div className="App">
        {
          // if current user exists then render mini drawer, otherwise show login component
          // userState.currentUser || sessionStorage.getItem("currentUser") ? <MiniDrawer/> : <Login/>

        }
        {/* if not logged in or localstorage is null then don't render mini drawer */}
        <div className="content-wrap">
  
        { 
          userState.currentUser.userType == "senior" ? 
          <MiniDrawer admin/> :
          <MiniDrawer/>
          }
      </div>
        <footer className='footer'>
          &copy; 2023 Team CLT. 
        </footer>
      </div>
    </>
  )
}

export default App