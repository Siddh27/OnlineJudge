import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './Layout.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import HomePage from './components/HomePage.jsx'
import SubmitProblem from './components/SubmitProblem.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='signup' element={<SignUp/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='user' element = {<Layout/>}> 
          <Route path='home' element={<HomePage/>}></Route>
          <Route path='submit' element={<SubmitProblem/>}></Route>
      </Route>
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
