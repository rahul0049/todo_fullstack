import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findOne(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "something went wrong while generating refresh or access token"
        })
    }
}


const registerUser = async (req, res, next) => {
    try {
        const { fullName, email, username, password } = req.body;
        if (
            [fullName, email, username, password].some((field) => {
                return field?.trim() === ""
            })
        ) {
            return res.status(500).send({
                success: false,
                message: "please provide all fields"
            })
        }

        const existedUser = await User.findOne({
            $or: [{ email }, { username }]
        })
        if (existedUser) return res.status(500).send({
            success: false,
            message: 'user already exist'
        })
        const user = await User.create({
            fullName,
            email,
            password,
            username: username.toLowerCase()
        })
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if (!createdUser) {
            return res.status(400).send({
                success: false,
                message: "something wend wrong while registering"
            })
        }

        return res.status(201).json({
            statusCode: 200,
            data: createdUser,
            message: "User registered Successfully",
            success: true
        })

    }
    catch (error) {
        next(error)

    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        if (!(username || email)) return res.status(400).send({
            success: false,
            message: "Please enter either username or email"
        })

        const user = await User.findOne({
            $or: [{ email }, { username }]
        })
        if (!user) return res.status(400).send({
            success: false,
            message: "username does not exist"
        })
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) return res.status(400).send({
            success: false,
            message: "Incorrect Password"
        })
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200).cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                statusCode: 200,
                data: {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                message: "user logged in successfully",
                success: true
            })
    } catch (error) {
        next(error)
    }
}


export { registerUser, loginUser }