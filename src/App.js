import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { checkRunApp } from './js/utils/checker'

import './css/App.css'
import 'react-toastify/dist/ReactToastify.css'

import { Signup } from './pages/SignupLogin/Signup/Signup'
const Login = React.lazy(() => import('./pages/SignupLogin/Login/Login'))
const MainPage = React.lazy(() => import('./pages/Main/MainPage'))
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))

export default function App() {
  checkRunApp()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account/signup/phone" element={Signup.phone} />
          <Route path="/account/signup/user-data" element={Signup.userData} />
          <Route path="/account/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
