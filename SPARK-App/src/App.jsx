import { unstable_createStyleFunctionSx } from '@mui/system'
import { useEffect, useState } from 'react'
import './App.css'
import MiniDrawer from './components/miniDrawer/MiniDrawer'
import { useAppState, useActions } from './overmind'
import Login from './pages/login/Login'
import { useNavigate } from "react-router-dom"
import useLoginUser from './hooks/useLoginUser'
import CircularProgress from '@mui/material/CircularProgress';


function App() {
  // const chapterActions = useActions().chapters
  // const chaptersState = useAppState().chapters
  // console.log("Actions: ", chapterActions.loadChapters());
  // console.log("State", chaptersState.chapters)

  // if (!userState.user) {
  //   return <Login/>
  // }

  const { user, setUser, clearUser, getUser } = useLoginUser();

  useEffect(() => {
    getUser()
  }, [user])

  if (!user && "user" in sessionStorage) {
    return (
      <div
          style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}
          >
              <CircularProgress color='info' size={40} thickness={4} />
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <Login setUser={setUser}/>
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
            user.userType == "senior" ? 
            <MiniDrawer clearUser={clearUser} admin/> :
            <MiniDrawer clearUser={clearUser} />
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
