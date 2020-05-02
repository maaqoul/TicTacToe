
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
    const board = ['', '', '', '', '', '', '', '']

    function addToBoard(index, player) {
        board[index] = player
    }

    function resetBoard() {
        board.length = 0;
    }

    function getBoard() {
        return board;
    }

    function getBoardLength() {
        return board.length
    }

    return { addToBoard, resetBoard, getBoardLength, getBoard }
})()


const playFlowModule = (function () {
    let toggleTurn = true
    const firstPlayer = playerFactory('hicham', 'x');
    const secondPlayer = playerFactory('ahmed', 'o');
    function takeTurn() {
        const currentPlayer = toggleTurn ? firstPlayer : secondPlayer;
        toggleTurn = !toggleTurn
        return currentPlayer
    }

    function checkForWinner() {
        // check for vertical rows
        for (let i = 0; i < 4; i + 3) {
            const firstColumn = GameBoardModule.getBoard()[i];
            const secondColumn = GameBoardModule.getBoard()[i + 1];
            const thirdColumn = GameBoardModule.getBoard()[i + 2];
            if (typeof firstPlayer !== '' && firstColumn === secondColumn && secondColumn === thirdColumn) {
                console.log(firstPlayer)
            }
        }
    }
    return { takeTurn, player1: firstPlayer, player2: secondPlayer, checkForWinner }
})()

const displayControllerModule = (function () {

    const columnElement = document.querySelectorAll('.column')

    for (const column of columnElement) {
        column.addEventListener('click', ({ target }) => {
            if (target.innerText === '') {
                const index = Number(target.dataset.pos);
                const player = playFlowModule.takeTurn();
                console.log(index)
                target.innerText = player.getMark();
                if (GameBoardModule.getBoard()[index] === undefined) {
                    GameBoardModule.addToBoard(index, player)
                }
                // playFlowModule.checkForWinner()
            }
        })
    }
})()


