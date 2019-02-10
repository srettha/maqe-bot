# MAQE Bot

[![CircleCI](https://circleci.com/gh/thestrayed/maqe-bot/tree/master.svg?style=svg)](https://circleci.com/gh/thestrayed/maqe-bot/tree/master)  [![Coverage Status](https://coveralls.io/repos/github/thestrayed/maqe-bot/badge.svg?branch=master)](https://coveralls.io/github/thestrayed/maqe-bot?branch=master)

This is my interpretation on how to solve MAQE Bot challenge from [MAQE challenge](http://maqe.github.io/maqe-bot.html).

The goal of this bot is to return `X`, `Y`, and `Direction` that bot is facing.

e.g.

```bash
RW15RW1
```

with the given input, what is answer of those steps?

```javascript
{
    X: 15,
    Y: -1,
    Direction: 'South',
}
```
