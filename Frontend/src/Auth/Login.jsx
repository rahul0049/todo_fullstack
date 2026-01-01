import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthServices from '../Services/AuthServices'
import toast from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  //login function
  const loginHandler = async (e) => {
    try {
      e.preventDefault()
      const data = { email, password }
      const res = await AuthServices.loginUser(data)
      toast.success(res.data.message)
      navigate('/home')
      localStorage.setItem('todoapp',JSON.stringify(res.data))
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='min-h-screen bg-linear-to-br from-indigo-50 to-white flex items-center justify-center p-6'>
      <div className='bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden'>
        <div className='p-8 space-y-6'>

          <div className='text-center space-y-2'>
            <h2 className='text-3xl font-bold text-gray-900 tracking-tight'>Welcome Back</h2>
            <p className='text-gray-500'>Sign in to continue to your workspace</p>
          </div>

          <form className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 block' htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder='you@example.com'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'
              />
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium text-gray-700 block' htmlFor="password">Password</label>
                <a href="#" className='text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors'>Forgot password?</a>
              </div>
              <input
                id="password"
                type="password"
                placeholder='••••••••'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'
              />
            </div>

            <button
              type='submit'
              onClick={loginHandler}
              className='w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Sign In
            </button>
          </form>

          <p className='text-center text-sm text-gray-600'>
            Don't have an account?{' '}
            <Link to='/register' className='font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors'>
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login
