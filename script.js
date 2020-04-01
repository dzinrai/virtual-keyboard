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
    constructor(name, innerHtml, altValue) {
        this.name = name;
        this.domElement = document.createElement('BUTTON');
        this.domElement.innerHTML = innerHtml;
        this.value = innerHtml;
        this.altValue = altValue;
        this.inputTypeValue = true;
        this.domElement.classList.add('keyboard__button');
        this.domElement.classList.add('button__'.concat(name.toLowerCase()));
        this.domElement.setAttribute('id', name);
        this.addToKeyboard(keyboard);
        if (name === 'Tab' || name === 'ControlLeft' || name === 'ControlRight' || name === 'ShiftLeft' || name === 'ShiftRight' || name === 'AltLeft' || name === 'AltRight' || name === 'ArrowUp' || name === 'ArrowLeft' || name === 'ArrowRight' || name === 'ArrowDown' || name === 'CapsLock' || name === 'OSLeft') {
            this.inputTypeValue = false;
        } else if (name === 'Space') {
            this.value = ' ';
        } else if (name === 'Enter') {
            this.value = '\n';
        } else if (name === 'Backspace') {
            this.value = 'backspace';
        } else if (name === 'Delete') {
            this.value = 'delete';
        }
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
btns.Backquote = new Button('Backquote', '~');
for (let i = 1; i <= 10; i += 1) {
    // digits
    const num = i < 10 ? i : 0;
    const btn = 'Digit'.concat(num);
    btns[btn] = new Button(btn, num);
}
btns.Minus = new Button('Minus', '-');
btns.Equal = new Button('Equal', '=');
btns.Backspace = new Button('Backspace', 'Backspace');
btns.Tab = new Button('Tab', 'Tab');
const keyList1 = 'qwertyuiop';
const keyList1alt = 'йцукенгшщз';
for (let i = 0; i < keyList1.length; i += 1) {
    const btn = 'Key'.concat(keyList1[i].toUpperCase());
    btns[btn] = new Button(btn, keyList1[i], keyList1alt[i]);
}
btns.BracketLeft = new Button('BracketLeft', '{', 'х');
btns.BracketRight = new Button('BracketRight', '}', 'ъ');
btns.Delete = new Button('Delete', 'Del');
btns.CapsLock = new Button('CapsLock', 'Caps');
const keyList2 = 'asdfghjkl';
const keyList2alt = 'фывапролд';
for (let i = 0; i < keyList2.length; i += 1) {
    const btn = 'Key'.concat(keyList2[i].toUpperCase());
    btns[btn] = new Button(btn, keyList2[i], keyList2alt[i]);
}
btns.Semicolon = new Button('Semicolon', ';', 'ж');
btns.Quote = new Button('Quote', '\'', 'э');
btns.Backslash = new Button('Backslash', '\\');
btns.Enter = new Button('Enter', 'Enter');
btns.ShiftLeft = new Button('ShiftLeft', 'Shift');
btns.IntlBackslash = new Button('IntlBackslash', '\\');
const keyList3 = 'zxcvbnm';
const keyList3alt = 'ячсмить';
for (let i = 0; i < keyList3.length; i += 1) {
    const btn = 'Key'.concat(keyList3[i].toUpperCase());
    btns[btn] = new Button(btn, keyList3[i], keyList3alt[i]);
}
btns.Comma = new Button('Comma', ',', 'б');
btns.Period = new Button('Period', '.', 'ю');
btns.Slash = new Button('Slash', '/');
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
console.log(keyboard.btnList);
