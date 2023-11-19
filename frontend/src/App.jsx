import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateShop from './pages/CreateShop'
import ShowMenu from './pages/ShowMenu'
import ShowShops from './pages/ShowShops'
import CreateMenu from './pages/CreateMenu'

const App = () => {
  return (
    <Routes> 
      <Route path='/' element={<HomePage />}/>
      <Route path='/create-shop' element={<CreateShop />}/>
      <Route path='/myShop' element={<ShowShops />}/>
      <Route path='/menu-details' element={<ShowMenu />}/>
      <Route path='/create-menu' element={<CreateMenu />}/>
      {/* <Route path='/menu' element={<  />}/> */}
    </Routes>
  )
}

export default App 