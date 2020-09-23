// #1
const phrase = prompt('===Задание №1 ===\nУкажите букву для подсчёта', 'а');
const firstRow = prompt('Укажите первую фразу для подсчёта буквы а', 'мама мыла раму');
const secondRow = prompt('Укажите вторую фразу для сравнения', 'собака друг человека');


function getRow(firstRow, secondRow) {
    let firstCount = 0;
    let secondCount = 0;
    let result;

    for(let i = 0; i < firstRow.length; i++) {
        if(firstRow.charAt(i) === phrase) {
            firstCount++;
        }
        if((phrase === 'a' || phrase === 'а') && (firstRow.charAt(i) === 'a' || firstRow.charAt(i) === 'а')) {
            firstCount++;
        }
    }

    for(let i = 0; i < secondRow.length; i++) {
        if(secondRow.charAt(i) === phrase) {
            secondCount++;
        }
        if((phrase === 'a' || phrase === 'а') && (secondRow.charAt(i) === 'a' || secondRow.charAt(i) === 'а')) {
            secondCount++;
        }
    }

    if(firstCount > secondCount) {
        result = firstRow;
    }
    else if(firstCount < secondCount) {
        result = secondRow;
    }
    else if(firstCount === 0) {
        result = 'Такая буква нигде не найдена';
    }
    else if(firstCount === secondCount) {
        result = 'Количество символов одинаково';
    }
    else {
        result = 'Такая буква не найдена';
    }

    return result;

}

let str = getRow(firstRow, secondRow);

console.log(str);
alert(str);


// #2
let phone = prompt('=== Задание №2 ===\nУкажите номер телефона для его форматирования', '+71234567890');

if(phone.charAt(0) === '8') {
    phone = phone.replace('8', '+7');
}

if(phone.charAt(0) === '9') {
    phone = phone.replace('9', '+79');
}

phone = '+' + phone.replace('+', '');

function formattedPhone(phone) {
    let result = '';

    if(validationPhone(phone)) {
        for(let i = 0; i < phone.length; i++) {
            if(i === 2) {
                result += ' (';
            }
            if(i === 5) {
                result += ') ';
            }
            if(i === 8 || i === 10) {
                result += '-';
            }
            result += phone.charAt(i);
        }
    }
    else {
        result = 'Неверный формат номера!';
    }

    return result;
}

function validationPhone(phone) {
    phone = phone.replace('+', '');

    const len = phone.length;
    let result = true;

    if(len !== 10 && len !== 11) {
        result = false;
    }

    if(isNaN(phone)){
        result = false;
    }

    return result;
}

phone = formattedPhone(phone);

console.log(phone);
alert(phone);
