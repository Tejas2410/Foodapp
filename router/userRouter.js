const express = require('express');
var user = require('../data/user.json');
const fs = require('fs');
var { getuser, getspecificuser, postuser, patchuser, deleteuser, logout } = require('./../controller/userController.js')
var { signIn, signUp, protectRoute, authorize, forgotPassword, resetPassword, updatePassword, } = require("../controller/authController");
let userRouter = express.Router();
// userRouter.param('id', checkID);
userRouter.route('/')
    .get(protectRoute, getuser)
    .post(protectRoute, authorize("restaurant-owner", "admin"), postuser);
userRouter.route("/signin")
    .post(signIn);

userRouter.route('/signup').post(signUp);
userRouter.route('/logout').get(logout)
userRouter.route('/forgetPassword').post(forgotPassword);
userRouter.route('/resetPassword').patch(resetPassword);
userRouter.route('/updatePassword').patch(protectRoute, updatePassword)
userRouter.route('/:id')
    .get(getspecificuser)
    .patch(protectRoute, authorize("restaurant-owner", "admin"), patchuser)
    .delete(protectRoute, authorize("restaurant-owner", "admin"), deleteuser);
module.exports = userRouter;