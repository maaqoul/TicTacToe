
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
        displayControllerModule.displayPlayerName('first-player-label', firstPlayer.getName())
    });

    submitSecondPlayer.addEventListener('click', () => {
        const secondPlayerInput = document.getElementById('second-player');
        secondPlayer = playerFactory(secondPlayerInput.value, 'o');
        secondPlayerInput.disabled = true;
        displayControllerModule.displayPlayerName('second-player-label', secondPlayer.getName())
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
                displayControllerModule.displayWinner(firstColumn, firstPlayer, secondPlayer);
            }
        }

        // check for rows
        for (let i = 0; i <= 3; i++) {
            const firstColumn = board[i];
            const secondColumn = board[i + 3];
            const thirdColumn = board[i + 6];
            if (!!firstColumn && firstColumn === secondColumn && thirdColumn === secondColumn) {
                displayControllerModule.displayWinner(firstColumn, firstPlayer, secondPlayer);
            }
        }

        let firstColumn = board[0];
        let secondColumn = board[4];
        let thirdColumn = board[8];

        if (!!firstColumn && firstColumn === secondColumn && thirdColumn === secondColumn) {
            displayControllerModule.displayWinner(firstColumn, firstPlayer, secondPlayer);
        }

        firstColumn = board[2];
        secondColumn = board[4];
        thirdColumn = board[6];

        if (!!firstColumn && firstColumn === secondColumn && thirdColumn === secondColumn) {
            displayControllerModule.displayWinner(firstColumn, firstPlayer, secondPlayer);
        }
    }
    return { takeTurn, firstPlayer, secondPlayer, checkForWinner }
})()

const displayControllerModule = (function () {

    const columnElement = document.querySelectorAll('.column');
    const winner = document.getElementById('winner');

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

    function resetGame() {
        for (const column of columnElement) {
            column.innerText = '';
        }
        winner.innerHTML = '';
        GameBoardModule.resetBoard()
        console.log('i ve been clicked')
    }
    function displayPlayerName(id, name) {
        const firstPlayerLabel = document.getElementById(id);
        firstPlayerLabel.innerHTML = name
    }

    function displayWinner(player, firstPlayer, secondPlayer) {
        player.incrementScore();
        winner.innerHTML = `${player.getName()} is the winner <br> <button id=""> reset </button>`;
        displayPlayersScore(firstPlayer, secondPlayer);
    }

    function displayPlayersScore(firstPlayer, secondPlayer) {
        const firstPlayerScore = document.getElementById('first-player-score');
        const secondPlayerScore = document.getElementById('second-player-score');
        firstPlayerScore.innerHTML = firstPlayer?.getScore()
        secondPlayerScore.innerHTML = secondPlayer?.getScore()
    }

    return { displayPlayerName, displayPlayersScore, displayWinner }
})()


