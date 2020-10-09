import { pokemons } from "./pokemons";

class Sound {
    constructor() {
        this.path = '/assets/audio/';
    }

    play = (name) => {
        const file = this.path + name + '.mp3';
        const audio = new Audio(file);
        audio.play();
    }

    hit = (player) => {
        if(player.selectors === 'player1') {
            if(player.hp.current <= 0) {
                this.play('lost');
            }
            else {
                this.play('hit_' + player.type);
            }
        }
        else {
            setTimeout(() => {
                if(player.hp.current <= 0) {
                    this.play('win');
                }
                else {
                    this.play('hit_' + player.type);
                }
            }, 300);
        }
        const file = this.path + 'hit_' + player.type + '.mp3';
        const audio = new Audio(file);
        audio.play();
    }

}

export default Sound;