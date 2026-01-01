import mongoose from 'mongoose'
import { User } from './user.models.js'

const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:false,
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
},{timestamps:true})

export const todoModel = mongoose.model("todoModel",todoSchema)