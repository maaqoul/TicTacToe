
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
function handleMark(row, column) {
    GameBoardModule.addMarktoBoard(row, column, 'x')
}
const displayController = (function () {
    function addMarkToBoard() {
        
    }
    function renderBoard() {
        const table = document.querySelector('#table');
        let boardTable = '';

        for (let i = 0; i < 3; i++) {
            boardTable += `<tr>`
            for (let j = 0; j < 3; j++) {
                boardTable += `<td  onclick="handleMark(${i}, ${j})">
            x
            </td>`
            }
            boardTable += `</tr>`
        }
        table.innerHTML = boardTable;
    }
    return { renderBoard }
})()



const createPlayer = function (name, mark) {
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



displayController.renderBoard();