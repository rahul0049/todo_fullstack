import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const NavBar = () => {
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = React.useState(false)
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('todoapp'))?.data?.user;
      if (stored) setUser(stored);
    } catch (e) {
      console.error("Failed to parse user", e);
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('todoapp')
    toast.success("Logged out successfully")
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo Section */}
          <Link to="/home" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-indigo-800">
              ToDo App
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/home"
              className="text-gray-600 hover:text-indigo-600 font-medium transition-colors text-sm"
            >
              Tasks
            </Link>

            {/* Profile Section */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 pl-6 border-l border-gray-100 hover:bg-gray-50 py-2 transition-colors rounded-lg"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm ring-2 ring-white shadow-sm">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-700 leading-none">
                    {user?.username || "User"}
                  </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showProfile && (
                <>
                  <div
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => setShowProfile(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.fullName || "User Name"}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || "email@example.com"}</p>
                      <p className="text-xs text-indigo-600 mt-1 capitalize">@{user?.username || "username"}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>

        </div>
      </div>
    </nav>
  )
}

export default NavBar
