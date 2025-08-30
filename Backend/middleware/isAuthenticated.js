import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"user not authenticated"});
        }
        const decoded=await jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        if(!decoded){
            return res.status(401).json({message:"Invalid Token"})
        }
        req.id=decoded.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;
const req = {
    id:"",
}
req.id = "sdlbgnjdfn"