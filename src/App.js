import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './css/App.css'
import 'react-toastify/dist/ReactToastify.css'

const Signup = React.lazy(() => import('./pages/Account/Signup/Signup'))
const Login = React.lazy(() => import('./pages/Account/Login/Login'))

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/account/signup" element={<Signup />} />
          <Route path="/account/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
