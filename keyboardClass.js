/* eslint-disable linebreak-style */
/* eslint-disable indent */
class Keyboard {
    constructor(lang, langAdd, buttonList, container) {
        this.language = lang;
        this.languageAlter = langAdd;
        this.btnList = buttonList;
        this.domElement = container;
        this.upCase = false;
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
            if (event.target.tagName !== 'BUTTON') return false;
            // console.log(`textarea.value=${textarea.value},value=${this.value}`);
            this.triggerKeyboardEvent(document, 'keydown', event.target.id);
            setTimeout(() => { this.triggerKeyboardEvent(document, 'keyup', event.target.id); }, 100);
        });
        document.addEventListener('keydown', (event) => {
            this.targetOfKeyboard.focus();
            this.targetOfKeyboard.selectionStart = this.posIn;
            // console.log(event);
            if (event.code) console.log(`key=${event.key},code=${event.code}`);
            else console.log(`key=${this.btnList[event.keyCode].value},code=${event.keyCode}`);
            const keyCode = event.code ? event.code : event.keyCode;
            if (this.btnList[keyCode].inputTypeValue) {
                event.preventDefault();

                let value = this.language === 'en' ? this.btnList[keyCode].value : this.btnList[keyCode].altValue;
                if (Array.isArray(value)) value = value[0];
                if (value === 'backspace') {
                    this.targetOfKeyboard.value = this.valueApp('backspace');
                    this.targetOfKeyboard.focus();
                } else if (value === 'delete') {
                    this.targetOfKeyboard.value = this.valueApp('delete');
                    this.targetOfKeyboard.focus();
                } else this.targetOfKeyboard.value = this.valueApp('none', value);
            } else if (this.btnList[keyCode].name === 'ArrowLeft') {
                event.preventDefault();
                this.posIn = this.posIn > 0 ? this.posIn - 1 : 0;
            } else if (this.btnList[keyCode].name === 'ArrowRight') {
                event.preventDefault();
                this.posIn = this.posIn < this.targetOfKeyboard.value.length ? this.posIn + 1 : this.posIn;
            } else if (this.btnList[keyCode].name === 'ShiftLeft' || this.btnList[keyCode].name === 'ShiftRight') {
                this.langChange[0] = true;
            } else if (this.btnList[keyCode].name === 'AltLeft' || this.btnList[keyCode].name === 'AltRight') {
                this.langChange[1] = true;
                if (this.langChange[0]) {
                    this.changeLanguage();
                }
                console.log(this);
            }
            this.targetOfKeyboard.selectionStart = this.posIn;
            this.targetOfKeyboard.selectionEnd = this.posIn;
            this.btnList[keyCode].addClass('active');
            // console.log(textarea.value);
        });
        this.targetOfKeyboard.addEventListener('blur', (event) => {
            this.posIn = this.targetOfKeyboard.selectionStart;
        });
        document.addEventListener('keyup', (event) => {
            const keyCode = event.code ? event.code : event.keyCode;
            if (this.btnList[keyCode].name === 'ShiftLeft' || this.btnList[keyCode].name === 'ShiftRight') {
                this.langChange[0] = false;
            }
            this.btnList[keyCode].removeClass('active');
        });
        this.targetOfKeyboard.addEventListener('click', (event) => {
            this.posIn = this.targetOfKeyboard.selectionStart;
            console.log(this.targetOfKeyboard.selectionStart);
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
        console.log(mod, value, this.posIn);
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
        console.log(this.posIn);
        return value;
    }

    changeLanguage() {
        const langTemp = this.language;
        this.language = this.languageAlter;
        this.languageAlter = langTemp;
        for (let i = 0; i < this.buttonListArray.length; i += 1) {
            if (this.buttonListArray[i].multiLang && this.language === 'ru') {
                this.buttonListArray[i].domElement.innerHTML = this.buttonListArray[i].altValue;
                console.log(this.buttonListArray);
            } else if (this.buttonListArray[i].multiLang && this.language === 'en') {
                this.buttonListArray[i].domElement.innerHTML = this.buttonListArray[i].value;
            }
        }
    }

    normalizeIt() {
        this.buttonListArray = [...Object.values(this.btnList)];
    }
}

export default Keyboard;
