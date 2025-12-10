import React, { useState} from 'react';
import bg from '../assets/authBg.png';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  return (
    <div 
      className='w-full min-h-screen bg-cover flex justify-center items-center p-4'
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className='w-full max-w-md bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden'>
        <div className='p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-white mb-2'>Welcome Buddy</h2>
            {/* <p className='text-gray-300'>Sign up to get started</p> */}
          </div>

          {/* Name Fields */}
          <div className='grid grid-cols-2 gap-4 mb-6'>
            <div>
              <label htmlFor='firstName' className='block text-sm font-medium text-gray-300 mb-2'>
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                required
                className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                placeholder='First'
                onChange={(e)=>setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div>
              <label htmlFor='lastName' className='block text-sm font-medium text-gray-300 mb-2'>
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                required
                className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                placeholder='Last'
                onChange={(e)=>setLastName(e.target.value)}
                value={lastName}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className='mb-6'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              required
              className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              placeholder='Email'
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password Field */}
          <div className='mb-6'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-300 mb-2'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                required
                minLength='8'
                className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12'
                placeholder='••••••••'
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
              >
                {showPassword ? (
                  // Closed Eye Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  // Open Eye Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            <p className='text-xs text-gray-400 mt-2'>Must be at least 8 characters long</p>
          </div>

          {/* Confirm Password Field */}
          <div className='mb-8'>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300 mb-2'>
              Confirm Password
            </label>
            <div className='relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirmPassword'
                name='confirmPassword'
                required
                minLength='8'
                className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12'
                placeholder='••••••••'
                onChange={(e)=>setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
              >
                {showConfirmPassword ? (
                  // Closed Eye Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  // Open Eye Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg'
          >
            Sign Up
          </button>

          <p className='text-center text-gray-400 mt-4'>
            Already have an account?{' '}
            <a href='#' onClick={()=>navigate("/signup")} className='text-white hover:text-blue-300 font-medium transition-colors'>
              Sign In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};