import React from 'react'
import './output.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/RegisterPage'
import Login from './pages/LoginPage'
import Navbar from './components/Navbar'
import Ideas from './pages/Ideas'
import Footer from './components/Footer'
import IdeaDetails from './pages/IdeaDetails'
import CreateIdea from './pages/CreateIdea'
import Profile from './pages/Profile'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <>
    <Navbar/>
    
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/ideas' element={<Ideas/>}/>
      <Route path='/ideas/:id' element={<IdeaDetails/>}/>
      <Route path='/create' element={<ProtectedRoute><CreateIdea/></ProtectedRoute>}/>
      <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
    </Routes>
    
    <Footer/> 
    <Toaster/> 
    </>
  )
}

export default App