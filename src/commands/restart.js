const { promisify } = require('util');
const cp = require('child_process');
const exec = promisify(cp.exec);
const { owners } = require('../../config')

module.exports = client => ({
    label: 'restart',
    execute: async (msg, args) => {
        if (!owners.includes(msg.author.id)) {
            return;
        }
        if (!args[0]) {
            return client.createMessage(msg.channel.id, 'I need a name or id.');
        }
        const ex = await exec(`pm2 restart ${args.join(' ')}`);
        let out = ex.stdout;
        out = out.slice(0, 1990);
        return client.createMessage(msg.channel.id, `\`\`\`sh\n${out}\`\`\``)
    },
    options: {
        description: 'Restart a process',
        usage: 'restart [process id or name]',
        example: 'restart 1',
        limitedto: 'Bot Owners'
    }
})