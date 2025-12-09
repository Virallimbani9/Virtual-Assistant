import React from 'react'
import bg from '../assets/authBg.png';

export const SignUp = () => {
  return (
    <div 
      className='w-full h-[100vh] bg-cover flex justify-center items-center'
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className='w-[30%] h-[600px] max-w[500px] bg-[#00000069] backdrop-blur-md '>
        <div>SignUp</div>

      </form>
    </div>
  )
}