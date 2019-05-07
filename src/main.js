const fs = require('fs')
const { promisify } = require('util');
const readdir = promisify(fs.readdir);

const config = require('../config')

const client = require('./client')

function initCommand (command) {
    /*if (!command.match(/^\.js/)) {
        return;
    }*/
    command = require('./commands/' + command)(client)
    if (client.commands[command.label]) {
        throw Error(`InitCommands - Command ${command.label} has already been registered!`);
    }
    if (!command.options) {
      command.options = { description: 'Description not found' }
      console.log(`WARN - PM2 BOT - Command ${command.label} has no description. If you are the developer/creator of this command, please add the commands option! - WARN`)
    }
    client.registerCommand(command.label, command.execute, command.options);
    const cmd = client.commands[command.label];
    if (!command.options.subcommands) {
        command.options.subcommands = [];
    }
    cmd.options = command.options;
    console.log(`PM2 BOT - Loaded command ${command.label}!`);
}

async function initCommands() {
    const commands = await readdir('./src/commands');
    console.log(`Loading ${commands.length} commands!`);
    let i = 0;
    for (let command of commands) {
        initCommand(command);
        i++;
        console.log(`Number of commands loaded: ${i}`)
    }
    return `Loaded ${commands.length} commands!`
}

client.connect()

client.on('ready', async () => {
    console.log(`PM2 BOT - READY`);
    const init = await initCommands();
    console.log(init)
})

if (config.checkup) {
    const checkup = require('./functions/checkup')
    setInterval(checkup, 1800000);
}