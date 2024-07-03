const jwt = require('jsonwebtoken')
require("dotenv").config()


exports.auth = (req, res, next) => {

    try {

        const token = req.body.token;

    if(!token){
        return res.status(400).json({
            success: false,
            message: "Missing Token!"
        })
    }

    try {
        // Verify the token
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = payload
        console.log(payload, req.user)

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Sorry, invalid token!"
        })
    }

    next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while verifying the token'
        })
    }
    
}
exports.isStudent = (req,res,next) => {

    try {
        
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success:false,
                message:'This is a not a protected route for students'
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success:false,
                message:'This is a not a protected route for Admin'
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}