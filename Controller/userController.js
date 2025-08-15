import { userModel } from "../Model/userModel.js";
import { validationSchema } from "../Validation/zodValidation.js";
import { ZodError } from "zod";
import { hashing } from "../Validation/passwordHash.js";

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

export const findUsersById = async(req,res) => {
    try{
        const {id} =  req.params;
        const userId = await userModel.findById(id);
    if(!userId){
        res.status(404).json({
            success: false,
            message: "No users found"
        })
    } else {
         res.status(200).json({
            success: true,
            user: userId
        })
    }
    } catch(e) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
    
}

export const createNewUsers = async(req,res) => {
    try{
        const validUser = validationSchema.parse(req.body);
        const passwordProtection = await hashing(validUser.password);

        const newUser = await userModel.create({
            ...validUser,
            password: passwordProtection
        });
        if(!newUser) {
            return res.status(404).json({
                success: false,
                message: "No Users created"
            })
        } else {
            res.status(201).json({
                success: true,
                user: newUser
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