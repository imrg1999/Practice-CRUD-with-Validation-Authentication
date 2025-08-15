import { userModel } from "../Model/userModel.js";

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