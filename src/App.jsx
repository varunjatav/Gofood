import { useState } from 'react'
import Home from './screens/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import { CartProvider } from './components/ContextReducer'
import Orders from './screens/Orders'

function App() {
  

  return (
    <CartProvider>
    <Router>
    <div>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/createuser' element={<SignUp/>}/>
        <Route exact path='/myorders' element={<Orders/>}/>
      </Routes>
    </div>
    </Router>
    </CartProvider>
  )
}

export default App
