import { userModel } from "../Model/userModel.js";

export const showAllUsers = async(req,res) => {
    try{
        const allUsers = await userModel.find();
        if(!allUsers) {
            res.status(400).json({
                success: false,
                message: "No Users listed"
            })
        } else {
             res.status(200).json({
                success: true,
                user: allUsers
            })
        }
    } catch(e) {
         res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
    }
}