/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable import/extensions */
import Keyboard from './keyboardClass.js';

const body = document.getElementById('app');
const textarea = document.createElement('TEXTAREA');
textarea.classList.add('textarea');
textarea.setAttribute('id', 'textarea');
body.appendChild(textarea);
const keyboardContainer = document.createElement('DIV');
keyboardContainer.classList.add('keyboard__container');
body.appendChild(keyboardContainer);
const keyboard = new Keyboard('en', 'ru', {}, keyboardContainer);
//
const btns = {};
class Button {
    constructor(name, value, altValue, multiLang = false) {
        this.name = name;
        this.value = value;
        this.altValue = altValue;
        this.domElement = document.createElement('BUTTON');
        if (keyboard.language === 'en') this.domElement.innerHTML = Array.isArray(value) ? value.join(' ') : value;
        else this.domElement.innerHTML = Array.isArray(altValue) ? altValue.join('') : altValue;
        this.inputTypeValue = true;
        this.workerType = false;
        this.multiLang = multiLang;
        this.digitType = Number.isInteger(value);
        this.domElement.classList.add('keyboard__button');
        this.domElement.classList.add('button__'.concat(name.toLowerCase()));
        this.domElement.setAttribute('id', name);
        this.addToKeyboard(keyboard);
        if (name === 'ControlLeft' || name === 'ControlRight' || name === 'ShiftLeft' || name === 'ShiftRight' || name === 'AltLeft' || name === 'AltRight' || name === 'ArrowUp' || name === 'ArrowLeft' || name === 'ArrowRight' || name === 'ArrowDown' || name === 'CapsLock' || name === 'OSLeft') {
            this.inputTypeValue = false;
            this.workerType = true;
        } else if (name === 'Space') {
            this.value = ' ';
            this.workerType = true;
        } else if (name === 'Enter') {
            this.value = '\n';
            this.workerType = true;
        } else if (name === 'Backspace') {
            this.value = 'backspace';
            this.workerType = true;
        } else if (name === 'Delete') {
            this.value = 'delete';
            this.workerType = true;
        } else if (name === 'Tab') {
            this.value = '\t';
            this.workerType = true;
        }
        this.locked = false;
    }

    addToKeyboard(keyBoard) {
        keyBoard.addBtn(this);
    }

    // View methods
    addClass(className) {
        this.domElement.classList.add(className);
    }

    removeClass(className) {
        this.domElement.classList.remove(className);
    }
}

// Creating buttons
btns.Backquote = new Button('Backquote', ['`', '~'], 'ё', true);
for (let i = 1; i <= 10; i += 1) {
    const symb = [['!', '!'], ['@', '"'], ['#', '№'], ['$', ';'], ['%', '%'], ['^', ':'], ['&', '?'], ['*', '*'], ['(', '('], [')', ')']];
    // digits
    const num = i < 10 ? i : 0;
    const btn = 'Digit'.concat(num);
    btns[btn] = new Button(btn, [num, symb[i - 1][0]], [num, symb[i - 1][1]], true);
}
btns.Minus = new Button('Minus', ['-', '_'], ['-', '_']);
btns.Equal = new Button('Equal', ['=', '+'], ['=', '+']);
btns.Backspace = new Button('Backspace', 'Backspace');
btns.Tab = new Button('Tab', 'Tab');
const keyList1 = 'qwertyuiop';
const keyList1alt = 'йцукенгшщз';
for (let i = 0; i < keyList1.length; i += 1) {
    const btn = 'Key'.concat(keyList1[i].toUpperCase());
    btns[btn] = new Button(btn, keyList1[i], keyList1alt[i], true);
}
btns.BracketLeft = new Button('BracketLeft', ['[', '{'], 'х', true);
btns.BracketRight = new Button('BracketRight', [']', '}'], 'ъ', true);
btns.Delete = new Button('Delete', 'Del');
btns.CapsLock = new Button('CapsLock', 'Caps');
const keyList2 = 'asdfghjkl';
const keyList2alt = 'фывапролд';
for (let i = 0; i < keyList2.length; i += 1) {
    const btn = 'Key'.concat(keyList2[i].toUpperCase());
    btns[btn] = new Button(btn, keyList2[i], keyList2alt[i], true);
}
btns.Semicolon = new Button('Semicolon', [';', ':'], 'ж', true);
btns.Quote = new Button('Quote', ['\'', '"'], 'э', true);
btns.Backslash = new Button('Backslash', ['\\', '|'], ['\\', '/'], true);
btns.Enter = new Button('Enter', 'Enter');
btns.ShiftLeft = new Button('ShiftLeft', 'Shift');
btns.IntlBackslash = new Button('IntlBackslash', ['\\', '|'], ['\\', '/'], true);
const keyList3 = 'zxcvbnm';
const keyList3alt = 'ячсмить';
for (let i = 0; i < keyList3.length; i += 1) {
    const btn = 'Key'.concat(keyList3[i].toUpperCase());
    btns[btn] = new Button(btn, keyList3[i], keyList3alt[i], true);
}
btns.Comma = new Button('Comma', [',', '<'], 'б', true);
btns.Period = new Button('Period', ['.', '>'], 'ю', true);
btns.Slash = new Button('Slash', ['/', '?'], ['.', ','], true);
btns.ArrowUp = new Button('ArrowUp', '^');
btns.ShiftRight = new Button('ShiftRight', 'Shift');
btns.ControlLeft = new Button('ControlLeft', 'Ctrl');
btns.OSLeft = new Button('OSLeft', 'Win');
btns.AltLeft = new Button('AltLeft', 'Alt');
btns.Space = new Button('Space', 'Space');
btns.AltRight = new Button('AltRight', 'Alt');
btns.ControlRight = new Button('ControlRight', 'Ctrl');
btns.ArrowLeft = new Button('ArrowLeft', '<');
btns.ArrowDown = new Button('ArrowDown', 'down');
btns.ArrowRight = new Button('ArrowRight', '>');
//
keyboard.btnList = btns;
keyboard.normalizeIt();
console.log(keyboard.btnList);
const text = document.createElement('DIV');
text.classList.add('info');
text.innerHTML = 'Shift + Ctrl';
body.appendChild(text);
