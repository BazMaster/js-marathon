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

