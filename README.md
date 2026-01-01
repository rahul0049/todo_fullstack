# ToDo FullStack Application

A robust full-stack ToDo application built to manage your daily tasks efficiently.

## 🚀 Overview

This project is a full-stack web application designed to help users create, read, update, and delete (CRUD) tasks. It features a modern, responsive frontend and a secure, scalable backend with user authentication.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Routing**: [React Router](https://reactrouter.com/) (v7)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose ODM)
- **Authentication**: JWT & Cookie Parser
- **File Storage**: [Cloudinary](https://cloudinary.com/) (via Multer)
- **Utilities**: Dotenv, CORS, Bcrypt

## ⚙️ Setup & Installation

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed locally or a MongoDB Atlas URI

### 1. Clone the Repository
```bash
git clone https://github.com/rahul0049/todo_fullstack.git
cd todo_fullstack
```

### 2. Backend Setup
Navigate to the `Backend` directory and install dependencies:
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` root and add your configuration (example):
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/todo
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal, navigate to the `Frontend` directory and install dependencies:
```bash
cd Frontend
npm install
```

Start the development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173` (or the port shown in your terminal).

## ✨ Features
- **User Authentication**: Secure Sign Up and Login.
- **Task Management**: Create, view, update, and delete tasks.
- **Responsive Design**: optimized for desktop and mobile.
- **Image Uploads**: Support for handling file uploads (Cloudinary).

## 📄 License
This project is for educational purposes.
