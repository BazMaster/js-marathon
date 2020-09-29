const $btn_kick = document.getElementById('btn-kick');
const $btn_flash = document.getElementById('btn-flash');

const character = {
    name: 'Pikachu',
    defaultHP: 200,
    damageHP: 200,
    progress: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}

const enemy = {
    name: 'Charmander',
    defaultHP: 200,
    damageHP: 200,
    progress: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}

init();

function init() {
    character.renderHP();
    enemy.renderHP();
}

$btn_kick.addEventListener('click', function () {
    clickBtn(20);
})
$btn_flash.addEventListener('click', function () {
    clickBtn(100);
})

function clickBtn(num) {
    character.changeHP(random(num));
    enemy.changeHP(random(num));
}

function changeHP(count) {
    let progress;
    progress = count / this.defaultHP * 100;
    progress = this.progress - Math.ceil(progress);

    if(this.damageHP < count) {
        this.damageHP = 0;
        progress = 0;
        alert('Бедный ' + this.name + ' проиграл бой!');
        $btn_kick.disabled = true;
        $btn_flash.disabled = true;
    }
    else {
        this.damageHP -= count;
    }
    this.progress = progress;
    this.renderHP();
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function renderHPLife() {
    this.elHP.innerText = this.progress + ' / 100';
}

function renderProgressbarHP() {
    this.elProgressbar.style.width = this.progress + '%';
}

function random(num) {
    return Math.ceil(Math.random() * num);
}


