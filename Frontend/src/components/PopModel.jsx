import React, { useState } from 'react'
import TodoServices from '../Services/TodoServices'
import toast from 'react-hot-toast'

const PopModel = ({ showModel, setShowModel, setRefresh, refresh, initialData = null }) => {
    const [title, setTitle] = useState(initialData?.title || '')
    const [description, setDescription] = useState(initialData?.description || '')
    const [loading, setLoading] = useState(false)

    // Reset form when initialData changes or modal opens
    React.useEffect(() => {
        if (showModel) {
            setTitle(initialData?.title || '')
            setDescription(initialData?.description || '')
        }
    }, [showModel, initialData])

    const handleClose = () => {
        setShowModel(false)
        setTitle('')
        setDescription('')
    }

    const handleSubmit = async () => {
        if (!title || !description) {
            toast.error("Please fill all fields")
            return
        }

        try {
            setLoading(true)

            // Check if we are updating or creating
            if (initialData) {
                const res = await TodoServices.updateTodo(initialData._id, { title, description })
                if (res.data.success) {
                    toast.success("Task updated!")
                    setRefresh(!refresh)
                    handleClose()
                }
            } else {
                // Create Logic
                const stored = localStorage.getItem('todoapp');
                const userId = stored ? JSON.parse(stored)?.data?.user?._id : null;

                if (!userId) {
                    toast.error("User not found. Please login again.")
                    return
                }

                const res = await TodoServices.createTodo({
                    title,
                    description,
                    createdBy: userId
                })

                if (res.data.success) {
                    toast.success("Task created!")
                    setRefresh(!refresh)
                    handleClose()
                }
            }

        } catch (error) {
            console.error(error)
            toast.error(initialData ? "Failed to update" : "Failed to create")
        } finally {
            setLoading(false)
        }
    }

    if (!showModel) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-2xl font-bold text-gray-800">{initialData ? 'Edit Task' : 'Add New Task'}</h4>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="What needs to be done?"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder-gray-400"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add details..."
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder-gray-400 resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={handleClose}
                            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (initialData ? 'Updating...' : 'Creating...') : (initialData ? 'Update Task' : 'Create Task')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopModel
