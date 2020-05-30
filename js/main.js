
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
    const board = ['', '', '', '', '', '', '', '', '']

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
    let toggleTurn = true;
    const submitFirstPlayer = document.getElementById('submit-first-player');
    const submitSecondPlayer = document.getElementById('submit-second-player');
    let firstPlayer;
    let secondPlayer;
    submitFirstPlayer.addEventListener('click', () => {
        const firstPlayerInput = document.getElementById('first-player');
        firstPlayer = playerFactory(firstPlayerInput.value, 'x');
        firstPlayerInput.disabled = true;
    });
    submitSecondPlayer.addEventListener('click', () => {
        const secondPlayerInput = document.getElementById('second-player');
        secondPlayer = playerFactory(secondPlayerInput.value, 'o');
        secondPlayerInput.disabled = true;
    });
    const board = GameBoardModule.getBoard()
    function takeTurn() {
        const currentPlayer = toggleTurn ? firstPlayer : secondPlayer;
        toggleTurn = !toggleTurn
        return currentPlayer
    }

    function checkForWinner() {

        // check for columns 
        for (let i = 0; i <= 8; i += 3) {
            const firstColumn = board[i];
            const secondColumn = board[i + 1];
            const thirdColumn = board[i + 2];
            if (!!firstColumn && firstColumn === secondColumn && thirdColumn === secondColumn) {
                alert(firstColumn.getName() + ' is the winner')
            }
        }

        // check for rows
        for (let i = 0; i <= 3; i++) {
            const firstColumn = board[i];
            const secondColumn = board[i + 3];
            const thirdColumn = board[i + 6];
            if (!!firstColumn && firstColumn === secondColumn && thirdColumn === secondColumn) {
                alert(firstColumn.getName() + ' is the winner')
            }
        }

        let firstColumn = board[0];
        let secondColumn = board[4];
        let thirdColumn = board[8];

        if (!!firstColumn && firstColumn === secondColumn && thirdColumn === secondColumn) {
            alert(firstColumn.getName() + ' is the winner')
        }

        firstColumn = board[2];
        secondColumn = board[4];
        thirdColumn = board[6];

        if (!!firstColumn && firstColumn === secondColumn && thirdColumn === secondColumn) {
            alert(firstColumn.getName() + ' is the winner')
        }
    }
    return { takeTurn, firstPlayer, secondPlayer, checkForWinner }
})()

const displayControllerModule = (function () {

    const columnElement = document.querySelectorAll('.column')

    for (const column of columnElement) {
        column.addEventListener('click', ({ target }) => {
            if (!(!!target.innerText)) {
                const index = Number(target.dataset.pos);
                const player = playFlowModule.takeTurn();
                target.innerText = player.getMark();
                if (!!target.innerText) {
                    GameBoardModule.addToBoard(index, player)
                    playFlowModule.checkForWinner()
                }
            }
        })
    }
})()


