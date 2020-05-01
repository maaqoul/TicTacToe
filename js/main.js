
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

const GameBoardModule = (function () {
    let board = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

    function getGameBoard() {
        return board;
    }

    function resetBoard() {
        board.length = 0;
    }

    return { getGameBoard, resetBoard }
})()



const displayControllerModule = (function () {

    let toggleTurn = true
    const player1 = playerFactory('hicham', 'x')
    const player2 = playerFactory('ahmed', 'o')

    function takeTurn() {
        const currentPlayer = toggleTurn ? player1 : player2;
        toggleTurn = !toggleTurn
        return currentPlayer
    }

    return { takeTurn }
})()



const columnElement = document.querySelectorAll('.column')

for (const column of columnElement) {
    column.addEventListener('click', ({ target }) => {
        if (target.innerText === '') {
            target.innerText = displayControllerModule.takeTurn().getMark();
        }
    })
}
