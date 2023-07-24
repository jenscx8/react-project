import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'


axios.get('/api/instructors')
  .then(({data}) => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App initialInstructorList={data}/>
      </React.StrictMode>,
    )
  })
