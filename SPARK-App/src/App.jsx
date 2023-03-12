import { useEffect, useState } from 'react'
import './App.css'
import MiniDrawer from './components/miniDrawer/MiniDrawer'
import { useAppState, useActions } from './overmind'
import Login from './pages/login/Login'

function App() {
  
  // const [token, setToken] = useState()
  // user in overmind
  const userState = useAppState().user
  // const chapterActions = useActions().chapters
  // const chaptersState = useAppState().chapters
  // console.log("Actions: ", chapterActions.loadChapters());
  // console.log("State", chaptersState.chapters)

  // if (!userState.user) {
  //   return <Login/>
  // }

  return (
    <>
      <div className="App">
        {
          // if logged in or localstorage is not null then render mini drawer
          userState.currentUser ? <MiniDrawer/> : <Login/>

        }
        {/* if not logged in or localstorage is null then don't render mini drawer */}
        {/* <MiniDrawer/> */}
      </div>
    </>
  )
}

export default App
