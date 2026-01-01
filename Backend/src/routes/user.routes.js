import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()
import {registerUser,loginUser} from '../controllers/user.controller.js'

import multer from "multer"
import { createTodoController } from "../controllers/todo.controller.js";

router.route("/register").post(
    upload.fields([
        {name:"avatar",maxCount:1}
    ]),
    registerUser
)

router.route("/login").post(loginUser)
router

export default router