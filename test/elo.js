let expect = require("chai").expect;
let elo = require("../src/elo");

const win = 1.0;
const draw = 0.5;
const loss = 0.0;

describe("Ranking players based on expected results.", function () {
    describe("Two players drawing", function () {
        it("keeps them both the same rank if they were previously the same rank", function () {
            let playerOneRank = 1000;
            let playerTwoRank = 1000;

            let newPlayerOneRank = elo.getRank(draw, playerOneRank, playerTwoRank);
            let newPlayerTwoRank = elo.getRank(draw, playerTwoRank, playerOneRank);

            expect(newPlayerOneRank).to.equal(playerOneRank);
            expect(newPlayerTwoRank).to.equal(playerTwoRank);
        });
        it("decreases the rank of a higher ranked player", function () {
            let playerOneRank = 1100;
            let playerTwoRank = 1000;

            let newPlayerOneRank = elo.getRank(draw, playerOneRank, playerTwoRank);
            expect(newPlayerOneRank).to.be.lessThan(playerOneRank);
        });
        it("increases the rank of a lower ranked player", function () {
            let playerOneRank = 1100;
            let playerTwoRank = 1000;

            let newPlayerTwoRank = elo.getRank(draw, playerTwoRank, playerOneRank);
            expect(newPlayerTwoRank).to.be.greaterThan(playerTwoRank);
        });
    });

    describe("A player beating another", function (){
        it("increases the rank of the winning player", function(){
            let playerOneRank = 1000;
            let playerTwoRank = 1000;

            let newPlayerOneRank = elo.getRank(win, playerOneRank, playerTwoRank);
            expect(newPlayerOneRank).to.be.greaterThan(playerOneRank);
        });
        it("decreases the rank of the losing player", function(){
            let playerOneRank = 1000;
            let playerTwoRank = 1000;

            let newPlayerTwoRank = elo.getRank(loss, playerTwoRank, playerOneRank);
            expect(newPlayerTwoRank).to.be.lessThan(playerTwoRank);
        });
        it("increases the rank of the winning player by more if they beat a better ranked opponent", function(){
            let playerRank = 1500;
            let lowerRankedPlayer = 1000;
            let higherRankedPlayer = 2000;

            let lowRankPlayerVictoryResult = elo.getRank(win, playerRank, lowerRankedPlayer);
            let highRankPlayerVictoryResult = elo.getRank(win, playerRank, higherRankedPlayer);
            expect(lowRankPlayerVictoryResult).to.be.lessThan(highRankPlayerVictoryResult);
        });
        it("decreases the rank of the losing player by less if they are beaten by a better ranked opponent", function(){
            let playerRank = 1500;
            let lowerRankedPlayer = 1000;
            let higherRankedPlayer = 2000;

            let lowRankPlayerDefeatResult = elo.getRank(loss, playerRank, lowerRankedPlayer);
            let highRankPlayerDefeatResult = elo.getRank(loss, playerRank, higherRankedPlayer);
            expect(lowRankPlayerDefeatResult).to.be.lessThan(highRankPlayerDefeatResult);
        });
    });
    describe("Result reporting detail", function () {
        it("should not have decimal places", function () {
            let playerOneRank = 995;
            let playerTwoRank = 1005;

            let newPlayerOneRank = elo.getRank(draw, playerOneRank, playerTwoRank);

            expect(newPlayerOneRank).to.equal(1001);
        });
    });
});