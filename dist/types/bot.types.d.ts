export declare type ITurn = 'L' | 'R';
export declare type IDirection = 'West' | 'North' | 'East' | 'South';
export interface IStep {
    readonly X: number;
    readonly Y: number;
    readonly Direction: IDirection;
}
export interface IMAQEBot {
    walk(input?: string): IStep;
}
