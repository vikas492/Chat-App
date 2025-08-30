import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const register =async (req, res) => {
    try{
        // console.log("Received from frontend:", req.body);

         const { fullname, username, password, confirmPassword, gender}=req.body;
         if(!fullname || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({message: "All fields are required"});
         }
            if(password !== confirmPassword){
                return res.status(400).json({message: "Passwords do not match"});
            }   
            const user = await User.findOne({ username });
            if(user){
                return res.status(400).json({message: "Username already exists"});
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
             const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
            await User.create({
                fullname,
                username,
                password: hashedPassword, 
                profilePhoto: gender === "male"? maleProfilePhoto : femaleProfilePhoto, 
                gender
            });
            return res.status(201).json({message: "User registered successfully",
                success: true
            });
    } catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({message: "Internal server error",
           
        });
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({ message: "User not found",
                success: false
             });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password",
                success: false
             });
        }
        const tokenData={
            userId: user._id,
           
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).cookie("token", token, {
        maxAge: 1*24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
    }).json({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        profilePhoto: user.profilePhoto
    });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const logout =  (req, res) => {
    try {
       
        return res.status(200).cookie("token","",{maxAge: 0}).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password") ;
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.error("Error in getting other user:", error);
    }
}