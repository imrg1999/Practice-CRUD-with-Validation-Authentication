import { validationSchema } from "../Validation/zodValidation.js";
import { ZodError } from "zod";
import { hashing } from "../Validation/passwordHash.js";
import { userModel } from "../Model/userModel.js";


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