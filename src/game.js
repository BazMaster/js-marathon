import Pokemon from "./pokemon";
import ajaxData from "./ajax";
import Sound from "./sound";
import Log from "./log";
import { random, countBtn } from "./utils";

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

        $btn.addEventListener('click', async () => {
            this.sound().play('start');
            await this.getPlayers();
            await this.clearButtons();
            await this.showButtons();
            await this.renderPlayer(this.player1);
            await this.renderPlayer(this.player2);
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

            $btn.addEventListener('click', async () => {
                btnCount();

                const data = new ajaxData(this.player1.id, item.id, this.player2.id);
                const fight = await data.getData('fight');

                this.player2.changeHP(fight.kick.player1, this.player1,() => {
                    new Log().generateLog(this.player1, this.player2, fight.kick.player1);
                    this.animate(this.player1)
                });
                setTimeout(() => {
                    this.player1.changeHP(fight.kick.player2, this.player2,() => {
                        new Log().generateLog(this.player2, this.player1, fight.kick.player2);
                    });
                    this.animate(this.player2)
                }, 500);

            });
            this.control.appendChild($btn);
        });

    }

    getPlayers = async () => {
        console.log('getPlayers');
        const data = new ajaxData();
        const pokemons = await data.getData('pokemons');
        console.log('pokemons: ', pokemons);
        const len = pokemons.length - 1;
        const player1 = pokemons[random(len)];
        const player2 = pokemons[random(len)];

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

        const $hp = document.querySelectorAll('.hp');
        $hp.forEach($item => $item.classList.remove('hidden'));

        player.hp.current = player.hp.total;
        player.renderHP();
    }

    sound = () => {
        return new Sound();
    }

    animate = (player) => {
        console.log('ANIMATE');
        const typeEl = document.getElementById('type-' + player.selectors);
        const effect = 'wobble';
        const class_name = 'animate__' + effect;
        typeEl.classList.add(class_name);
        setTimeout(() => {
            typeEl.classList.remove(class_name);
        }, 200);
    }

}

export default Game;