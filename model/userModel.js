const mongoose = require('mongoose');
const validator = require("validator");
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const DB = "mongodb+srv://rajk1121:Rajat1121@cluster0-chamy.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(DB, {
    useNewUrlParser: true
}).then(conn => {
    // console.log(conn.connection);
    console.log('Connnected to DataBase');


});

const UserSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
        validate: function abc(val) {
            var str = val.split(" ").join("");
            if (!validator.isAlpha(str)) {
                throw new Error("Name contains numerics");
            }

        }
    },
    roles: {
        type: String,
        enum: ["restaurant-owner", "cook", "user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: true,
        validate: function abc(val) {
            if (!validator.isLength(val, { min: 8, max: undefined })) {
                throw new Error("Passwordlength is too short. Should be minimum of 8 in length")
            }
        }
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: function abc(val) {
            console.log("2")
            if (val !== this.password) {

                throw new Error("Password does not match")
            }
        }
    },

    username: {
        type: String, required: true, unique: true,
        validate: function abc(val) {
            var str = val.split(" ").join("");
            if (!validator.isAlphanumeric(str)) {
                throw new Error("username is not alphanumeric");
            }

        }
    },
    email: {
        type: String, required: true, unique: true,
        validate: validator.isEmail
    },
    address: {
        street: { type: String, default: "ABCDEF" },
        suite: { type: String, default: "ABCDEFG" },
        city: {
            type: String,
            validate: function abc(val) {
                var str = val.split(" ").join("");
                if (!validator.isAlpha(str)) {
                    throw new error("city contains numerics")
                }

            },
            default: "Delhi"
        },
        zipcode: { type: Number },

    },
    phone: { type: Number, required: true },
    resetToken: String,
    ExpiresIn: Date

})
UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 8);
    console.log('Insode pre');
    next();
})
UserSchema.methods.abc = function () {
    // const crypto  =require('crypto')
    const cryptoToken = crypto.randomBytes(32).toString('hex');

    this.resetToken = crypto.createHash('sha256').update(cryptoToken).digest('hex');
    console.log(this.resetToken)
    this.ExpiresIn = Date.now() + 1000*60*7;
    return cryptoToken;
}
const UserModels = mongoose.model('UserModel', UserSchema);


module.exports = UserModels;