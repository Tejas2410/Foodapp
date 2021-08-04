const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const userModel = require('../model/userModel');
const sendEmail = require('../utility/email');
const signIn = async (req, res) => {
    try {
        var data = req.body;
        if (!data.email || !data.password) {

            res.end('Information Not Available');
        }
        var dbdata = await userModel.findOne({
            email: data.email
        });

        if (!dbdata) {
            res.send('pwnwvpwvw')
            res.end("User Not Found");
        }

        var ans = await bcrypt.compare(data.password, dbdata.password);
        if (!ans) {
            res.end("Password Incorrect");
        }
        var token = jsonwebtoken.sign({ id: dbdata._id }, "Secret Key", { expiresIn: "1h" });

        res.cookie("jwt", token, { "httpOnly": true }, { expires: new Date(Date.now()) });

        res.status(201).json({
            status: "Logged In",
            token
        })
    }
    catch (err) {
        // console.log(err)
        res.status(404).json({
            err: err
        })
    }


}
const signUp = async (req, res) => {
    try {
        var data = req.body;
        if (!data.email || !data.password) {
            res.status(404).json({
                status: "Invalid Creds"
            })
        }
        var result = await userModel.create(data);
        var token = jsonwebtoken.sign({ id: result._id }, "Secret Key", { expiresIn: "1d" });
        res.cookie("jwt", token, { "httpOnly": true })
        let url = "https://google.com"

        await new sendEmail(result, url).sendWelcome();
        res.status(201).json({
            status: "Registration Successfull",
            token
        })

    }
    catch (err) {
        res.send(err)
    }
}
const isLogged = async (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            let token = req.cookies.jwt;
            // console.log('inside isLo')
            const obj = await jsonwebtoken.verify(token, "Secret Key");
            let user = await userModel.findById(obj.id);
            res.locals.users = user;

            // console.log(user)


            next();
        }
        else {
            next();
        }
    }
    catch{
        console.log('islogged')
        next();
    }

}
const protectRoute = async (req, res, next) => {

    try {
        //  console.log(token)
        var token = req.cookies.jwt;
        console.log(req.cookies);

        if (token == 'logout' || !token) {
            // res.send('Not logged In')
            next();
            console.log('tokens')
            // throw err;
        } else {
            console.log('******')
            var decoded = jsonwebtoken.verify(token, "Secret Key");
            if (!decoded) {
                res.send("token doesn't exist");

            }
            // console.log(decoded)

            var dbdata = await userModel.findById(decoded.id);
            if (!dbdata) {
                res.end("User doesn't exist");
            }
            req.headers.user = dbdata;
            res.locals.user = dbdata;
            req.headers.roles = dbdata.roles;

            next();
        }

    }
    catch (err) {
        res.status(404).json({
            status: "Authorization Failed",
            error: err
        })
    }

}
const authorize = (...arg) => {
    return (req, res, next) => {
        if (arg.includes(req.headers.roles)) {
            next();
        }
        else {
            res.status(404).json({
                status: "Not permitted",

            })
        }
    }
}
const forgotPassword = async (req, res) => {
    const email = req.body.email;

    // res.cookie('email', email, { "httpOnly": true }, { expires: new Date(Date.now()) + 20000 });
    // console.log(req.body)
    // console.log('aiwwfow')
    // console.log(email)
    var dbdata = await userModel.findOne({ 'email': email });
    if (!dbdata) {
        res.status(404).json({
            status: "Not Found"
        })
    }
    else {
        // console.log(dbdata)
        const token = dbdata.abc();
        const test = await userModel.updateOne({ "email": email }, dbdata, { new: true });
        res.status(201).send({ test });
        let url = req.protocol + '://' + req.get('host') + "/resetPassword?id=" + dbdata.email + "&token=" + token;
        console.log(url)
        // let url="https://google.com"
        // sendEmail(options);
        await new sendEmail(dbdata, url).sendForgot();
    }
}
const updatePassword = async (req, res) => {
    try {
        let user = req.headers.user;
        let dbPassword = user.password;
        let currPass = req.body.currPass;
        let newPass = req.body.newPass;
        let confirmPass = req.body.confirmPass;
        let ans = await bcrypt.compare(currPass, dbPassword);
        if (!ans) {
            res.status(404).json({
                status: 'Current Password does not match'
            })
        }
        else {
            if (newPass != confirmPass) {
                res.status(404).json({
                    status: "Password Doesn't match"
                })
            }
            else {
                user.password = newPass;
                user.confirmPassword = confirmPass;
                await user.save();
                console.log('After')
                res.send("Password Updated")
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}
const resetPassword = async (req, res) => {
    let daten = new Date(Date.now());
    let token = req.query.token;
    let id = req.query.id;
    let dbdata = await userModel.findOne({ 'email': id });
    if (!dbdata) {
        res.status(404).send("User Not Found")
    }
    else {
        console.log(dbdata.ExpiresIn);
        if (dbdata.ExpiresIn <= daten) {
            console.log('*************')
            res.status(404).json({
                status: "Token Expired"
            })
        } else {

            let password = req.body.password;
            let confirmPassword = req.body.confirmPassword;
            if (password != confirmPassword) {
                res.status(404).send("Password Doesn't Match")
            }
            else {

                let hashToken = crypto.createHash('sha256').update(token).digest('hex');
                if (dbdata.resetToken != hashToken) {
                    res.status(404).json("Token Invalid")
                }
                else {
                    dbdata.password = password;
                    dbdata.confirmPassword = confirmPassword;
                    console.log("hello")

                    dbdata.resetToken = undefined;
                    dbdata.ExpiresIn = undefined;
                    await dbdata.save()

                    res.status(201).json({
                        status: "Done"
                    })
                }

            }
        }
    }
}
const protect = async (req, res, next) => {
    try {
        //  console.log(token)
        var token = req.cookies.jwt;
        console.log("auth******");
        console.log(req.cookies);
        console.log("auth*****")
        // var decoded = jsonwebtoken.verify(token, "Secret Key");
        // if (!decoded) {
        //     res.send("token doesn't exist");

        // }
        // console.log(decoded)

        // var dbdata = await userModel.findById(decoded.id);
        // console.log(dbdata)
        // if (!dbdata) {
        //     res.end("User doesn't exist");
        // }
        // req.user = dbdata;
        // req.headers.roles = dbdata.roles;
        // console.log(dbdata)
        // console.log(req.headers.roles)
        next();

    }
    catch (err) {
        res.status(404).json({
            status: "Authorization Failed",
            error: err
        })
    }

}

module.exports = { signIn, signUp, protect, protectRoute, isLogged, authorize, forgotPassword, resetPassword, updatePassword };