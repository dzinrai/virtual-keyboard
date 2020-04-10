import createDomElement from './createDomElement.js';

class Keyboard {
    constructor(lang, langAdd, buttonList) {
        this.language = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : lang;
        this.languageAlter = this.language === 'en' ? 'ru' : 'en';
        this.btnList = buttonList;
        [this.domElement] = document.getElementsByClassName('keyboard__container');
        this.upCase = false;
        this.shiftPressed = false;
        this.capsPressed = false;
        this.ctrlPressed = false;
        this.altPressed = false;
        this.keyboardRows = [];
        for (let row = 0; row <= 4; row += 1) {
            this.keyboardRows[row] = createDomElement('DIV', null, 'keyboard__row', this.domElement);
        }
        this.targetOfKeyboard = document.getElementById('textarea');
        this.domElement.addEventListener('click', (event) => {
            let keyCode = null;
            if (event.target.tagName === 'BUTTON') keyCode = event.target.id;
            else if (event.target.tagName === 'SPAN') keyCode = event.target.parentElement.id;
            else return;

            if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight' || keyCode === 'AltLeft' || keyCode === 'AltRight' || keyCode === 'ControlLeft' || keyCode === 'ControlRight') return;
            this.triggerKeyboardEvent(document, 'keydown', keyCode);
            setTimeout(() => { this.triggerKeyboardEvent(document, 'keyup', keyCode); }, 200);
        });
        document.addEventListener('keydown', (event) => {
            this.targetOfKeyboard.focus();
            this.targetOfKeyboard.selectionStart = this.posIn;
            const keyCode = event.code ? event.code : event.keyCode;
            if (!this.btnList[keyCode]) return;
            if (this.btnList[keyCode].inputTypeValue) {
                event.preventDefault();
                let value;
                if (this.btnList[keyCode].multiLang) {
                    value = this.language === 'en' ? this.btnList[keyCode].value : this.btnList[keyCode].altValue;
                } else value = this.btnList[keyCode].value;
                let secondValue = null;
                if (Array.isArray(value)) [value, secondValue] = value;
                //
                if (value === 'backspace') {
                    this.targetOfKeyboard.value = this.valueApp('backspace');
                    this.targetOfKeyboard.focus();
                } else if (value === 'delete') {
                    this.targetOfKeyboard.value = this.valueApp('delete');
                    this.targetOfKeyboard.focus();
                } else if (!this.upCase) {
                    this.targetOfKeyboard.value = this.valueApp('none', String(value).toLowerCase());
                } else if (this.shiftPressed && secondValue !== null) {
                    this.targetOfKeyboard.value = this.valueApp('none', String(secondValue));
                } else if (this.upCase) {
                    this.targetOfKeyboard.value = this.valueApp('none', String(value).toUpperCase());
                }
            } else if (keyCode === 'ArrowLeft') {
                event.preventDefault();
                this.posIn = this.posIn > 0 ? this.posIn - 1 : 0;
            } else if (keyCode === 'ArrowRight') {
                event.preventDefault();
                if (this.posIn < this.targetOfKeyboard.value.length) this.posIn += 1;
            } else if (keyCode === 'ArrowUp') {
                event.preventDefault();
                this.upArrow();
            } else if (keyCode === 'ArrowDown') {
                event.preventDefault();
                this.downArrow();
            } else if ((keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') && !this.shiftPressed && !this.btnList[keyCode].locked) {
                this.shiftPressed = true;
                this.changeCase();
                if (this.btnList[keyCode].name === 'ShiftLeft') this.btnList.ShiftRight.locked = true;
                else this.btnList.ShiftLeft.locked = true;
            } else if (keyCode === 'ControlLeft' || keyCode === 'ControlRight') {
                event.preventDefault();
                this.ctrlPressed = true;
            } else if (keyCode === 'AltLeft' || keyCode === 'AltRight') {
                event.preventDefault();
                this.altPressed = true;
            } else if (this.btnList[keyCode].name === 'CapsLock') {
                this.capsPressed = true;
                this.changeCase();
            }
            if (this.ctrlPressed && this.altPressed) this.changeLanguage();
            this.targetOfKeyboard.selectionStart = this.posIn;
            this.targetOfKeyboard.selectionEnd = this.posIn;
            if (!this.btnList[keyCode].locked) this.btnList[keyCode].addClass('active');
        });
        // shifr key mouse controls
        this.domElement.addEventListener('mousedown', (event) => {
            let keyCode = null;
            if (event.target.tagName === 'BUTTON') keyCode = event.target.id;
            else if (event.target.tagName === 'SPAN') keyCode = event.target.parentElement.id;
            else return;

            if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
                this.shiftPressed = true;
                this.changeCase();
                if (keyCode === 'ShiftLeft') this.btnList.ShiftRight.locked = false;
                else this.btnList.ShiftLeft.locked = false;
            } else if (keyCode === 'AltLeft' || keyCode === 'AltRight') {
                this.altPressed = true;
            } else if (keyCode === 'ControlLeft' || keyCode === 'ControlRight') {
                this.ctrlPressed = true;
            }
        });
        this.domElement.addEventListener('mouseup', (event) => {
            let keyCode = null;
            if (event.target.tagName === 'BUTTON') keyCode = event.target.id;
            else if (event.target.tagName === 'SPAN') keyCode = event.target.parentElement.id;
            else return;

            if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
                this.shiftPressed = false;
                this.changeCase();
                if (keyCode === 'ShiftLeft') this.btnList.ShiftRight.locked = false;
                else this.btnList.ShiftLeft.locked = false;
            } else if (keyCode === 'ControlLeft' || keyCode === 'ControlRight') {
                if (this.ctrlPressed && this.altPressed) this.changeLanguage();
                this.ctrlPressed = false;
            } else if (keyCode === 'AltLeft' || keyCode === 'AltRight') {
                if (this.ctrlPressed && this.altPressed) this.changeLanguage();
                this.altPressed = false;
            }
        });
        //
        this.targetOfKeyboard.addEventListener('blur', () => {
            this.posIn = this.targetOfKeyboard.selectionStart;
        });
        document.addEventListener('keyup', (event) => {
            const keyCode = event.code ? event.code : event.keyCode;
            if (!this.btnList[keyCode]) return;
            if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
                this.shiftPressed = false;
                this.changeCase();
                if (keyCode === 'ShiftLeft') this.btnList.ShiftRight.locked = false;
                else this.btnList.ShiftLeft.locked = false;
            } else if (keyCode === 'ControlLeft' || keyCode === 'ControlRight') {
                event.preventDefault();
                this.ctrlPressed = false;
            } else if (keyCode === 'AltLeft' || keyCode === 'AltRight') {
                event.preventDefault();
                this.altPressed = false;
            }
            this.btnList[keyCode].removeClass('active');
        });
        this.targetOfKeyboard.addEventListener('click', () => {
            this.posIn = this.targetOfKeyboard.selectionStart;
        });
        this.totalNumberOfKeys = this.btnList.length;
        this.rowNumber = 0;
        this.numberOfKeysInRow = 0;
        this.posIn = 0;
        this.buttonListArray = [];
        this.saveKeyboard();
        this.changeLanguage.bind(this);
    }

    addBtn(button) {
        this.totalNumberOfKeys += 1;
        this.btnList[button.name] = button;
        const rowsCounterConst = [14, 14, 14, 14, 14];
        if (this.numberOfKeysInRow < rowsCounterConst[this.rowNumber]) {
            this.keyboardRows[this.rowNumber].appendChild(button.domElement);
        } else {
            this.rowNumber += 1;
            this.numberOfKeysInRow = 0;
            this.keyboardRows[this.rowNumber].appendChild(button.domElement);
        }
        this.numberOfKeysInRow += 1;
    }

    triggerKeyboardEvent(el, keyState = 'keydown', keyCode) {
        this.targetOfKeyboard.focus();
        this.eventObj = new Event(keyState);
        this.eventObj.keyCode = keyCode;
        this.eventObj.which = keyCode;
        el.dispatchEvent(this.eventObj);
    }

    valueApp(mod, value_) {
        let valueBefore = '';
        let value = value_ === undefined ? '' : value_;
        let valueAfter = '';
        if (mod === 'backspace') valueBefore = ''.concat(this.targetOfKeyboard.value).slice(0, this.targetOfKeyboard.selectionStart - 1);
        else valueBefore = ''.concat(this.targetOfKeyboard.value).slice(0, this.targetOfKeyboard.selectionStart);
        if (mod === 'delete') valueAfter = ''.concat(this.targetOfKeyboard.value).slice(this.targetOfKeyboard.selectionEnd + 1);
        else valueAfter = ''.concat(this.targetOfKeyboard.value).slice(this.targetOfKeyboard.selectionEnd);
        value = valueBefore.concat(value).concat(valueAfter);
        if (mod === 'none') {
            this.posIn += 1;
        } else if (mod === 'backspace') {
            this.posIn = this.posIn > 0 ? this.posIn - 1 : 0;
        }
        this.targetOfKeyboard.selectionStart = this.posIn;
        this.targetOfKeyboard.selectionEnd = this.posIn;
        return value;
    }

    changeLanguage() {
        const langTemp = this.language;
        this.language = this.languageAlter;
        this.languageAlter = langTemp;
        this.saveKeyboard();
        for (let i = 0; i < this.buttonListArray.length; i += 1) {
            const btn = this.buttonListArray[i];
            btn.changeText(this.upCase);
        }
        this.ctrlPressed = false;
        this.altPressed = false;
    }

    changeCase(upperCase) {
        this.upCase = upperCase === undefined ? !this.upCase : upperCase;
        for (let i = 0; i < this.buttonListArray.length; i += 1) {
            const btn = this.buttonListArray[i];
            if (this.buttonListArray[i].multiLang && !this.buttonListArray[i].digitType) {
                btn.changeText(this.upCase);
            }
        }
    }

    upArrow() {
        this.targetOfKeyboard.value = this.valueApp('none', '▲');
    }

    downArrow() {
        this.targetOfKeyboard.value = this.valueApp('none', '▼');
    }

    normalizeIt() {
        this.buttonListArray = [...Object.values(this.btnList)];
    }

    saveKeyboard() {
        localStorage.setItem('lang', this.language);
    }
}

export default Keyboard;
