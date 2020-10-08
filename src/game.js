class Game {
    constructor() {

    }

    startGame = () = {

    }

    resetGame = () = {
        const allButtons = document.querySelectorAll('.control .button');
        allButtons.forEach($item => $item.remove());
    }
}

export default Game;