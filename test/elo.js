let expect = require("chai").expect;
let elo = require("../src/elo");

const win = 1.0;
const draw = 0.5;
const loss = 0.0;

describe("Rating players based on expected results.", function () {
    describe("Two players drawing", function () {
        it("keeps them both the same rating if they were previously the same rating", function () {
            let playerOneRating = 1000;
            let playerTwoRating = 1000;

            let newPlayerOneRating = elo.getRating(draw, playerOneRating, playerTwoRating);
            let newPlayerTwoRating = elo.getRating(draw, playerTwoRating, playerOneRating);

            expect(newPlayerOneRating).to.equal(playerOneRating);
            expect(newPlayerTwoRating).to.equal(playerTwoRating);
        });
        it("decreases the rating of a higher rated player", function () {
            let playerOneRating = 1100;
            let playerTwoRating = 1000;

            let newPlayerOneRating = elo.getRating(draw, playerOneRating, playerTwoRating);
            expect(newPlayerOneRating).to.be.lessThan(playerOneRating);
        });
        it("increases the rating of a lower rated player", function () {
            let playerOneRating = 1100;
            let playerTwoRating = 1000;

            let newPlayerTwoRating = elo.getRating(draw, playerTwoRating, playerOneRating);
            expect(newPlayerTwoRating).to.be.greaterThan(playerTwoRating);
        });
    });

    describe("A player beating another", function (){
        it("increases the rating of the winning player", function(){
            let playerOneRating = 1000;
            let playerTwoRating = 1000;

            let newPlayerOneRating = elo.getRating(win, playerOneRating, playerTwoRating);
            expect(newPlayerOneRating).to.be.greaterThan(playerOneRating);
        });
        it("decreases the rating of the losing player", function(){
            let playerOneRating = 1000;
            let playerTwoRating = 1000;

            let newPlayerTwoRating = elo.getRating(loss, playerTwoRating, playerOneRating);
            expect(newPlayerTwoRating).to.be.lessThan(playerTwoRating);
        });
        it("increases the rating of the winning player by more if they beat a better rated opponent", function(){
            let playerRating = 1500;
            let lowerRatedPlayer = 1000;
            let higherRatedPlayer = 2000;

            let lowerRatedPlayerVictoryResult = elo.getRating(win, playerRating, lowerRatedPlayer);
            let higherRatedPlayerVictoryResult = elo.getRating(win, playerRating, higherRatedPlayer);
            expect(lowerRatedPlayerVictoryResult).to.be.lessThan(higherRatedPlayerVictoryResult);
        });
        it("decreases the rating of the losing player by less if they are beaten by a better Rrted opponent", function(){
            let playerRating = 1500;
            let lowerRatedPlayer = 1000;
            let higherRatedPlayer = 2000;

            let lowerRatedPlayerDefeatResult = elo.getRating(loss, playerRating, lowerRatedPlayer);
            let higherRatedPlayerDefeatResult = elo.getRating(loss, playerRating, higherRatedPlayer);
            expect(lowerRatedPlayerDefeatResult).to.be.lessThan(higherRatedPlayerDefeatResult);
        });
    });
    describe("Result reporting detail", function () {
        it("should not have decimal places", function () {
            let playerOneRating = 995;
            let playerTwoRating = 1005;

            let newPlayerOneRating = elo.getRating(draw, playerOneRating, playerTwoRating);

            expect(parseInt(newPlayerOneRating)).to.equal(newPlayerOneRating);
        });
    });
});