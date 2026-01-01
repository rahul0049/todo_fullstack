import express from 'express'
import { createTodoController, deleteTodoController, getTodoController, updateTodoController } from '../controllers/todo.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router()
router.route("/create").post(verifyJWT, createTodoController)
router.route('/create/:userId').get(verifyJWT, getTodoController)
router.route('/delete/:id').post(verifyJWT, deleteTodoController)
router.route('/update/:id').patch(verifyJWT, updateTodoController)
export default router