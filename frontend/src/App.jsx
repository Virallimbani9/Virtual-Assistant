import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { userDataContext } from './context/UserContext.jsx'
import { Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Custmize from './pages/Custmize.jsx'
import Custmize2 from './pages/Custmize2.jsx'
import { SignIn } from './pages/SignIn.jsx'
import { SignUp } from './pages/SignUp.jsx'

function App() {
  const {userData,setUserData} = useContext(userDataContext);
  return (
    <Routes>
      <Route>
        <Route path="/" element={ !userData?<SignIn /> : <Navigate to={"/home"}/>} />
        <Route path="/signup" element={ !userData?<SignUp /> : <Navigate to={"/home"}/>} />
        <Route path="/custmize" element={ userData?<Custmize /> : <Navigate to={"/"}/>} />
        <Route path="/custmize2" element={ userData?<Custmize2 /> : <Navigate to={"/"}/>} /> 
        <Route path="/home" element={ (userData?.assistantImage && userData?.name)? <Home /> :<Navigate to={"/custmize"}/>} />
      </Route>
    </Routes>
  )
}

export default App