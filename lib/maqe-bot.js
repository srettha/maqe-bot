const WALK = 'W';
const LEFT = 'L';
const RIGHT = 'R';
const DIRECTIONS = ['West', 'North', 'East', 'South'];

/**
 * @class
 */
class MAQEBOT {
    constructor() {
        this._step = '';

        this.x = 0;
        this.y = 0;
        this.state = 1;
    }

    /**
     * @private
     * @param {String} direction
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
        } else {
            this._step += action;
            if (this._inputLength === index) {
                this._whatStepShouldITake();
            }
        }
    }

    /**
     * @private
     */
    _whatStepShouldITake() {
        if (this._step === '') {
            return;
        }

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
            case 3: // SOUTH
                this.y -= parseInt(this._step, 10);
                this._step = '';
                break;
            default:
                break;
        }
    }

    /**
     * Return talk the talk
     */
    talkTheTalk() {
        return {
            X: this.x,
            Y: this.y,
            Direction: DIRECTIONS[this.state],
        };
    }

    /**
     * Walk the walk
     * @param {String} input
     */
    walkTheWalk(input = '') {
        if (input === '') {
            return this.talkTheTalk();
        }

        this._inputLength = input.length - 1;

        [...input].forEach((value, i) => {
            this._whatActionShouldITake(value, i);
        });

        return this.talkTheTalk();
    }
}

module.exports = MAQEBOT;
