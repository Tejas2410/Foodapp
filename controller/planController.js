const PlanModels = require('../model/planModel');
const deleteplan = async function (req, res) {
    try {
        const ied = req.params.id;
        var result = await PlanModels.findByIdAndDelete(ied)


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





const patchplan = async function (req, res) {
    try {
        const ide = req.params.id;
        const update = req.body;
        var result = await PlanModels.findByIdAndUpdate(ide, update, { new: true })


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

const postplan = async function (req, res) {

    PlanModels.create(req.body).then(doc => {
        res.status(201).json({
            status: "done",
            result: doc

        })
    }).catch(err => {
        res.status(404).json({
            status: "Couldn't Post",
            result: err
        })
    })

}


const getplan = async function (req, res) {
    try {
        let reqObj = { ...req.query };
        console.log(req.query)
        let ExcludeFromQuery = ['fields', 'page', 'sort', 'limit'];
        for (let i = 0; i < ExcludeFromQuery.length; i++) {
            delete reqObj[ExcludeFromQuery[i]];
        }
        let limit = +req.query.limit || 2;
        let skip = limit * ((req.query.page - 1) || 0) || 0;

        // console.log(skip)

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

        let result = PlanModels.find(reqObj);
        if (req.query.sort) {
            let reqObj = "";
            let sortString = req.query.sort.split(",");
            // console.log(sortString)
            reqObj = sortString.join(" ")

            // console.log(reqObj)
            // console.log('hello')
            result = result.sort(reqObj);
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
        // console.log('hello')
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
const checkURL = function (req, res, next) {
    if (req.url == '/top5plans') {
      //  console.log(req.query);
        req.query.sort = 'price,ratingsAverage';
        req.query.fields = 'name,description,ratingAverage';
        req.query.limit = 5;

    }
    next();
}
const getspecificplan =
    async function (req, res) {
        try {
            const ide = req.params.id;
            console.log(ide)
            var result = await PlanModels.findById(ide)
            console.log(result)
            res.status(201).json({
                "status": "Found",
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



module.exports = { getplan, getspecificplan, patchplan, deleteplan, postplan, checkURL };