/* eslint-disable linebreak-style */
/* eslint-disable indent */
class Keyboard {
    constructor(lang, langAdd, buttonList, container) {
        this.language = lang;
        this.languageAlter = langAdd;
        this.btnList = buttonList;
        this.domElement = container;
        this.upCase = false;
        this.shiftPressed = false;
        this.capsPressed = false;
        this.keyboardRows = [];
        this.langChange = [false, false];
        for (let row = 0; row <= 4; row += 1) {
            this.keyboardRows[row] = document.createElement('DIV');
            this.keyboardRows[row].classList.add('keyboard__row');
            this.domElement.appendChild(this.keyboardRows[row]);
        }
        this.targetOfKeyboard = document.getElementById('textarea');
        this.domElement.addEventListener('click', (event) => {
            console.log(event.target);
            if (event.target.tagName !== 'BUTTON' || event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') return false;
            this.triggerKeyboardEvent(document, 'keydown', event.target.id);
            setTimeout(() => { this.triggerKeyboardEvent(document, 'keyup', event.target.id); }, 100);
        });
        document.addEventListener('keydown', (event) => {
            this.targetOfKeyboard.focus();
            this.targetOfKeyboard.selectionStart = this.posIn;
            if (event.code) console.log(`key=${event.key},code=${event.code}`);
            else console.log(`key=${this.btnList[event.keyCode].value},code=${event.keyCode}`);
            const keyCode = event.code ? event.code : event.keyCode;
            if (this.btnList[keyCode].inputTypeValue) {
                event.preventDefault();
                let value;
                if (this.btnList[keyCode].multiLang) {
                    value = this.language === 'en' ? this.btnList[keyCode].value : this.btnList[keyCode].altValue;
                } else value = this.btnList[keyCode].value;
                let secondValue = null;
                if (Array.isArray(value)) [value, secondValue] = value;
                console.log(value, secondValue);
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
            } else if (this.btnList[keyCode].name === 'ArrowLeft') {
                event.preventDefault();
                this.posIn = this.posIn > 0 ? this.posIn - 1 : 0;
            } else if (this.btnList[keyCode].name === 'ArrowRight') {
                event.preventDefault();
                this.posIn = this.posIn < this.targetOfKeyboard.value.length ? this.posIn + 1 : this.posIn;
            } else if (this.btnList[keyCode].name === 'ArrowUp') {
                event.preventDefault();
            } else if (this.btnList[keyCode].name === 'ArrowDown') {
                event.preventDefault();
            } else if ((this.btnList[keyCode].name === 'ShiftLeft' || this.btnList[keyCode].name === 'ShiftRight') && !this.shiftPressed && !this.btnList[keyCode].locked) {
                this.shiftPressed = true;
                this.changeCase();
                if (this.btnList[keyCode].name === 'ShiftLeft') this.btnList.ShiftRight.locked = true;
                else this.btnList.ShiftLeft.locked = true;
            } else if (this.btnList[keyCode].name === 'ControlLeft' || this.btnList[keyCode].name === 'ControlRight') {
                if (this.shiftPressed) {
                    this.changeLanguage();
                }
            } else if (this.btnList[keyCode].name === 'CapsLock') {
                this.capsPressed = true;
                this.changeCase();
            }
            this.targetOfKeyboard.selectionStart = this.posIn;
            this.targetOfKeyboard.selectionEnd = this.posIn;
            this.btnList[keyCode].addClass('active');
            console.log(this.targetOfKeyboard.selectionStart);
        });
        // shifr key mouse controls
        this.domElement.addEventListener('mousedown', (event) => {
            if (event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') {
                this.shiftPressed = true;
                this.changeCase();
                if (this.btnList[event.target.id].name === 'ShiftLeft') this.btnList.ShiftRight.locked = false;
                else this.btnList.ShiftLeft.locked = false;
            }
        });
        this.domElement.addEventListener('mouseup', (event) => {
            if (event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') {
                this.shiftPressed = false;
                this.changeCase();
                if (this.btnList[event.target.id].name === 'ShiftLeft') this.btnList.ShiftRight.locked = false;
                else this.btnList.ShiftLeft.locked = false;
            }
        });
        //
        this.targetOfKeyboard.addEventListener('blur', (event) => {
            this.posIn = this.targetOfKeyboard.selectionStart;
        });
        document.addEventListener('keyup', (event) => {
            const keyCode = event.code ? event.code : event.keyCode;
            if (this.btnList[keyCode].name === 'ShiftLeft' || this.btnList[keyCode].name === 'ShiftRight') {
                this.shiftPressed = false;
                this.changeCase();
                if (this.btnList[keyCode].name === 'ShiftLeft') this.btnList.ShiftRight.locked = false;
                else this.btnList.ShiftLeft.locked = false;
            }
            console.log(keyCode);
            this.btnList[keyCode].removeClass('active');
        });
        this.targetOfKeyboard.addEventListener('click', (event) => {
            this.posIn = this.targetOfKeyboard.selectionStart;
        });
        this.totalNumberOfKeys = this.btnList.length;
        this.rowNumber = 0;
        this.numberOfKeysInRow = 0;
        this.posIn = 0;
        this.buttonListArray = [];
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
        console.log(this.eventObj);
    }

    valueApp(mod, value_) {
        let valueBefore = '';
        let value = value_ === undefined ? '' : value_;
        let valueAfter = '';
        if (mod === 'backspace') valueBefore = ''.concat(this.targetOfKeyboard.value).slice(0, this.targetOfKeyboard.selectionStart - 1);
        else valueBefore = ''.concat(this.targetOfKeyboard.value).slice(0, this.targetOfKeyboard.selectionStart);
        if (mod === 'delete') valueAfter = ''.concat(this.targetOfKeyboard.value).slice(this.targetOfKeyboard.selectionEnd + 1);
        else valueAfter = ''.concat(this.targetOfKeyboard.value).slice(this.targetOfKeyboard.selectionEnd);
        console.log(valueBefore, value, valueAfter);
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
        for (let i = 0; i < this.buttonListArray.length; i += 1) {
            if (this.buttonListArray[i].multiLang && this.language === 'ru') {
                this.buttonListArray[i].domElement.innerHTML = Array.isArray(this.buttonListArray[i].altValue) ? this.buttonListArray[i].altValue.join('') : this.buttonListArray[i].altValue;
            } else if (this.buttonListArray[i].multiLang && this.language === 'en') {
                this.buttonListArray[i].domElement.innerHTML = Array.isArray(this.buttonListArray[i].value) ? this.buttonListArray[i].value.join('') : this.buttonListArray[i].value;
            }
        }
    }

    changeCase(upperCase) {
        this.upCase = upperCase === undefined ? !this.upCase : upperCase;
        if (this.upCase) {
            for (let i = 0; i < this.buttonListArray.length; i += 1) {
                if (this.buttonListArray[i].multiLang && !this.buttonListArray[i].digitType) {
                    this.buttonListArray[i].domElement.innerHTML = String(this.buttonListArray[i].domElement.innerHTML).toUpperCase();
                    // console.log(this.buttonListArray);
                }
            }
        } else {
            for (let i = 0; i < this.buttonListArray.length; i += 1) {
                if (this.buttonListArray[i].multiLang && !this.buttonListArray[i].digitType) {
                    this.buttonListArray[i].domElement.innerHTML = String(this.buttonListArray[i].domElement.innerHTML).toLowerCase();
                    //console.log(this.buttonListArray);
                }
            }
        }
    }

    normalizeIt() {
        this.buttonListArray = [...Object.values(this.btnList)];
    }
}

export default Keyboard;
