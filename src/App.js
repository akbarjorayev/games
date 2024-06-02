import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { checkRunApp } from './js/utils/checker'

import './css/App.css'
import 'react-toastify/dist/ReactToastify.css'

import { Signup } from './pages/SignupLoginPage/Signup/Signup'
const Login = React.lazy(() => import('./pages/SignupLoginPage/Login/Login'))
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))
const GamesList = React.lazy(() => import('./pages/GamesPage/GameList'))
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'))

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
          <Route path="/games" element={<GamesList />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
