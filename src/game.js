import Pokemon from "./pokemon.js";
import { pokemons } from "./pokemons.js";
import { random, generateLog, countBtn } from "./utils.js";

class Game {
    constructor() {
        this.control = document.querySelector('.control');        
    }

    startGame = () => {
        console.log('startGame');
        let health1 = document.getElementById('health-player1');
        let health2 = document.getElementById('health-player2');
        health1.innerText = '100 / 100';
        health2.innerText = '100 / 100';

        this.clearButtons();

        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = 'Начать игру';

        $btn.addEventListener('click', () => {
            this.getPlayers();
            this.clearButtons();
            this.showButtons();
            this.renderPlayer(this.player1);
            this.renderPlayer(this.player2);
        });

        this.control.appendChild($btn);
    }

    resetGame = (next = null) => {
        console.log('resetGame');
        this.clearButtons();
        this.startGame();
    }

    clearButtons = () => {
        console.log('clearButtons');
        let buttons = document.querySelectorAll('.control .button');
        buttons.forEach($item => $item.remove());
    }
    
    showButtons = () => {
        console.log('showButtons');
        this.player1.attacks.forEach(item => {
            const $btn = document.createElement('button');
            $btn.classList.add('button');
            $btn.innerText = item.name;
            const btnCount = countBtn(item.maxCount, $btn);

            $btn.addEventListener('click', () => {
                btnCount();

                let player1Damage = random(item.maxDamage, item.minDamage);
                let player2Damage = random(this.player2.attacks[0].maxDamage, this.player2.attacks[0].minDamage);
                let player1 = this.player1;
                let player2 = this.player2;

                if(this.player1.hp.current === 0 || this.player2.hp.current === 0) {
                    this.resetGame();
                }

                this.player1.changeHP(player2Damage, function(count) {
                    generateLog(player1, player2, player2Damage);
                });
                this.player2.changeHP(player1Damage, function(count) {
                    generateLog(player2, player1, player1Damage);
                });

            });
            this.control.appendChild($btn);
        });

    }

    getPlayers = () => {
        let len = pokemons.length - 1;
        let player1 = pokemons[random(len)];
        let player2 = pokemons[random(len)];

        this.player1 = new Pokemon({
            ...player1,
            selectors: 'player1',
        })
        this.player2 = new Pokemon({
            ...player2,
            selectors: 'player2',
        })
    }

    renderPlayer = (player) => {
        console.log('renderPlayer', player);
        const id = player.selectors;
        const name = document.getElementById('name-' + id);
        const img = document.getElementById('img-' + id);
        name.innerText = player.name;
        img.src = player.img;
        console.log(player.img)

        player.elProgressbar.classList.remove('low');
        player.elProgressbar.classList.remove('critical');

        player.hp.current = player.hp.total;
        player.renderHP();
    }
}

export default Game;