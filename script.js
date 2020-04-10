import Keyboard from './keyboardClass.js';
import Button from './buttonClass.js';
import createDomElement from './createDomElement.js';

const body = document.getElementById('app');
createDomElement('TEXTAREA', 'textarea', 'textarea', body);
createDomElement('DIV', null, 'keyboard__container', body);
const keyboard = new Keyboard('en', 'ru', {});
//
const btns = {};
// Creating buttons
btns.Backquote = new Button('Backquote', ['`', '~'], ['ё', ''], true);
for (let i = 1; i <= 10; i += 1) {
    const symb = [['!', '!'], ['@', '"'], ['#', '№'], ['$', ';'], ['%', '%'], ['^', ':'], ['&', '?'], ['*', '*'], ['(', '('], [')', ')']];
    // digits
    const num = i < 10 ? i : 0;
    const btn = 'Digit'.concat(num);
    btns[btn] = new Button(btn, [num, symb[i - 1][0]], [num, symb[i - 1][1]], true);
}
btns.Minus = new Button('Minus', ['-', '_'], ['-', '_'], true);
btns.Equal = new Button('Equal', ['=', '+'], ['=', '+'], true);
btns.Backspace = new Button('Backspace', 'Backspace');
btns.Tab = new Button('Tab', 'Tab');
const keyList1 = 'qwertyuiop';
const keyList1alt = 'йцукенгшщз';
for (let i = 0; i < keyList1.length; i += 1) {
    const btn = 'Key'.concat(keyList1[i].toUpperCase());
    btns[btn] = new Button(btn, keyList1[i], keyList1alt[i], true);
}
btns.BracketLeft = new Button('BracketLeft', ['[', '{'], ['х', ''], true);
btns.BracketRight = new Button('BracketRight', [']', '}'], ['ъ', ''], true);
btns.Delete = new Button('Delete', 'Del');
btns.CapsLock = new Button('CapsLock', 'Caps');
const keyList2 = 'asdfghjkl';
const keyList2alt = 'фывапролд';
for (let i = 0; i < keyList2.length; i += 1) {
    const btn = 'Key'.concat(keyList2[i].toUpperCase());
    btns[btn] = new Button(btn, keyList2[i], keyList2alt[i], true);
}
btns.Semicolon = new Button('Semicolon', [';', ':'], ['ж', ''], true);
btns.Quote = new Button('Quote', ['\'', '"'], ['э', ''], true);
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
btns.Comma = new Button('Comma', [',', '<'], ['б', ''], true);
btns.Period = new Button('Period', ['.', '>'], ['ю', ''], true);
btns.Slash = new Button('Slash', ['/', '?'], ['.', ','], true);
btns.ArrowUp = new Button('ArrowUp', 'up');
btns.ShiftRight = new Button('ShiftRight', 'Shift');
btns.ControlLeft = new Button('ControlLeft', 'Ctrl');
btns.OSLeft = new Button('OSLeft', 'Win');
btns.AltLeft = new Button('AltLeft', 'Alt');
btns.Space = new Button('Space', 'Space');
btns.AltRight = new Button('AltRight', 'Alt');
btns.ControlRight = new Button('ControlRight', 'Ctrl');
btns.ArrowLeft = new Button('ArrowLeft', 'left');
btns.ArrowDown = new Button('ArrowDown', 'down');
btns.ArrowRight = new Button('ArrowRight', 'right');
//
keyboard.updateBtnList(btns);
keyboard.updateBtnListArray().forEach((btn) => {
    btn.addToKeyboard(keyboard);
});
const textContainer = createDomElement('DIV', null, 'info', body);
createDomElement('SPAN', null, null, textContainer, 'Ctrl + Alt');
createDomElement('SPAN', null, null, textContainer, 'Windows');
