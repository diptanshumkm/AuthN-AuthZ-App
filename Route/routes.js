const express = require("express");
const router = express.Router()
const {signUp, login} = require('../controller/signUp');
const {auth, isStudent, isAdmin} = require('../middleware/Auth')

router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for Test"
    })
})
router.get("/isStudent", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for Students"
    })
})
router.get("/isAdmin", auth, isAdmin, (req,res) =>{
    res.json({
        success: true,
        message: "Welcome to the protected route for Admin"
    })
} )
router.post("/signup", signUp)
router.post("/login", login)

module.exports = router;
