const WALK = 'W';
const LEFT = 'L';
const RIGHT = 'R';
const DIRECTIONS = ['West', 'North', 'East', 'South'];

const DIGIT_REGEX = /\d/;

/**
 * @class
 */
class MAQEBOT {
    /**
     * @constructor
     * Initialise couple of private variables to MAQEBOT
     */
    constructor() {
        this._step = '';

        this.x = 0;
        this.y = 0;
        this.state = 1;
    }

    /**
     * @private
     * @param {String} direction `L` or `R`
     * This function will check which direction bot should be taking
     * based on `state` (direction) of bot at the moment.
     */
    _whatDirectionShouldITake(direction) {
        if (this.state === 0 && direction === LEFT) {
            this.state = DIRECTIONS.length - 1;
            return;
        }

        if (this.state === DIRECTIONS.length - 1 && direction === RIGHT) {
            this.state = 0;
            return;
        }

        if (direction === LEFT) {
            this.state -= 1;
            return;
        }

        this.state += 1;
    }

    /**
     * @private
     * @param {String} action
     * @param {Number} index
     * This function will check which action bot should be taking
     * based on given action (instruction) e.g. `W`, `L`, `R`
     */
    _whatActionShouldITake(action, index) {
        if (action === LEFT) {
            this._whatStepShouldITake();
            this._whatDirectionShouldITake(LEFT);
        } else if (action === RIGHT) {
            this._whatStepShouldITake();
            this._whatDirectionShouldITake(RIGHT);
        } else if (action === WALK) {
            this._whatStepShouldITake();
            this._step += action;
        } else if (DIGIT_REGEX.test(action)) {
            if (this._step.charAt(0) === WALK) {
                this._step += action;
            }

            if (this._inputLength === index) {
                this._whatStepShouldITake();
            }
        } else {
            throw new Error('Given instruction doesn\'t match expected command of instruction');
        }
    }

    /**
     * @private
     * This function will check whether it should take a step forward or not
     * based on private variables of BOT `_step` and `state`
     * `_step` is for how many BOT gonna take forward
     * `state` is for which direction BOT will be taking
     */
    _whatStepShouldITake() {
        if (this._step === '') {
            return;
        }

        this._step = this._step.substring(1);
        switch (this.state) {
            case 0: // WEST
                this.x -= parseInt(this._step, 10);
                this._step = '';
                break;
            case 1: // NORTH
                this.y += parseInt(this._step, 10);
                this._step = '';
                break;
            case 2: // EAST
                this.x += parseInt(this._step, 10);
                this._step = '';
                break;
            default: // SOUTH
                this.y -= parseInt(this._step, 10);
                this._step = '';
                break;
        }
    }

    /**
     * @private
     * Return current `X`, `Y` and `Direction` of `MAQEBOT`
     * @returns {Object}
     */
    _talkTheTalk() {
        return {
            X: this.x,
            Y: this.y,
            Direction: DIRECTIONS[this.state],
        };
    }

    /**
     * @public
     * @param {String} input
     * This function which takes user instruction. `MAQEBOT` performs according
     * to the given instructions
     */
    walkTheWalk(input = '') {
        if (input === '') {
            return this._talkTheTalk();
        }

        this._inputLength = input.length - 1;

        [...input].forEach((value, i) => {
            this._whatActionShouldITake(value, i);
        });

        return this._talkTheTalk();
    }
}

module.exports = MAQEBOT;
