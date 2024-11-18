import React, { useState } from 'react'
import { register } from './firebase';

import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from "./pages/Login";



const App = () => {


  return (
    <div className='App'>
      <Toaster position='top-right'/>
      <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/login' element={<Login/>}/>
      </Routes>
     
    </div>
  )
}

export default App;
