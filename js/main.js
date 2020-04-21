const GameBoard = (function(){})()

const createPlayer = function (name) {
    let score = 0;

    const incrementScore = function () {
        return ++score;
    }

    const getScore = function () {
        return score
    }

    const getName = function () {
        return name;
    }

    return {
        getName,
        getScore,
        incrementScore
    }
}