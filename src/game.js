import Pokemon from "./pokemon";
import Sound from "./sound";
import { pokemons } from "./pokemons";
import { random, generateLog, countBtn } from "./utils";

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
            this.sound().play('start');
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

                const player1Damage = random(item.maxDamage, item.minDamage);
                const player2Damage = random(this.player2.attacks[0].maxDamage, this.player2.attacks[0].minDamage);
                const player1 = this.player1;
                const player2 = this.player2;

                this.player1.changeHP(player2Damage, function() {
                    generateLog(player1, player2, player2Damage);
                });
                this.player2.changeHP(player1Damage, function() {
                    setTimeout(() => {
                        generateLog(player2, player1, player1Damage);
                    }, 300);
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
        const type = document.getElementById('type-' + id);
        name.innerText = player.name;
        img.src = player.img;
        type.src = '/assets/type_' + player.type + '.png';
        type.title = player.type;
        console.log(player.img)

        player.elProgressbar.classList.remove('low');
        player.elProgressbar.classList.remove('critical');

        player.hp.current = player.hp.total;
        player.renderHP();
    }

    sound = () => {
        return new Sound();
    }
}

export default Game;