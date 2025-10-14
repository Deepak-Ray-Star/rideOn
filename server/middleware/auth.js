import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async(req, res, next)=>{
    const token = req.headers.token; // authorization likhte to token ki jagah  authorisation likhna parta key me of postman

    if(!token){
        return res.json({success:false, message:"not authorized"})
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded || !decoded.id){
            return res.json({success:false, message:'not authorized'})
        }

        req.user = await User.findById(decoded.id).select("-password")

        if(!req.user){
            return res.json({success:false, message:'user not found'})

        }

        next();
        
    } catch (error) {
        return res.json({success:false, message:'not authorized'})
        
    }
}

