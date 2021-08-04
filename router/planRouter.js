const express = require('express');
const { getplan, getspecificplan, patchplan, postplan, deleteplan, checkURL } = require('../controller/planController.js');
const fs = require('fs');
var plans = require('../data/plan.json');
let planRouter = express.Router();
// planRouter.param('id', checkID);
planRouter.route(['/', '/top5plans'])
    .get(checkURL, getplan)
    .post(postplan);
planRouter.route('/:id')
    .get( getspecificplan)
    .patch(patchplan)
    .delete(deleteplan);
module.exports = planRouter;
