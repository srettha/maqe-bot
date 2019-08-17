export type ITurn = 'L' | 'R';
export type IDirection = 'West' | 'North' | 'East' | 'South';

export interface IStep {
    readonly X: number;
    readonly Y: number;
    readonly Direction: IDirection;
}

export interface IMAQEBot {
    walk(input?: string): IStep;
}
