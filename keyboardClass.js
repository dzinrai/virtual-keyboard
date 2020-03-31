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
            console.log(event.target);
            if (event.target.tagName !== 'BUTTON') return false;
            // console.log(`textarea.value=${textarea.value},value=${this.value}`);
            this.triggerKeyboardEvent(document, 'keydown', event.target.id);
            setTimeout(() => { this.triggerKeyboardEvent(document, 'keyup', event.target.id); }, 100);
        });
        document.addEventListener('keydown', (event) => {
            console.log(event);
            console.log(`key=${event.key},code=${event.code}`);
            if (event.code) {
                if (this.btnList[event.code].inputTypeValue) {
                    event.preventDefault();
                    textarea.value += this.btnList[event.code].value;
                }
                this.btnList[event.code].addClass('active');
            } else {
                if (this.btnList[event.keyCode].inputTypeValue) {
                    event.preventDefault();
                    textarea.value += this.btnList[event.keyCode].value;
                }
                this.btnList[event.keyCode].addClass('active');
            }

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

    triggerKeyboardEvent(el, keyState = 'keydown', keyCode) {
        this.eventObj = el.createEventObject ? el.createEventObject() : el.createEvent('Events');
        if (this.eventObj.initEvent) {
            this.eventObj.initEvent(keyState, true, true);
        }
        this.eventObj.keyCode = keyCode;
        this.eventObj.which = keyCode;
        if (el.dispatchEvent) {
            el.dispatchEvent(this.eventObj);
        }
    }
}

export default Keyboard;
