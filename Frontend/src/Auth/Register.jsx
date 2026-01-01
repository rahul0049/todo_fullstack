import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthServices from '../Services/AuthServices'
import toast from 'react-hot-toast'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  //register function
  const navigate = useNavigate()

  //register function
  const registerHandler = async (e) => {
    try {
      e.preventDefault();
      const data = {
        fullName: name,
        email,
        username,
        password
      }
      const res = await AuthServices.registerUser(data)
      console.log(res.data)
      toast.success(res.data.message)
      navigate('/login')
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-indigo-50 to-white flex items-center justify-center p-6'>
      <div className='bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden'>
        <div className='p-8 space-y-6'>

          <div className='text-center space-y-2'>
            <h2 className='text-3xl font-bold text-gray-900 tracking-tight'>Create Account</h2>
            <p className='text-gray-500'>Join us to start organizing your life</p>
          </div>

          <form className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 block' htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder='John Doe'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 block' htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder='johndoe123'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 block' htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 block' htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'
              />
            </div>

            <button
              type='submit'
              onClick={registerHandler}
              className='w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Sign Up
            </button>
          </form>

          <p className='text-center text-sm text-gray-600'>
            Already have an account?{' '}
            <Link to='/login' className='font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors'>
              Login here
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register
