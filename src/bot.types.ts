export type IRelativeDirection = 'L' | 'R';
export type ICardinalDirection = 'West' | 'North' | 'East' | 'South';

export interface IStep {
    readonly X: number;
    readonly Y: number;
    readonly Direction: ICardinalDirection;
}

export interface IMAQEBot {
    walk(input?: string): IStep;
}
