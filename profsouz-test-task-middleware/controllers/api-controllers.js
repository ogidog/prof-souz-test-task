const ApiService = require("../services/api-services");


function randomNumber(req, res) {
    const responseObject = ApiService.randomNumber(+req.query.minvalue, +req.query.maxvalue)

    res.status(responseObject.httpStatusCode).send({randomNumber: responseObject.randomNumber});
}

module.exports = {randomNumber};