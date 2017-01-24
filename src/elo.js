exports.getRating = function (result, playerOneRating, playerTwoRating) {
    let qa = Math.pow(10, playerOneRating / 400);
    let qb = Math.pow(10, playerTwoRating / 400);

    let expectedResult = qa / (qa + qb);
    let expectedResultDifference = result - expectedResult;

    let newRating = playerOneRating + getKFactor(playerOneRating) * expectedResultDifference;

    return Math.round(newRating);
};

function getKFactor(rating) {
    if (rating < 2100) {
        return 32;
    } else if (rating < 2400) {
        return 24;
    }
    return 16;
}