import jwt from 'jsonwebtoken';


const authMiddleware = async(req,res,next) => {
    //Checking Authorization prop in request http header
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token, Authorization Denied!"
        })
    };

    try {const token = authHeader.split(' ')[1]; //Taking out the token from the bearer
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    //decoding the token using the secret key, it'll create js object with user info
    req.user = decoded;
    //requesting user if authorized can access their profile data
    next();
} catch(error) {
    return res.status(401).json({
        success: false,
        message: "Unauthorized"
    });
}   
    
}