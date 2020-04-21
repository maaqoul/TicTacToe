
const GameBoardModule = (function () {
    const board = [];

    function getGameBoard() {
        return board;
    }
    function resetBoard() {
        board.length = 0;
    }
    function addMarktoBoard(row, column, mark) {
        board[row][column] = mark;
        return board;
    }
    return { getGameBoard, resetBoard, addMarktoBoard }
})()

const displayCounter = (function () { })()


const createPlayer = function (name) {
    let score = 0;

    function incrementScore() {
        return ++score;
    }

    function getScore() {
        return score
    }

    function getName() {
        return name;
    }

    return {
        getName,
        getScore,
        incrementScore
    }
}