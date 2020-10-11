import Game from "./game.js";
import Sound from "./sound";

class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elLog = document.getElementById(`log-${name}`);
    }
}
class Pokemon extends Selectors {
    constructor({ id, name, hp, type, selectors, attacks = [], img = '' }) {
        super(selectors);

        this.id = id;
        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.attacks = attacks;
        this.img = img;
        this.selectors = selectors;

        this.renderHP();
    }

    changeHP = (count, enemy, cb) => {
        this.hp.current -= count;

        if(this.hp.current <= 0) {
            this.hp.current = 0;
            new Game().resetGame();
        }

        new Sound().hit(this, enemy);

        this.renderHP();
        cb && cb(count);
    }


    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife = () => {
        const { elHP, hp: { current, total } } = this;
        elHP.innerText = current + ' / ' + total;
    }

    renderProgressbarHP = () => {
        const { hp: { current, total }, elProgressbar } = this;
        const percent = current / (total / 100);
        elProgressbar.style.width = percent + '%';

        if(current < 60 && current > 20) {
            elProgressbar.classList.add('low');
        }
        else if(current < 20) {
            elProgressbar.classList.add('critical');
        }

    }

}

export default Pokemon;
