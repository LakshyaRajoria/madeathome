import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ShowMenu from './pages/ShowMenu'
import CreateMenu from './pages/CreateMenu'

const App = () => {
  return (
    <Routes> 
      <Route path='/' element={<HomePage />}/>
      <Route path='/placeholder' element={<ShowMenu />}/>
      <Route path='/menu' element={<CreateMenu />}/>
      {/* <Route path='/menu' element={<  />}/> */}
    </Routes>
  )
}

export default App 