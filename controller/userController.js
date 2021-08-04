const mongoose = require('mongoose');
const userModel = require('../model/userModel.js');
const logout = async (req, res, next) => {
    res.cookie('jwt', "logout", {
        expires: new Date(Date.now() * 20)
    })
    res.status(201).send("User Logged Out");
}
const getuser = async function (req, res) {
    try {
        let reqObj = { ...req.query };
        let ExcludeFromQuery = ['fields', 'page', 'sort', 'limit'];
        for (let i = 0; i < ExcludeFromQuery.length; i++) {
            delete reqObj[ExcludeFromQuery[i]];
        }
        console.log("user****")
        console.log(req.cookies);
        console.log("user****")
        // console.log("jvunjiu")
        let limit = +req.query.limit || 2;
        let skip = limit * ((req.query.page - 1) || 1) || 0;
        let queryString = JSON.stringify(reqObj);
        queryString = queryString.replace(/\bgt|lt|gte|lte\b/g, function (match) {
            return '$' + match;
        })
        // console.log(queryString)
        reqObj = JSON.parse(queryString);
        // if (req.query.fields) {
        //     var proj = {};

        //     var fields = req.query.fields.split(",");

        //     for (let i = 0; i < fields.length; i++) {
        //         proj[fields[i]] = true
        //     }
        // }

        let result = userModel.find(reqObj);
        if (req.query.sort) {

            result = result.sort(-req.query.sort);
        }

        result = result.limit(limit).skip(skip);


        if (req.query.fields) {
            var proj = "";

            var fields = req.query.fields.split(",");
            proj = fields.join(" ");
        } else {
            proj = "-__v";
        }
        result = await result.select(proj);
        // result = await result;
        res.status(201).json({
            status: "Found",
            results: result
        })
    }
    catch (err) {
        res.status(404).json({
            status: "Failed",
            result: err
        })
    }

}


const getspecificuser = async function (req, res) {
    try {
        const ide = req.params.id;
        var result = await userModel.findById(ide)

        res.status(201).json({
            status: "Found",
            results: result
        })



    }
    catch (err) {

        res.status(404).json({
            status: "Error",
            result: err
        })


    }

}
const postuser = function (req, res) {

    userModel.create(req.body).then(doc => {
        res.status(201).json({
            status: "Done",
            result: doc
        })
    }).catch(err => {
        res.status(404).json({
            status: "Failed",
            result: err
        })
    })
}




const patchuser = async function (req, res) {
    try {
        const ide = req.params.id;
        const update = req.body;
        var result = await userModel.findByIdAndUpdate(ide, update, { new: true })


        res.status(201).json({
            status: "Updated",
            results: result
        })

    }
    catch (err) {

        res.status(404).json({
            status: "Could Not Updated",
            result: err
        })

    }


}
const deleteuser = async function (req, res) {
    try {
        const ied = req.params.id;
        var result = await userModel.findByIdAndDelete(ied)


        res.status(201).json({
            status: "Deleted",
            results: result
        })
    }

    catch (err) {
        res.status(404).json({
            status: "Could Not Delete",
            result: err
        })
    }


}



module.exports = { getuser, getspecificuser, postuser, patchuser, deleteuser, logout };