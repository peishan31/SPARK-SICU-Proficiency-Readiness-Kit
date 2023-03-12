import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'


const overmind = createOvermind(config)
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider value={overmind}>
      <App />
    </Provider>
  </BrowserRouter>
)
