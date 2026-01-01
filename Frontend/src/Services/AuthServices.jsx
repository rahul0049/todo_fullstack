import axios from "axios"
const registerUser = (data) => {
    return axios.post('http://localhost:8000/api/v1/users/register', data)
}

const loginUser = (data) => {
    return axios.post('http://localhost:8000/api/v1/users/login', data)
}

const AuthServices = { registerUser, loginUser }
export default AuthServices