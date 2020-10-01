function $getElById(id) {
    return document.getElementById(id);
}

const $btn_kick = $getElById('btn-kick');
const $btn_flash = $getElById('btn-flash');

const character = {
    name: 'Pikachu',
    defaultHP: 200,
    damageHP: 200,
    progress: 100,
    elHP: $getElById('health-character'),
    elProgressbar: $getElById('progressbar-character'),
    elLog: '#log-1',
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP,
}

const enemy = {
    name: 'Charmander',
    defaultHP: 200,
    damageHP: 200,
    progress: 100,
    elHP: $getElById('health-enemy'),
    elProgressbar: $getElById('progressbar-enemy'),
    elLog: '#log-2',
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP,
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
    const { name, defaultHP } = this;
    let progress;
    progress = count / defaultHP * 100;
    progress = this.progress - Math.ceil(progress);

    this.damageHP -= count;

    if(this.damageHP <= 0) {
        this.damageHP = 0;
        progress = 0;
        alert('Бедный ' + name + ' проиграл бой!');
        $btn_kick.disabled = true;
        $btn_flash.disabled = true;
    }

    this.progress = progress;
    this.renderHP();

    const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
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

function generateLog(firstPerson, secondPerson, count) {
    const { name, damageHP, progress, elLog } = firstPerson;
    const logs = [
        `${name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага.\n\n-${count}, [${progress}/100]`,
        `${name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага.\n\n-${count}, [${progress}/100]`,
        `${name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил.\n\n-${count}, [${progress}/100]`,
        `${name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар.\n\n-${count}, [${progress}/100]`,
        `${name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.\n\n-${count}, [${progress}/100]`,
        `${name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар.\n\n-${count}, [${progress}/100]`,
        `${name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар.\n\n-${count}, [${progress}/100]`,
        `${name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника\n\n-${count}, [${progress}/100]`,
        `${name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника.\n\n-${count}, [${progress}/100]`,
        `${name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику.\n\n-${count}, [${progress}/100]`
    ];
    const log = logs[random(logs.length) - 1];
    const $p = document.createElement('p');
    const $logs = document.querySelector(elLog);
    $p.innerText = log;
    $logs.insertBefore($p, $logs.children[0]);

    if(damageHP === 0) {
        $p.innerText = 'Бедный ' + name + ' проиграл бой!';
        $p.setAttribute('class', 'fail');
        $logs.insertBefore($p, $logs.children[0]);
    }
}
