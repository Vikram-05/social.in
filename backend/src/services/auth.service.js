import mongoose from "mongoose";
import { User, hashPassword, comparePassword } from "../models/user.model.js";

export const createUserService = async (req, res) => {
    const { email, password, username } = req.body;


    const existingEmail = await User.findOne({  email });
    const existingUsername = await User.findOne({  username });

    if (existingEmail) {
        return {
            error: true,
            success: false,
            message: "Email already exist"
        };
    }
    if (existingUsername) {
        return {
            error: true,
            success: false,
            message: "Username already exist"
        };
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
    

    if (!existingUser) {
        return {
            error: true,
            success: false,
            message: "Invalid Email or user"
        };
    }
    const isPasswordMatch = await comparePassword(password, existingUser.password)
    if (!isPasswordMatch) {
        return {
            error: true,
            success: false,
            message: "Invalid Email or password"
        };
    }

    return existingUser;
}

export const logoutService = async (req, res) => {
    
}