"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: no-console
const inquirer_1 = __importDefault(require("inquirer"));
const bot_1 = __importDefault(require("./bot"));
const maqeBot = new bot_1.default();
function retry() {
    inquirer_1.default.prompt([
        {
            type: 'confirm',
            name: 'retry',
            message: 'Do you want to play again?',
        },
    ]).then((answer) => {
        if (answer.retry) {
            return main();
        }
        console.log('Ok, bye!');
        process.exit(0);
    }).catch((err) => {
        console.error(err.message);
        process.exit(0);
    });
}
function main() {
    inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'input',
            message: 'Howdy, What is your walking command?',
        },
    ]).then((answer) => {
        const result = maqeBot.walk(answer.input);
        console.log(result);
        return retry();
    }).catch((err) => {
        console.error(err.message);
        return retry();
    });
}
main();
//# sourceMappingURL=index.js.map