import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import PopModel from '../components/PopModel'
import TodoServices from '../Services/TodoServices'
import toast from 'react-hot-toast'

const HomePage = () => {
  const [showModel, setShowModel] = useState(false)
  const [activeTodo, setActiveTodo] = useState(null)
  const [todos, setTodos] = useState([])
  const [refresh, setRefresh] = useState(false)

  const getUserId = () => {
    const stored = localStorage.getItem('todoapp');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed?.data?.user?._id;
    }
    return null;
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const userId = getUserId();
      if (userId) {
        try {
          const res = await TodoServices.getTodos(userId);
          if (res.data.success) {
            setTodos(res.data.todos);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchTodos();
  }, [refresh])

  const handleEdit = (todo) => {
    setActiveTodo(todo)
    setShowModel(true)
  }

  const handleToggleComplete = async (todo) => {
    try {
      await TodoServices.updateTodo(todo._id, { isCompleted: !todo.isCompleted })
      setRefresh(!refresh)
      toast.success(todo.isCompleted ? "Task marked incomplete" : "Task completed!")
    } catch (error) {
      toast.error("Failed to update task")
    }
  }

  const handleCreateNew = () => {
    setActiveTodo(null)
    setShowModel(true)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
            <p className="text-gray-600 mt-1">Manage your daily goals</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg shadow-md transition-all flex items-center gap-2 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Task
          </button>
        </div>

        <div className="mb-8 relative max-w-md">
          <input
            type="search"
            placeholder='Search your tasks...'
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>

        {todos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500 text-lg">No tasks found. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todos.map((todo) => (
              <div key={todo._id} className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col justify-between h-56 ${todo.isCompleted ? 'opacity-75 bg-gray-50' : ''}`}>
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`font-bold text-xl text-gray-800 truncate flex-1 ${todo.isCompleted ? 'line-through text-gray-500' : ''}`}>{todo.title}</h3>
                    <button
                      onClick={() => handleToggleComplete(todo)}
                      className={`p-1.5 rounded-full transition-colors ${todo.isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                      title={todo.isCompleted ? "Mark incomplete" : "Mark complete"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <p className={`text-gray-600 line-clamp-3 text-sm ${todo.isCompleted ? 'line-through text-gray-400' : ''}`}>{todo.description}</p>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 text-sm text-gray-400">
                  <span>{new Date(todo.createdAt).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-indigo-500 hover:text-indigo-700 font-medium px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
                      onClick={() => handleEdit(todo)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                      onClick={async () => {
                        if (window.confirm('Are you sure?')) {
                          await TodoServices.deleteTodo(todo._id)
                          setRefresh(!refresh)
                          toast.success("Task deleted")
                        }
                      }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModel && (
        <PopModel
          showModel={showModel}
          setShowModel={setShowModel}
          setRefresh={setRefresh}
          refresh={refresh}
          initialData={activeTodo}
        />
      )}
    </div>
  )
}

export default HomePage
