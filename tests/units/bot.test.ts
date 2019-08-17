import MAQEBot from '../../src/bot';
import { IMAQEBot, IStep } from '../../src/bot.types';

describe('MAQEBot', () => {
    let maqeBot: IMAQEBot;

    beforeAll(() => {
        maqeBot = new MAQEBot();
    });

    describe('base case', () => {
        it('should exist', () => {
            expect(maqeBot).toBeTruthy();
        });

        it('should complain about unexpected of instructions', () => {
            try {
                maqeBot.walk('rw15rl15');
            } catch (error) {
                expect(error.message).toEqual('Given instruction doesn\'t match expected command of instruction');
            }
        });

        it('should return initial value', () => {
            const expected = {
                X: 0,
                Y: 0,
                Direction: 'North',
            } as IStep;
            const actual = maqeBot.walk();

            expect(actual).toEqual(expected);
        });
    });

    describe('take the right step', () => {
        it('should change direction to right once', () => {
            const expected = {
                X: 0,
                Y: 0,
                Direction: 'East',
            } as IStep;
            const actual = maqeBot.walk('R');

            expect(actual).toEqual(expected);
        });

        it('should change direction to right twice', () => {
            const expected = {
                X: 0,
                Y: 0,
                Direction: 'South',
            } as IStep;
            const actual = maqeBot.walk('RR');

            expect(actual).toEqual(expected);
        });

        it('should change direction to right thrice', () => {
            const expected = {
                X: 0,
                Y: 0,
                Direction: 'West',
            } as IStep;
            const actual = maqeBot.walk('RRR');

            expect(actual).toEqual(expected);
        });

        it('should change direction to right forth times', () => {
            const expected = {
                X: 0,
                Y: 0,
                Direction: 'North',
            } as IStep;
            const actual = maqeBot.walk('RRRR');

            expect(actual).toEqual(expected);
        });
    });

    describe('take the left step', () => {
        it('should change direction to left once', () => {
            const expected = {
                X: 0,
                Y: 0,
                Direction: 'West',
            } as IStep;
            const actual = maqeBot.walk('L');

            expect(actual).toEqual(expected);
        });

        it('should change direction to left twice', () => {
            const expected = {
                X: 0,
                Y: 0,
                Direction: 'South',
            } as IStep;
            const actual = maqeBot.walk('LL');

            expect(actual).toEqual(expected);
        });

        it('should change direction to left thrice', () => {
            const expected = {
                X: 0,
                Y: 0,
                Direction: 'East',
            } as IStep;
            const actual = maqeBot.walk('LLL');

            expect(actual).toEqual(expected);
        });

        it('should change direction to left forth times', () => {
            const expected = {
                X: 0,
                Y: 0,
                Direction: 'North',
            } as IStep;
            const actual = maqeBot.walk('LLLL');

            expect(actual).toEqual(expected);
        });
    });

    describe('take a walk', () => {
        it('should do nothing if provide only walk instruction without any step', () => {
            const expected = {
                X: 0,
                Y: 0,
                Direction: 'North',
            } as IStep;
            const actual = maqeBot.walk('W');

            expect(actual).toEqual(expected);
        });

        it('should do nothing if there is no walk instruction', () => {
            const expected = {
                X: 0,
                Y: 0,
                Direction: 'North',
            } as IStep;
            const actual = maqeBot.walk('15');

            expect(actual).toEqual(expected);
        });

        it('should walk forward on north direction (N)', () => {
            const expected = {
                X: 0,
                Y: 15,
                Direction: 'North',
            } as IStep;
            const actual = maqeBot.walk('W15');

            expect(actual).toEqual(expected);
        });

        it('should do nothing if provide direction and walk instruction without any step', () => {
            const expected = {
                X: 0,
                Y: 0,
                Direction: 'East',
            } as IStep;
            const actual = maqeBot.walk('RW');

            expect(actual).toEqual(expected);
        });

        it('should take a step only when walk instruction provided with step', () => {
            const expected = {
                X: 0,
                Y: -15,
                Direction: 'South',
            } as IStep;
            const actual = maqeBot.walk('RWRW15');

            expect(actual).toEqual(expected);
        });
    });

    describe('take the right step then a walk', () => {
        it('should walk forward on east direction (E)', () => {
            const expected = {
                X: 15,
                Y: 0,
                Direction: 'East',
            } as IStep;
            const actual = maqeBot.walk('RW15');

            expect(actual).toEqual(expected);
        });

        it('should walk forward on south direction (S)', () => {
            const expected = {
                X: 0,
                Y: -15,
                Direction: 'South',
            } as IStep;
            const actual = maqeBot.walk('RRW15');

            expect(actual).toEqual(expected);
        });

        it('should walk forward on west direction (W)', () => {
            const expected = {
                X: -15,
                Y: 0,
                Direction: 'West',
            } as IStep;
            const actual = maqeBot.walk('RRRW15');

            expect(actual).toEqual(expected);
        });
    });

    describe('take the left step then a walk', () => {
        it('should walk forward on west direction (W)', () => {
            const expected = {
                X: -15,
                Y: 0,
                Direction: 'West',
            } as IStep;
            const actual = maqeBot.walk('LW15');

            expect(actual).toEqual(expected);
        });

        it('should walk forward on south direction (S)', () => {
            const expected = {
                X: 0,
                Y: -15,
                Direction: 'South',
            } as IStep;
            const actual = maqeBot.walk('LLW15');

            expect(actual).toEqual(expected);
        });

        it('should walk forward on east direction (E)', () => {
            const expected = {
                X: 15,
                Y: 0,
                Direction: 'East',
            } as IStep;
            const actual = maqeBot.walk('LLLW15');

            expect(actual).toEqual(expected);
        });
    });

    describe('take multiple steps along with a short walk', () => {
        it('should be able to do short walk with multiple steps (1)', () => {
            const expected = {
                X: 15,
                Y: -1,
                Direction: 'South',
            } as IStep;
            const actual = maqeBot.walk('RW15RW1');

            expect(actual).toEqual(expected);
        });

        it('should be able to do short walk with multiple steps (2)', () => {
            const expected = {
                X: -16,
                Y: 0,
                Direction: 'West',
            } as IStep;
            const actual = maqeBot.walk('LW15LRW1');

            expect(actual).toEqual(expected);
        });
    });

    describe('take multiple steps along with a long walk', () => {
        it('should be able to do long walk with multiple steps (1)', () => {
            const expected = {
                X: 4,
                Y: 3,
                Direction: 'North',
            } as IStep;
            const actual = maqeBot.walk('W5RW5RW2RW1R');

            expect(actual).toEqual(expected);
        });

        it('should be able to do long walk with multiple steps (2)', () => {
            const expected = {
                X: 7,
                Y: -12,
                Direction: 'South',
            } as IStep;
            const actual = maqeBot.walk('RRW11RLLW19RRW12LW1');

            expect(actual).toEqual(expected);
        });

        it('should be able to do long walk with multiple steps (3)', () => {
            const expected = {
                X: -210,
                Y: -150,
                Direction: 'West',
            } as IStep;
            const actual = maqeBot.walk('LLW100W50RW200W10');

            expect(actual).toEqual(expected);
        });

        it('should be able to do long walk with multiple steps (4)', () => {
            const expected = {
                X: -99,
                Y: 88,
                Direction: 'East',
            } as IStep;
            const actual = maqeBot.walk('LLLLLW99RRRRRW88LLLRL');

            expect(actual).toEqual(expected);
        });

        it('should be able to do long walk with multiple steps (5)', () => {
            const expected = {
                X: 1000000,
                Y: 55555,
                Direction: 'East',
            } as IStep;
            const actual = maqeBot.walk('W55555RW555555W444444W1');

            expect(actual).toEqual(expected);
        });
    });
});
