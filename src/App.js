import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { checkRunApp } from './js/utils/checker'

import './css/App.css'
import 'react-toastify/dist/ReactToastify.css'

import { Signup } from './pages/Account/Signup/Signup'
const Login = React.lazy(() => import('./pages/Account/Login/Login'))
const GameArea = React.lazy(() => import('./pages/Main/GameArea/GameArea'))

export default function App() {
  checkRunApp()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/account/signup/phone" element={Signup.phone} />
          <Route path="/account/signup/userdata" element={Signup.userData} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/games" element={<GameArea />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
