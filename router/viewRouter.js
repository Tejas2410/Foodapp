const express = require("express");
const { viewHomePage, viewLoginPage, viewReset, viewplansPage, viewProfilePage, forgetPassword, updatePassword, register } = require("../controller/viewController");
const { protectRoute, isLogged } = require('../controller/authController')
const viewRouter = express.Router();
// viewRouter.use(isLogge/d);
viewRouter.get("/", isLogged, viewHomePage);
viewRouter.get("/profile", protectRoute, viewProfilePage)
viewRouter.get('/resetPassword', protectRoute, viewReset);
viewRouter.get('/forgetPassword', protectRoute, forgetPassword);
viewRouter.get('/updatePassword', protectRoute, updatePassword);
viewRouter.get('/register', register);
// viewRouter.get('/updateProfile', viewUpdateProfile)
viewRouter.get("/login", viewLoginPage);
viewRouter.get("/plans", protectRoute, viewplansPage)
module.exports = viewRouter;