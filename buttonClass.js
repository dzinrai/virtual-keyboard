import createDomElement from './createDomElement.js';

class Button {
    constructor(name, value, altValue, multiLang = false) {
        this.name = name;
        this.value = value;
        this.altValue = altValue;
        //
        this.domElement = createDomElement('BUTTON', name, ['keyboard__button', 'button__'.concat(name.toLowerCase())]);
        this.spanForValue = createDomElement('SPAN', null, null, this.domElement);
        this.spanForShiftValue = createDomElement('SPAN', null, null, this.domElement);
        //
        this.inputTypeValue = true;
        this.workerType = false;
        this.multiLang = multiLang;
        this.digitType = Number.isInteger(value);
        this.spanText = value;
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
        if (this.workerType) this.domElement.classList.add('worker-type');
        this.locked = false;
    }

    addToKeyboard(keyboard_) {
        this.keyboard = keyboard_;
        keyboard_.addBtn(this);
        this.changeText();
    }

    // View methods
    changeText(up) {
        const spanValue = this.spanForValue;
        const spanShiftValue = this.spanForShiftValue;
        if (Array.isArray(this.value) && this.multiLang) {
            if (this.keyboard.language === 'en') [spanValue.innerHTML, spanShiftValue.innerHTML] = this.value;
            else if (this.keyboard.language === 'ru') {
                [spanValue.innerHTML, spanShiftValue.innerHTML] = this.altValue;
                if (up) spanValue.innerHTML = String(spanValue.innerHTML).toUpperCase();
            }
        } else if (!Array.isArray(this.value) && this.multiLang) {
            if (this.keyboard.language === 'en') spanValue.innerHTML = up ? String(this.value).toUpperCase() : this.value;
            else if (this.keyboard.language === 'ru') spanValue.innerHTML = up ? String(this.altValue).toUpperCase() : this.altValue;
        } else spanValue.innerHTML = this.spanText;
    }

    addClass(className) {
        this.domElement.classList.add(className);
    }

    removeClass(className) {
        this.domElement.classList.remove(className);
    }
}

export default Button;
