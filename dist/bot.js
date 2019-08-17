"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIGIT_REGEX = /\d/;
const WALK = 'W';
const LEFT = 'L';
const RIGHT = 'R';
const DIRECTIONS = ['West', 'North', 'East', 'South'];
class MAQEBot {
    constructor() {
        this.direction = 1;
        this.inputLength = 0;
        this.step = '';
        this.x = 0;
        this.y = 0;
    }
    walk(input = '') {
        this.resetState();
        if (input === '') {
            return {
                X: this.x,
                Y: this.y,
                Direction: DIRECTIONS[this.direction],
            };
        }
        this.inputLength = input.length - 1;
        [...input].forEach((action, i) => this.makeDecisionFromAction(action, i));
        return {
            X: this.x,
            Y: this.y,
            Direction: DIRECTIONS[this.direction],
        };
    }
    changeDirectionFromTurn(turn) {
        if (this.direction === 0 && turn === LEFT) {
            this.direction = DIRECTIONS.length - 1;
            return;
        }
        if (this.direction === DIRECTIONS.length - 1 && turn === RIGHT) {
            this.direction = 0;
            return;
        }
        if (turn === LEFT) {
            this.direction -= 1;
            return;
        }
        this.direction += 1;
    }
    makeDecisionFromAction(action, index) {
        if (action === LEFT) {
            this.moveForward();
            this.changeDirectionFromTurn(LEFT);
        }
        else if (action === RIGHT) {
            this.moveForward();
            this.changeDirectionFromTurn(RIGHT);
        }
        else if (action === WALK) {
            this.moveForward();
            this.step += action;
        }
        else if (DIGIT_REGEX.test(action)) {
            if (this.step.charAt(0) === WALK) {
                this.step += action;
            }
            if (this.inputLength === index) {
                this.moveForward();
            }
        }
        else {
            throw new Error('Given instruction doesn\'t match expected command of instruction');
        }
    }
    moveForward() {
        if (this.step === '') {
            return;
        }
        this.step = this.step.substring(1);
        if (this.step === '') {
            return;
        }
        switch (this.direction) {
            case 0:
                this.x -= parseInt(this.step, 10);
                this.resetStep();
                break;
            case 1:
                this.y += parseInt(this.step, 10);
                this.resetStep();
                break;
            case 2:
                this.x += parseInt(this.step, 10);
                this.resetStep();
                break;
            default:
                this.y -= parseInt(this.step, 10);
                this.resetStep();
                break;
        }
    }
    resetState() {
        this.direction = 1;
        this.inputLength = 0;
        this.step = '';
        this.x = 0;
        this.y = 0;
    }
    resetStep() {
        this.step = '';
    }
}
exports.default = MAQEBot;
//# sourceMappingURL=bot.js.map