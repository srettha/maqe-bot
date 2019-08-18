// tslint:disable: no-console
import inquirer from 'inquirer';

import MAQEBot from './bot';

interface IMAQEBotMainQuestion {
    input: string;
}

interface IMAQEBotRetryQuestion {
    retry: boolean;
}

const maqeBot = new MAQEBot();

function retry(): void {
    inquirer.prompt<IMAQEBotRetryQuestion>([
        {
            type: 'confirm',
            name: 'retry',
            message: 'Do you want to play again?',
        },
    ]).then((answer: IMAQEBotRetryQuestion) => {
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

function main(): void {
    inquirer.prompt<IMAQEBotMainQuestion>([
        {
            type: 'input',
            name: 'input',
            message: 'Howdy, What is your walking command?',
        },
    ]).then((answer: IMAQEBotMainQuestion) => {
        const result = maqeBot.walk(answer.input);
        console.log(result);

        return retry();
    }).catch((err) => {
        console.error(err.message);
        return retry();
    });
}

main();
