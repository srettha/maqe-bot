# MAQE Bot

[![CircleCI](https://circleci.com/gh/thestrayed/maqe-bot/tree/master.svg?style=svg)](https://circleci.com/gh/thestrayed/maqe-bot/tree/master)  [![Coverage Status](https://coveralls.io/repos/github/thestrayed/maqe-bot/badge.svg?branch=master)](https://coveralls.io/github/thestrayed/maqe-bot?branch=master)

This is my interpretation on how to solve MAQE Bot challenge from [MAQE challenge](http://maqe.github.io/maqe-bot.html).

The goal of this bot is to return `X`, `Y`, and `Direction` that bot is facing.

e.g.

```bash
RW15RW1
```

with the given input, what is answer of those steps?

```typescript
{
    X: 15,
    Y: -1,
    Direction: 'South',
}
```

# Getting started

### Installation

1. Clone project

1. Install project's dependencies

    ```bash
    yarn
    ```

### Test

1. Running follow command to execute test

    ```bash
    yarn test
    ```


## References

- https://en.wikipedia.org/wiki/Cardinal_direction

- https://en.wikipedia.org/wiki/Relative_direction
