const plan = require("../model/planModel");
const jsonwebtokens = require('jsonwebtoken');
const { protectRoute } = require('../controller/authController')
const user = require('../model/userModel');
module.exports.viewHomePage = async (req, res) => {
  console.log('home')
  var result = plan.find();
  result = await result.limit(3);
  // console.log(result)
  res.status(201).render("home.pug", {
    title: "Home page",
    result
  });
};
module.exports.viewReset = async (req, res) => {
  // if (token == 'logout' || !token) {
  //   res.render('login.pug');
  // }
  // else {
  res.status(201).render('forgetPasswordConfirm.pug');
  // }

}
module.exports.updatePassword = (req, res) => {
  let token = req.cookies.jwt;
  if (token == 'logout' || !token) {
    res.render('login.pug');
  }
  else {
    res.render('updatePassword.pug');
  }

}
module.exports.register = (req, res) => {
  res.status(201).render('register.pug');
}

module.exports.forgetPassword = (req, res) => {

  // else {
  res.render('forgetPassword.pug')
  // }
}
module.exports.viewProfilePage = async (req, res) => {
  let token = req.cookies.jwt;
  if (token == 'logout' || !token) {
    res.render('login.pug');
  }
  else {
    let obj = jsonwebtokens.verify(token, "Secret Key");
    let data = await user.findById(obj.id);
    res.status(201).render("profile.pug", {
      title: "Profile Page",
      data
    });
  }


}
module.exports.viewLoginPage = (req, res) => {
  console.log("hello")
  res.status(201).render("login.pug", {
    title: "login page"
  });
};
module.exports.viewplansPage = async (req, res) => {
  // 1 Get Plan data from collection
  const plans = await plan.find();
  console.log(plans.length);
  // 2 Build Template
  // 3 Render that template
  res.status(201).render("_plan.pug", {
    title: "plan page",
    plans: plans
  });
};
