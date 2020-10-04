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
    elLog: 'log-1',
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
    elLog: 'log-2',
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP,
}

const btnCounter = {
    kick: 100,
    flash: 3,
}

init();

function init() {
    character.renderHP();
    enemy.renderHP();
    renderButtons();
}

$btn_kick.addEventListener('click', function () {
    clickBtn(20);
    kickCounter($btn_kick);
})
$btn_flash.addEventListener('click', function () {
    clickBtn(100);
    flashCounter($btn_flash);
})

function clickBtn(num) {
    character.changeHP(random(num));
    enemy.changeHP(random(num));
}

function counter(count) {
    return function($btn) {
        count--;
        console.log(count);
        $btn.querySelector('span').innerText = count;
        if(count === 0) {
            $btn.disabled = true;
        }
        return count;
    }
}

const kickCounter = counter(btnCounter.kick);
const flashCounter = counter(btnCounter.flash);

function changeHP(count) {
    const { name, defaultHP } = this;
    let progress;
    progress = count / defaultHP * 100;
    progress = this.progress - Math.ceil(progress);

    this.damageHP -= count;

    if(this.damageHP <= 0) {
        this.damageHP = 0;
        progress = 0;
        // alert('Бедный ' + name + ' проиграл бой!');
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

function renderButtons() {
    console.log('render btn');
    $btn_kick.querySelector('span').innerText = btnCounter.kick;
    $btn_flash.querySelector('span').innerText = btnCounter.flash;
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
        `<strong>${name}</strong> вспомнил что-то важное, но неожиданно <strong>${secondPerson.name}</strong>, не помня себя от испуга, ударил в предплечье врага.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${progress}% из 100%</span>`,
        `<strong>${name}</strong> поперхнулся, и за это <strong>${secondPerson.name}</strong> с испугу приложил прямой удар коленом в лоб врага.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${progress}% из 100%</span>`,
        `<strong>${name}</strong> забылся, но в это время наглый <strong>${secondPerson.name}</strong>, приняв волевое решение, неслышно подойдя сзади, ударил.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${progress}% из 100%</span>`,
        `<strong>${name}</strong> пришел в себя, но неожиданно <strong>${secondPerson.name}</strong> случайно нанес мощнейший удар.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${progress}% из 100%</span>`,
        `<strong>${name}</strong> поперхнулся, но в это время <strong>${secondPerson.name}</strong> нехотя раздробил кулаком \<вырезанно цензурой\> противника.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${progress}% из 100%</span>`,
        `<strong>${name}</strong> удивился, а <strong>${secondPerson.name}</strong> пошатнувшись влепил подлый удар.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${progress}% из 100%</span>`,
        `<strong>${name}</strong> высморкался, но неожиданно <strong>${secondPerson.name}</strong> провел дробящий удар.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${progress}% из 100%</span>`,
        `<strong>${name}</strong> пошатнулся, и внезапно наглый <strong>${secondPerson.name}</strong> беспричинно ударил в ногу противника<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${progress}% из 100%</span>`,
        `<strong>${name}</strong> расстроился, как вдруг, неожиданно <strong>${secondPerson.name}</strong> случайно влепил стопой в живот соперника.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${progress}% из 100%</span>`,
        `<strong>${name}</strong> пытался что-то сказать, но вдруг, неожиданно <strong>${secondPerson.name}</strong> со скуки, разбил бровь сопернику.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${progress}% из 100%</span>`
    ];
    const log = logs[random(logs.length) - 1];
    const $p = document.createElement('p');
    const $logs = $getElById(elLog);
    $p.innerHTML = log;
    $logs.insertBefore($p, $logs.children[0]);

    if(damageHP === 0) {
        $p.innerHTML = 'Бедный <strong>' + name + '</strong> проиграл бой!';
        $p.setAttribute('class', 'fail');
        $logs.insertBefore($p, $logs.children[0]);
    }
}
