const chai = require('chai');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const MAQEBOT = require('../lib/maqe-bot');

describe('MAQEBOT', () => {
    let maqeBot;
    let sandbox;

    beforeEach(() => {
        maqeBot = new MAQEBOT();
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should exist', () => {
        assert.isDefined(maqeBot);
    });

    it('should return initial value', () => {
        const expected = { X: 0, Y: 0, Direction: 'North' };
        const actual = maqeBot.walkTheWalk();

        assert.deepEqual(actual, expected);
    });

    it('should complain about unexpected of instructions', () => {
        try {
            maqeBot.walkTheWalk('rw15rl15');
            assert.fail('it should fail but pass');
        } catch (err) {
            assert.equal(err.message, 'Given instruction doesn\'t match expected command of instruction');
        }
    });

    describe('take the right step', () => {
        it('should change direction to right once', () => {
            const expected = { X: 0, Y: 0, Direction: 'East' };
            const actual = maqeBot.walkTheWalk('R');

            assert.deepEqual(actual, expected);
        });

        it('should change direction to right twice', () => {
            const expected = { X: 0, Y: 0, Direction: 'South' };
            const actual = maqeBot.walkTheWalk('RR');

            assert.deepEqual(actual, expected);
        });

        it('should change direction to right thrice', () => {
            const expected = { X: 0, Y: 0, Direction: 'West' };
            const actual = maqeBot.walkTheWalk('RRR');

            assert.deepEqual(actual, expected);
        });

        it('should change direction to right forth times', () => {
            const expected = { X: 0, Y: 0, Direction: 'North' };
            const actual = maqeBot.walkTheWalk('RRRR');

            assert.deepEqual(actual, expected);
        });
    });

    describe('take the left step', () => {
        it('should change direction to left once', () => {
            const expected = { X: 0, Y: 0, Direction: 'West' };
            const actual = maqeBot.walkTheWalk('L');

            assert.deepEqual(actual, expected);
        });

        it('should change direction to left twice', () => {
            const expected = { X: 0, Y: 0, Direction: 'South' };
            const actual = maqeBot.walkTheWalk('LL');

            assert.deepEqual(actual, expected);
        });

        it('should change direction to left thrice', () => {
            const expected = { X: 0, Y: 0, Direction: 'East' };
            const actual = maqeBot.walkTheWalk('LLL');

            assert.deepEqual(actual, expected);
        });

        it('should change direction to left forth times', () => {
            const expected = { X: 0, Y: 0, Direction: 'North' };
            const actual = maqeBot.walkTheWalk('LLLL');

            assert.deepEqual(actual, expected);
        });
    });

    describe('take a walk', () => {
        it('should do nothing if there is no walk instruction', () => {
            const expected = { X: 0, Y: 0, Direction: 'North' };
            const actual = maqeBot.walkTheWalk('15');

            assert.deepEqual(actual, expected);
        });

        it('should walk forward on north direction (N)', () => {
            const expected = { X: 0, Y: 15, Direction: 'North' };
            const actual = maqeBot.walkTheWalk('W15');

            assert.deepEqual(actual, expected);
        });
    });

    describe('take the right step then a walk', () => {
        it('should walk forward on east direction (E)', () => {
            const expected = { X: 15, Y: 0, Direction: 'East' };
            const actual = maqeBot.walkTheWalk('RW15');

            assert.deepEqual(actual, expected);
        });

        it('should walk forward on south direction (S)', () => {
            const expected = { X: 0, Y: -15, Direction: 'South' };
            const actual = maqeBot.walkTheWalk('RRW15');

            assert.deepEqual(actual, expected);
        });

        it('should walk forward on west direction (W)', () => {
            const expected = { X: -15, Y: 0, Direction: 'West' };
            const actual = maqeBot.walkTheWalk('RRRW15');

            assert.deepEqual(actual, expected);
        });
    });

    describe('take the left step then a walk', () => {
        it('should walk forward on west direction (W)', () => {
            const expected = { X: -15, Y: 0, Direction: 'West' };
            const actual = maqeBot.walkTheWalk('LW15');

            assert.deepEqual(actual, expected);
        });

        it('should walk forward on south direction (S)', () => {
            const expected = { X: 0, Y: -15, Direction: 'South' };
            const actual = maqeBot.walkTheWalk('LLW15');

            assert.deepEqual(actual, expected);
        });

        it('should walk forward on east direction (E)', () => {
            const expected = { X: 15, Y: 0, Direction: 'East' };
            const actual = maqeBot.walkTheWalk('LLLW15');

            assert.deepEqual(actual, expected);
        });
    });

    describe('take multiple steps along with a short walk', () => {
        it('should be able to do short walk with multiple steps (1)', () => {
            const expected = { X: 15, Y: -1, Direction: 'South' };
            const actual = maqeBot.walkTheWalk('RW15RW1');

            assert.deepEqual(actual, expected);
        });

        it('should be able to do short walk with multiple steps (2)', () => {
            const expected = { X: -16, Y: 0, Direction: 'West' };
            const actual = maqeBot.walkTheWalk('LW15LRW1');

            assert.deepEqual(actual, expected);
        });
    });

    describe('take multiple steps along with a long walk', () => {
        it('should be able to do long walk with multiple steps (1)', () => {
            const expected = { X: 4, Y: 3, Direction: 'North' };
            const actual = maqeBot.walkTheWalk('W5RW5RW2RW1R');

            assert.deepEqual(actual, expected);
        });

        it('should be able to do long walk with multiple steps (2)', () => {
            const expected = { X: 7, Y: -12, Direction: 'South' };
            const actual = maqeBot.walkTheWalk('RRW11RLLW19RRW12LW1');

            assert.deepEqual(actual, expected);
        });

        it('should be able to do long walk with multiple steps (3)', () => {
            const expected = { X: -210, Y: -150, Direction: 'West' };
            const actual = maqeBot.walkTheWalk('LLW100W50RW200W10');

            assert.deepEqual(actual, expected);
        });

        it('should be able to do long walk with multiple steps (4)', () => {
            const expected = { X: -99, Y: 88, Direction: 'East' };
            const actual = maqeBot.walkTheWalk('LLLLLW99RRRRRW88LLLRL');

            assert.deepEqual(actual, expected);
        });

        it('should be able to do long walk with multiple steps (5)', () => {
            const expected = { X: 1000000, Y: 55555, Direction: 'East' };
            const actual = maqeBot.walkTheWalk('W55555RW555555W444444W1');

            assert.deepEqual(actual, expected);
        });
    });
});
