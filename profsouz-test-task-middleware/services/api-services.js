function randomNumber(minValue, maxValue) {

    const responseObject = {httpStatusCode: 500, randomNumber: NaN}

    if (!minValue || !maxValue || minValue < -1000 || maxValue > 1000) {
        return {...responseObject, httpStatusCode: 500, randomNumber: NaN}
    }

    let randomNumber = Math.floor(Math.random() * maxValue) + minValue;
    return {...responseObject, httpStatusCode: 200, randomNumber: randomNumber};
}

module.exports = {randomNumber};