
const GameBoardModule = (function () {
    let board = [[], [], []];

    function getGameBoard() {
        return board;
    }

    function resetBoard() {
        board.length = 0;
    }

    function addMarktoBoard(row, column, mark) {
        board[row][column] = mark
        return board;
    }

    return { getGameBoard, resetBoard, addMarktoBoard }
})()



const displayControllerModule = (function () {



    return {}
})()



const playerFactory = function (name, mark) {
    let score = 0;

    function incrementScore() {
        return ++score;
    }

    function getScore() {
        return score;
    }

    function getName() {
        return name;
    };

    function getMark() {
        return mark;
    }

    return {
        getName,
        getMark,
        getScore,
        incrementScore
    }
}

const player1 = playerFactory('hicham', 'x')
const player2 = playerFactory('ahmed', 'o')
console.log('player 1 :', player1);