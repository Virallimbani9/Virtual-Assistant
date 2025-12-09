import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/SignIn.jsx'
import { SignUp } from './pages/SignUp.jsx'

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  )
}

export default App