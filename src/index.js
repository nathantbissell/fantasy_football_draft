import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { PlayerProvider } from './context'

ReactDOM.render(
  <PlayerProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </PlayerProvider>,
  document.getElementById('root')
)
