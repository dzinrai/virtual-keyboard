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
        for (let row = 0; row <= 4; row += 1) {
            this.keyboardRows[row] = document.createElement('DIV');
            this.keyboardRows[row].classList.add('keyboard__row');
            this.domElement.appendChild(this.keyboardRows[row]);
        }
        const textarea = document.getElementById('textarea');
        this.domElement.addEventListener('click', (event) => {
            if (event.target.tagName !== 'BUTTON') return false;
            if (this.inputTypeValue) {
                textarea.value += this.value;
            }
            triggerKeyboardEvent(document, 'keydown', this.name);
            setTimeout(() => { triggerKeyboardEvent(document, 'keyup', this.name); }, 100);
            console.log(`textarea.value=${textarea.value},value=${this.value}`);
        });
        document.addEventListener('keydown', (event) => {
            console.log(event);
            console.log(`key=${event.key},code=${event.code}`);
            if (this.btnList[event.code].inputTypeValue) {
                event.preventDefault();
            }
            if (!event.code) this.btnList[event.keyCode].addClass('active');
            else this.btnList[event.code].addClass('active');
            // console.log(textarea.value);
        });
        document.addEventListener('keyup', (event) => {
            if (!event.code) this.btnList[event.keyCode].removeClass('active');
            else this.btnList[event.code].removeClass('active');
        });
        this.totalNumberOfKeys = this.btnList.length;
        this.rowNumber = 0;
        this.numberOfKeysInRow = 0;
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
}
function triggerKeyboardEvent(el, keyState = 'keydown', keyCode) {
    const eventObj = document.createEventObject ? document.createEventObject() : document.createEvent('Events');

    if (eventObj.initEvent) {
        eventObj.initEvent(keyState, true, true);
    }

    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;

    if (document.dispatchEvent) {
        document.dispatchEvent(eventObj);
    }
}

export default Keyboard;
