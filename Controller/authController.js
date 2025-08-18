import { validationSchema } from "../Validation/zodValidation.js";
import { ZodError } from "zod";
import { hashing } from "../Validation/passwordHash.js";
import { userModel } from "../Model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const registerUser = async(req,res) => {
    try{
        const validatedUser = validationSchema.parse(req.body);

        const existingUser = await userModel.findOne({
            email: validatedUser.email
        });

        const safePassword = await hashing(validatedUser.password);

        if(existingUser) {
            return res.status(409).json({
                success: false,
                message: "Already Registered User"
            })
        } else {
            const newUser = await userModel.create({
                ...validatedUser,
                password: safePassword
            });
            
            return res.status(201).json({
                success: true,
                user: newUser,
                message: "New User Created Successfully"
            })
        }
    } catch(error) {
        if(error instanceof ZodError) {
            res.status(400).json({
                success: false,
                error: error.issues,
                message: "Invalid Input Data"
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
} 

export const login = async(req,res) => {
    try{
        const{email,password} = req.body;
        
        const user = await userModel.findOne({email});

        //checking whether the user already exists
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        };

        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Details"
            })
        }

        //JWT generation
        const token = jwt.sign({
            email: user.email
        }, process.env.JWT_SECRET, 
        {expiresIn: "1h"});

         res.status(200).json({
            message: "Login successful",
            token
        });
    }catch(error) {
        if(error instanceof ZodError) {
            res.status(400).json({
                success: false,
                error: error.issues,
                message: "No data found"
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
}

export const accessProfile = async(req,res) => {
    try{
        const userProfile = await userModel.findById(req.user.id).select("-password");

        if(!userProfile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            })
        } else {
            res.status(200).json({
                success: true,
                data: {
    id: userProfile._id,
    name: userProfile.name,
    email: userProfile.email,
    age: userProfile.age
    // data to be returned to the authorized user
  }
            })
        }
    }catch(error) {
         res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
    }
}