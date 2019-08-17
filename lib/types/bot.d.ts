import { IMAQEBot, IStep } from './bot.types';
export default class MAQEBot implements IMAQEBot {
    protected direction: number;
    protected inputLength: number;
    protected step: string;
    protected x: number;
    protected y: number;
    walk(input?: string): IStep;
    private changeDirectionFromTurn;
    private makeDecisionFromAction;
    private moveForward;
    private resetState;
    private resetStep;
}
