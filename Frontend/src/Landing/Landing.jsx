import React from 'react'
import { Link } from 'react-router-dom'
import landingHero from '../assets/landing_hero.png'

const Landing = () => {
  return (
    <div className='min-h-screen bg-linear-to-br from-indigo-50 to-white flex items-center justify-center p-6'>
      <div className='max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>

        {/* Left Content */}
        <div className='space-y-8 text-center lg:text-left'>
          <h1 className='text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight'>
            <span className='block text-indigo-600'>Organize</span>
            <span className='block'>work and life, finally.</span>
          </h1>

          <p className='text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0'>
            Simplify your daily planning with a task manager that's built for focus.
            Achieve your goals, one task at a time.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
            <Link
              to='/register'
              className='px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1'
            >
              Get Started Free
            </Link>
            <Link
              to='/login'
              className='px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all'
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className='relative group'>
          <div className='absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200'></div>
          <img
            src={landingHero}
            alt="Productivity Workspace"
            className='relative rounded-2xl shadow-2xl w-full transform transition duration-500 hover:scale-[1.01]'
          />
        </div>

      </div>
    </div>
  )
}

export default Landing
