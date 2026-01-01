import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Landing from './Landing/Landing.jsx'
import Login from './Auth/Login.jsx'
import Register from './Auth/Register.jsx'
import About from './pages/About.jsx'
import TodoList from './Todos/TodoList.jsx'
import {Toaster} from 'react-hot-toast'
import HomePage from './Home/HomePage.jsx'
const App = () => {
  return (
    <div> 
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/todolist' element={<TodoList/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
