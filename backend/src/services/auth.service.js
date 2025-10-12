import mongoose from "mongoose";
import { User, hashPassword, comparePassword } from "../models/user.model.js";

export const createUserService = async (req, res) => {
    const { email, password, username } = req.body;


    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        return res.status(500).json({
            error: true,
            success: false,
            message: "User Already Exist"
        });
    }

    // Create new user
    const user = await User.create({
        email,
        password: await hashPassword(password),
        username
    });

    return user;
}

export const logInService = async (req, res) => {
    const { email, password} = req.body;


    const existingUser = await User.findOne({
        $or: [{ email }, { username :email}]
    });

    const isPasswordMatch = await comparePassword(password, existingUser.password)
    if (!isPasswordMatch) {
        return res.status(401).json({
            error: true,
            success: false,
            message: "Invalid Email or password"
        });
    }

    if (!existingUser) {
        return res.status(500).json({
            error: true,
            success: false,
            message: "Invalid Email or user"
        });
    }


    return existingUser;
}

export const logoutService = async (req, res) => {
    
}