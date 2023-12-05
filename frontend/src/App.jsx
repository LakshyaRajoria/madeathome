import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateShop from './pages/CreateShop'
import CreateAccount from './pages/CreateAccount'
import LoginPage from './pages/LoginPage'
import ShowMenu from './pages/ShowMenu'
import ShowShops from './pages/ShowShops'
import CreateMenu from './pages/CreateMenu'
import ShowMyShop from './pages/ShowMyShop'

const App = () => {
  return (
    <Routes> 
      <Route path='/' element={<HomePage />}/>
      <Route path='/create-shop' element={<CreateShop />}/>
      <Route path='/register' element={<CreateAccount />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/myShop' element={<ShowShops />}/>
      <Route path='/menu-details' element={<ShowMenu />}/>
      <Route path='/create-menu' element={<CreateMenu />}/>
      <Route path='/shops/:shopName' element={<ShowMyShop />}/>
    </Routes>
  )
}

export default App 