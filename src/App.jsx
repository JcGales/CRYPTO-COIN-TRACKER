import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Homes from './pages/Home/Homes'
import Coin from './pages/Coin/Coin'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homes/>}/>
         <Route path='/coin/:coindId' element={<Coin/>}/>
      </Routes>
    </div>
  )
}

export default App