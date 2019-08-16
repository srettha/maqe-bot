import { ICardinalDirection, IMAQEBot, IRelativeDirection, IStep } from './bot.types';

const DIGIT_REGEX: RegExp = /\d/;
const WALK: string = 'W';
const LEFT: IRelativeDirection = 'L';
const RIGHT: IRelativeDirection = 'R';
const DIRECTIONS: ICardinalDirection[] = ['West', 'North', 'East', 'South'];

export default class MAQEBot implements IMAQEBot {
    protected direction: number = 1;
    protected inputLength: number = 0;
    protected step: string = '';
    protected x: number = 0;
    protected y: number = 0;

    public walk(input: string = ''): IStep {
        if (input === '') {
            return {
                X: this.x,
                Y: this.y,
                Direction: DIRECTIONS[this.direction],
            } as IStep;
        }

        this.inputLength = input.length - 1;

        [...input].forEach((action, i) => this.takeAnAction(action, i));

        return {
            X: this.x,
            Y: this.y,
            Direction: DIRECTIONS[this.direction],
        } as IStep;
    }

    private clearAStep(): void {
        this.step = '';
    }

    private takeAnAction(action: string, index: number): void {
        if (action === LEFT) {
            this.takeAStep();
            this.takeADirection(LEFT);
        } else if (action === RIGHT) {
            this.takeAStep();
            this.takeADirection(RIGHT);
        } else if (action === WALK) {
            this.takeAStep();
            this.step += action;
        } else if (DIGIT_REGEX.test(action)) {
            if (this.step.charAt(0) === WALK) {
                this.step += action;
            }

            if (this.inputLength === index) {
                this.takeAStep();
            }
        } else {
            throw new Error('Given instruction doesn\'t match expected command of instruction');
        }
    }

    private takeADirection(relativeDirection: IRelativeDirection): void {
        if (this.direction === 0 && relativeDirection === LEFT) {
            this.direction = DIRECTIONS.length - 1;
            return;
        }

        if (this.direction === DIRECTIONS.length - 1 && relativeDirection === RIGHT) {
            this.direction = 0;
            return;
        }

        if (relativeDirection === LEFT) {
            this.direction -= 1;
            return;
        }

        this.direction += 1;
    }

    private takeAStep(): void {
        if (this.step === '') {
            return;
        }

        this.step = this.step.substring(1);
        switch (this.direction) {
            case 0:
                this.x -= parseInt(this.step, 10);
                this.clearAStep();
                break;
            case 1:
                this.y += parseInt(this.step, 10);
                this.clearAStep();
                break;
            case 2:
                this.x += parseInt(this.step, 10);
                this.clearAStep();
                break;
            default:
                this.y -= parseInt(this.step, 10);
                this.clearAStep();
                break;
        }
    }
}
