function randomNumber(minValue, maxValue) {

    const responseObject = {httpStatusCode: 400, randomNumber: NaN}

    if (!minValue || !maxValue || minValue < -1000 || maxValue > 1000) {
        return responseObject;
    }

    let randomNumber = Math.floor(Math.random() * maxValue) + minValue;
    return {...responseObject, httpStatusCode: 200, randomNumber: randomNumber};
}


module.exports = {randomNumber};