const express = require('express');
const fs = require('fs');
const planRouter = require('./router/planRouter.js');
const userRouter = require('./router/userRouter.js');
const bookingRouter = require('./router/bookingRouter');
const app = express();
const cors = require('cors');
const viewRouter = require('./router/viewRouter');
const cookieParser = require('cookie-parser');
const rateLimitter = require('express-rate-limit');
const slowDown = require('express-slow-down');
const xss = require('xss-clean');
const expressSanitizer = require('express-mongo-sanitize');
const helmet = require('helmet');

const limiter = rateLimitter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 100, // allow 100 requests per 15 minutes, then...
    delayMs: 500 // begin adding 500ms of delay per request above 100:
    // request # 101 is delayed by  500ms
    // request # 102 is delayed by 1000ms
    // request # 103 is delayed by 1500ms
    // etc.
});

app.use(express.json())
app.set("view engine", "pug");
app.set("views", "template");
app.use(express.static('public'))
app.use(helmet());
app.use(speedLimiter);
app.use(limiter);
app.use(expressSanitizer());
app.use(xss());
app.use(cookieParser());
app.use(cors());
app.use('/', viewRouter);
app.use('/api/plans', planRouter);
app.use('/api/user', userRouter);
app.use('/api/bookings', bookingRouter);

app.get('*', (req, res) => {
    res.status(404).send("Error 404 Not Found");
    res.end();
})
module.exports = app;

