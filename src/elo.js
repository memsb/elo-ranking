exports.getRating = function (result, playerOneRating, playerTwoRating) {
    let expectedResult = 1 / (1 + Math.pow(10, (playerTwoRating - playerOneRating) / 400));
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