import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Write from './Write'
import Read from './Read'
import Update from './Update'
import Delete from './Delete'
import Dashboard from './Dashboard'
const App = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/write' element={<Write/>} />
          <Route path='/'  element={<Dashboard/>}/>
          <Route path='/read' element={<Read/>} />
          <Route path='/update' element={<Update/>} />
          <Route path='/delete' element={<Delete/>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
