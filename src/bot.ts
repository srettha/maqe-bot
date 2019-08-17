import { IDirection, IMAQEBot, IStep, ITurn  } from './bot.types';

const DIGIT_REGEX: RegExp = /\d/;
const WALK: string = 'W';
const LEFT: ITurn = 'L';
const RIGHT: ITurn = 'R';
const DIRECTIONS: IDirection[] = ['West', 'North', 'East', 'South'];

export default class MAQEBot implements IMAQEBot {
    protected direction: number = 1;
    protected inputLength: number = 0;
    protected step: string = '';
    protected x: number = 0;
    protected y: number = 0;

    public walk(input: string = ''): IStep {
        this.resetState();
        if (input === '') {
            return {
                X: this.x,
                Y: this.y,
                Direction: DIRECTIONS[this.direction],
            } as IStep;
        }

        this.inputLength = input.length - 1;
        [...input].forEach((action, i) => this.makeDecisionFromAction(action, i));

        return {
            X: this.x,
            Y: this.y,
            Direction: DIRECTIONS[this.direction],
        } as IStep;
    }

    private changeDirectionFromTurn(turn: ITurn): void {
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

    private makeDecisionFromAction(action: string, index: number): void {
        if (action === LEFT) {
            this.moveForward();
            this.changeDirectionFromTurn(LEFT);
        } else if (action === RIGHT) {
            this.moveForward();
            this.changeDirectionFromTurn(RIGHT);
        } else if (action === WALK) {
            this.moveForward();
            this.step += action;
        } else if (DIGIT_REGEX.test(action)) {
            if (this.step.charAt(0) === WALK) {
                this.step += action;
            }

            if (this.inputLength === index) {
                this.moveForward();
            }
        } else {
            throw new Error('Given instruction doesn\'t match expected command of instruction');
        }
    }

    private moveForward(): void {
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

    private resetState(): void {
        this.direction = 1;
        this.inputLength = 0;
        this.step = '';
        this.x = 0;
        this.y = 0;
    }

    private resetStep(): void {
        this.step = '';
    }
}
