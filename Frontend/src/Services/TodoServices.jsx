import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('todoapp'));
    return {
        headers: {
            Authorization: `Bearer ${user?.data?.accessToken}`
        }
    };
};

const createTodo = (data) => {
    return axios.post(`${API_URL}/create`, data, getAuthHeaders());
};

const getTodos = (userId) => {
    return axios.get(`${API_URL}/create/${userId}`, getAuthHeaders());
};

const deleteTodo = (id) => {
    return axios.post(`${API_URL}/delete/${id}`, {}, getAuthHeaders());
};

const updateTodo = (id, data) => {
    return axios.patch(`${API_URL}/update/${id}`, data, getAuthHeaders());
};

const TodoServices = {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo
};

export default TodoServices;