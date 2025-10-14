import User from "../models/User.js"
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js"
import Car from "../models/Car.js"

// register user 
export const registerUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password || password.length <8){
            return res.json({success:false, message:"missing details"})
        }

        const userExists = await User.findOne({email})

        if(userExists){
            return res.json({success:false, message:'user already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = await User.create({name, email, password:hashedPassword})
        
        const token = generateToken(user._id)
        res.json({success:true,user, token})

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

// login user
export const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body

        const user =await User.findOne({email})

        if(!user){
            return res.json({success:false, message:'no user exist with this email'})

        }

        const match =await bcrypt.compare(password, user.password)

        if(!match){
            return res.json({success:false, message:'invalid email or password'})
        }
        
        const token = generateToken(user._id)
        res.json({success:true, user, token})
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
        
    }
}

// get user data
export const getUserData = async (req, res)=>{
    try {
        const {user} = req; //const user = req.user; both same - assign the user property from req to a variable named user
        res.json({success:true, user})
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

// get all cars for frontend
export const getCars = async (req, res)=>{
    try {
        const cars = await Car.find({isAvailable: true})
        res.json({success:true, cars})  
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}