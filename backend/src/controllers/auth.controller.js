import { createUserService, logInService } from "../services/auth.service.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // Validation
        if (!email || !password || !username) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "All fields are required"
            });
        }

        // Create user
        const savedUser = await createUserService(req, res);

        //create toke
        const token = jwt.sign(
            { id: savedUser._id, email: savedUser.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );


        const option = {
            // httpOnly: true,
            // secure: true
        };
        return res.status(201).cookie("token", token, option).json({
            message: "User created successfully",
            success: true,
            error: false,
            token,
            data: {
                id: savedUser._id,
                email: savedUser.email,
                username: savedUser.username,
            }
        });

    } catch (error) {
        console.error("Error in createUser:", error);

        return res.status(500).json({
            error: true,
            success: false,
            message: "Internal server error"
        });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!password && !email ) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "All fields are required"
            });
        }

        // Create user
        const savedUser = await logInService(req, res);

        //create toke
        const token = jwt.sign(
            { id: savedUser._id, email: savedUser.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );

        const option = {
            // httpOnly: true,
            // secure: true
        };
        // Return success response
        return res.status(201).cookie('token', token, option).json({
            message: "User Login successfully",
            success: true,
            error: false,
            token,
            data: {
                id: savedUser._id,
                email: savedUser.email,
                username: savedUser.username,
            }
        });

    } catch (error) {
        console.error("Error in login user:", error);

        return res.status(500).json({
            error: true,
            success: false,
            message: "Internal server error"
        });
    }
}


export const logout = async (req, res) => {
    try{

        res.status(200).clearCookie("token").json({
            success:true,
            error : false,
            message :"logout successfully"
        })
    }catch(err){
        console.log("error in logout controller",err)
    }
}