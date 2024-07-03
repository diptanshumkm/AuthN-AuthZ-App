const User = require("../model/model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
require("dotenv").config();

exports.signUp = async (req, res) => {

    try {
        const {email, name, password, role} = req.body
        const existingUser = await User.findOne( {email} )

        if(existingUser){
            return res.status(400).json( {
                success: false,
                message: "User already exists",
            } )
        }

        // Secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10)
        } catch (error) {
            return res.staus(500).json({
                success: false,
                message: "Error in hashing password",
            })
        }

        const user = new User({
            email, name, password: hashedPassword, role
        })

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User created successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json( {
            success: false,
            message: "User cannot be registered, please try again later"
        } )
    }
}


exports.login = async (req, res) => {
    try {
        
    // Paarse data from req body
    const {email, password} = req.body;

    if( !email || !password ){
        return res.status(400).json({
            success: false,
            message: 'Please fill the details'
        })
    }

    let user = await User.findOne({email});

    if(!user){
        return res.status(401).json({
            success: false,
            message: 'User not found! Please signUp'
        })
    }

    const payload = {
        email: user.email,
        id: user._id,
        role: user.role
    };

    if (await bcrypt.compare(password, user.password)) {
        // password compare hogaya, generate JWT

        let token = jwt.sign( payload,  process.env.JWT_SECRET, {expiresIn: "2h"});

        // In the below line let user = user.toObject(), you are trying to declare a new variable user using let, which is not necessary and actually causes an issue. This is because the variable user is already declared earlier in the function.
        // By using let again, you are trying to redeclare the same variable within the same scope, which is not allowed in JavaScript. So,
        user = user.toObject()
        user.token = token;
        user.password = undefined;

        const option = {
            expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        return res.cookie( "diptanshuCookie", token, option ).status(200).json({
            success: true,
            message: 'user logged in successfully',
            token,
            user
        })

    } else {
        // Password match nhi hua
        return res.status(403).json({
            success: false,
            message: 'Incorrect password! Please try again'
        })


    }        
    } catch (error) {

        console.log(error)
        return res.status(403).json({
            success: false,
            message: 'Login error'
        })
        
    }


}