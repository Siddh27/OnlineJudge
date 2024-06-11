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
import ProblemList from './components/ProblemList.jsx'
import AddProblem from './components/AddProblem.jsx'
import UpdateProblem from './components/UpdateProblem.jsx'
import ProfilePage from './components/ProfilePage.jsx'
import UpdateProfile from './components/UpdateProfile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='signup' element={<SignUp/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='user' element = {<Layout/>}> 
          <Route path='home' element={<HomePage/>}></Route>
          <Route path='submit/:title' element={<SubmitProblem/>}></Route>
          <Route path='problemList' element={<ProblemList/>}></Route>
          <Route path='addProblem' element={<AddProblem/>}></Route>
          <Route path='updateProblem/:title' element={<UpdateProblem/>}></Route>
          <Route path='profile' element={<ProfilePage/>}></Route>
          <Route path='updateProfile' element={<UpdateProfile/>}></Route>
      </Route>
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
