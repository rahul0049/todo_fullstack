import { todoModel } from "../models/todo.models.js";

const createTodoController = async (req, res) => {
    try {
        const { title, description, createdBy } = req.body;
        if (!title || !description) {
            return res.status(500).send({
                success: false,
                message: "please provide title and description"
            })
        }
        const todo = new todoModel({ title, description, createdBy })
        const result = await todo.save();
        res.status(201).send({
            success: true,
            message: 'your task has been created', result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in creating todo api',
            error
        })
    }
}


const getTodoController = async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId) return res.status(404).send({ success: false, message: 'no user find' })
        const todos = await todoModel.find({ createdBy: userId })
        if (!todos) return res.status(404).send({ success: false, message: 'no todos' })
        return res.status(200).send({
            success: true,
            message: 'your todo', todos
        })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: 'erro in getting todos', todos
        })
    }
}

const deleteTodoController = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(404).send({ success: false, message: 'no todo find' })
        const todo = await todoModel.findByIdAndDelete(id)
        if (!todo) return res.status(404).send({ success: false, message: 'no task find' })
        return res.status(200).send({ success: true, message: 'task deleted' })
    } catch (error) {
        return res.status(404).send({ success: false, message: 'error while getting todo' })
    }
}
const updateTodoController = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(404).send({ success: false, message: 'Please provide id' })
        const data = req.body;
        const todo = await todoModel.findByIdAndUpdate(id, { $set: data }, { new: true })
        return res.status(200).send({ success: true, message: 'task updated successfully', todo })
    } catch (error) {
        return res.status(404).send({ success: false, message: 'error in update todo api', error })
    }
}

export { createTodoController, getTodoController, deleteTodoController, updateTodoController }