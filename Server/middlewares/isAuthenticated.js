import jwt from "jsonwebtoken";

export const isAuthenticated = (req,res,next)=>{
    const token = req.cookies.token;
    try {
        const verifyToken = jwt.verify(token , process.env.jwtSecret);
        if(!verifyToken){
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            })
        }
        const userId = verifyToken.userId;
        req.id = userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message:"User not authenticated",
                success:false
        })
    }
}