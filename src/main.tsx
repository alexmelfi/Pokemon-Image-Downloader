import React from 'react'
import ReactDOM from 'react-dom/client'
const APP = require('./App.tsx')
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)