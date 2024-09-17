const express=require("express")
const router=express.Router()
const auth = require('../middleware');

const {renderSignup,signup,login,renderLogin,dashboard,renderdashboard}=require("../controller/user")

router.get("/signup",renderSignup)
router.post("/signup",signup)

router.get("/login",renderLogin)
router.post("/login",login)

router.get("/dashboard",renderdashboard)
router.post("/dashboard",dashboard)

module.exports=router