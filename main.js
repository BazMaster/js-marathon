const $btn_kick = document.getElementById('btn-kick');
const $btn_flash = document.getElementById('btn-flash');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
}

$btn_kick.addEventListener('click', function () {
    console.log('Kick');
    clickBtn(20);
})
$btn_flash.addEventListener('click', function () {
    console.log('Flash');
    clickBtn(100);
})

function init() {
    console.log('Start Game');
    renderHP(character);
    renderHP(enemy);
}

function clickBtn(num) {
    changeHP(random(num), character);
    changeHP(random(num), enemy);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    person.elProgressbar.style.width = person.damageHP + '%';
}

function changeHP(count, person) {
    if(person.damageHP < count) {
        person.damageHP = 0;
        alert('Бедный ' + person.name + ' проиграл бой!');
        $btn_kick.disabled = true;
        $btn_flash.disabled = true;
    }
    else {
        person.damageHP -= count;
    }
    renderHP(person);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

init();