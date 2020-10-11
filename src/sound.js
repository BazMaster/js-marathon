class Sound {
    constructor() {
        this.path = '/assets/audio/';
    }

    play = (name) => {
        const file = this.path + name + '.mp3';
        const audio = new Audio(file);
        audio.play();
    }

    hit = (player, enemy) => {
        if(player.selectors === 'player1') {
            if(enemy.hp.current <= 0) {
                this.play('lost');
            }
            else {
                this.play('hit_' + enemy.type);
            }
        }
        else {
            if(enemy.hp.current <= 0) {
                this.play('win');
            }
            else {
                this.play('hit_' + enemy.type);
            }
        }
    }

}

export default Sound;