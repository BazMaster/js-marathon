export function random(max, min = 0) {
    const num = max - min;
    return Math.ceil(Math.random() * num) + min;
}

export function countBtn(count = 6, el) {
    const innerText = el.innerText;
    el.innerText = `${innerText} (${count})`;
    return function($btn) {
        count--;
        el.innerText = `${innerText} (${count})`;
        if(count === 0) {
            el.disabled = true;
        }
        return count;
    }
}

export function generateLog(firstPerson, secondPerson, count) {
    const { name, hp: { current, total }, elLog } = firstPerson;
    const logs = [
        `<strong>${name}</strong> вспомнил что-то важное, но неожиданно <strong>${secondPerson.name}</strong>, не помня себя от испуга, ударил в предплечье врага.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${current} из ${total}</span>`,
        `<strong>${name}</strong> поперхнулся, и за это <strong>${secondPerson.name}</strong> с испугу приложил прямой удар коленом в лоб врага.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${current} из ${total}</span>`,
        `<strong>${name}</strong> забылся, но в это время наглый <strong>${secondPerson.name}</strong>, приняв волевое решение, неслышно подойдя сзади, ударил.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${current} из ${total}</span>`,
        `<strong>${name}</strong> пришел в себя, но неожиданно <strong>${secondPerson.name}</strong> случайно нанес мощнейший удар.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${current} из ${total}</span>`,
        `<strong>${name}</strong> поперхнулся, но в это время <strong>${secondPerson.name}</strong> нехотя раздробил кулаком \<вырезанно цензурой\> противника.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${current} из ${total}</span>`,
        `<strong>${name}</strong> удивился, а <strong>${secondPerson.name}</strong> пошатнувшись влепил подлый удар.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${current} из ${total}</span>`,
        `<strong>${name}</strong> высморкался, но неожиданно <strong>${secondPerson.name}</strong> провел дробящий удар.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${current} из ${total}</span>`,
        `<strong>${name}</strong> пошатнулся, и внезапно наглый <strong>${secondPerson.name}</strong> беспричинно ударил в ногу противника<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${current} из ${total}</span>`,
        `<strong>${name}</strong> расстроился, как вдруг, неожиданно <strong>${secondPerson.name}</strong> случайно влепил стопой в живот соперника.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${current} из ${total}</span>`,
        `<strong>${name}</strong> пытался что-то сказать, но вдруг, неожиданно <strong>${secondPerson.name}</strong> со скуки, разбил бровь сопернику.<br><br>Урон <span class="text-red">-${count}</span><br>У ${name} осталось здоровья <span class="text-green">${current} из ${total}</span>`
    ];
    const log = logs[random(logs.length) - 1];
    const $p = document.createElement('p');
    $p.innerHTML = log;
    elLog.insertBefore($p, elLog.children[0]);

    if(current === 0) {
        $p.innerHTML = 'Бедный <strong>' + name + '</strong> проиграл бой!';
        $p.setAttribute('class', 'fail');
        elLog.insertBefore($p, elLog.children[0]);
    }
}

