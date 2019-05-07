const { promisify } = require('util');
const cp = require('child_process');
const exec = promisify(cp.exec);
const { owners } = require('../../config')

module.exports = client => ({
    label: 'stop',
    execute: async (msg, args) => {
        if (!owners.includes(msg.author.id)) {
            return;
        }
        if (!args[0]) {
            return client.createMessage(msg.channel.id, 'I need a name or id.');
        }
        if (args[0].toLowerCase() === '--self' || args[0].toLowerCase() === '-S') {
            await client.createMessage(msg.channel.id, 'Goodbye!')
            process.exit()
        }
        const ex = await exec(`pm2 stop ${args.join(' ')}`);
        let out = ex.stdout;
        out = out.slice(0, 1990);
        return client.createMessage(msg.channel.id, `\`\`\`sh\n${out}\`\`\``)
    },
    options: {
        description: 'Stop a process',
        usage: 'stop [process id or name]',
        example: 'stop 1',
        limitedto: 'Bot Owners',
        subcommands: [
            {
                label: '--self',
                description: 'Make the bot stop its own process'
            },
            {
                label: '-S',
                description: 'Make the bot stop its own process'
            }
        ]
    }
})