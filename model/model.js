const mongoose = require("mongoose");

const userSchema = new mongoose.Schema( {
    name: {
        type: String,  
        trim: true,
        required: true      
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password:{
        type: String,
        trim: true,
        required: true
    },
    role:{
        enum: ["Student", "Admin", "Visitor"],
        type: String,
    },
} )

module.exports = mongoose.model("User", userSchema)