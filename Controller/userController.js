import { userModel } from "../Model/userModel.js";
import { validationSchema } from "../Validation/zodValidation.js";
import { ZodError } from "zod";

export const showAllUsers = async(req,res) => {
    try{
        const allUsers = await userModel.find();
        if(allUsers.length === 0) {
           return res.status(404).json({
                success: false,
                message: "No Users listed"
            })
        } else {
             res.status(200).json({
                success: true,
                users: allUsers
            })
        }
    } catch(e) {
         res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: e.message
            });
    }
}

export const createNewUsers = async(req,res) => {
    try{
        const validUser = validationSchema.parse(req.body);

        const newUser = await userModel.create({
            ...validUser
        });
        if(!newUser) {
            return res.status(404).json({
                success: false,
                message: "No Users created"
            })
        } else {
            res.status(200).json({
                success: true,
                user: newuser
            })
        }
    }catch(e) {
        if(e instanceof ZodError) {
             return res.status(400).json({
                success: false,
                error: e.issues
            })
        } else {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
}