import Pokemon from "./pokemon.js";
// import Game from "./js/game.js";
import { random, generateLog, countBtn } from "./utils.js";
import { pokemons } from "./pokemons.js";

const pikachu = pokemons.find(item => item.name === 'Pikachu');
const charmander = pokemons.find(item => item.name === 'Charmander');

let player1 = new Pokemon({
    ...pikachu,
    selectors: 'player1',
})
let player2 = new Pokemon({
    ...charmander,
    selectors: 'player2',
})

const $control = document.querySelector('.control');

player1.attacks.forEach(item => {
    const $btn = ducument.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = item.name;
    const btnCount = countBtn(item.maxCount, $btn);

    $btn.addEventListener('click', () => {
        btnCount();
    });
    $control.appendChild($btn);
});

