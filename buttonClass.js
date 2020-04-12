import createDomElement from './createDomElement.js';

class Button {
    constructor(name, value, altValue, multiLang = false, inputType = true) {
        this.name = name;
        this.value = value;
        this.altValue = altValue;
        //
        this.domElement = createDomElement('BUTTON', name, ['keyboard__button', 'button__'.concat(name.toLowerCase())]);
        this.spanForValue = createDomElement('SPAN', null, null, this.domElement);
        this.spanForShiftValue = createDomElement('SPAN', null, null, this.domElement);
        //
        this.inputTypeValue = inputType;
        this.workerType = false;
        this.multiLang = multiLang;
        this.digitType = Number.isInteger(value);
        const workers = ['ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight', 'AltLeft', 'AltRight', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'CapsLock', 'OSLeft', 'Space', 'Enter', 'Backspace', 'Delete', 'Tab'];
        workers.forEach((workerName) => {
            if (name === workerName) this.workerType = true;
        });
        this.spanText = (this.workerType && this.inputTypeValue) ? name : value;
        if (this.workerType) this.domElement.classList.add('worker-type');
        this.pressed = false;
    }

    addToKeyboard(keyboard_) {
        this.keyboard = keyboard_;
        keyboard_.addBtn(this);
        this.changeText();
    }

    // View methods
    changeText(up) {
        const spanValue = this.spanForValue;
        const spanShiftValue = Array.isArray(this.value) ? this.spanForShiftValue : undefined;
        spanValue.innerHTML = this.spanText;
        if (!this.multiLang) return;
        if (this.keyboard.language === 'en') [spanValue.innerHTML] = this.value;
        if (this.keyboard.language === 'ru') [spanValue.innerHTML] = this.altValue;
        if (up) spanValue.innerHTML = String(spanValue.innerHTML).toUpperCase();
        if (!spanShiftValue) return;
        if (this.keyboard.language === 'en') [, spanShiftValue.innerHTML] = this.value;
        if (this.keyboard.language === 'ru') [, spanShiftValue.innerHTML] = this.altValue;
    }

    addClass(className) {
        this.domElement.classList.add(className);
    }

    removeClass(className) {
        this.domElement.classList.remove(className);
    }
}

export default Button;
