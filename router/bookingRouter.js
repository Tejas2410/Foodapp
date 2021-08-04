const express = require('express');
const bookingRouter = express.Router();
const { protectRoute } = require('../controller/authController');
const { getCheckout } = require('../controller/bookingController')
bookingRouter.route('/checkout-session/:id').get(protectRoute, getCheckout);
module.exports = bookingRouter;