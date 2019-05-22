const { promisify } = require('util');
const cp = require('child_process');
const exec = promisify(cp.exec);
const { owners } = require('../../config')

module.exports = client => ({
    label: 'save',
    execute: async (msg, args) => {
        if (!owners.includes(msg.author.id)) {
            return;
        }
        let cmd = 'pm2 save';
        if (args && args.length > 0) cmd = `${cmd} ${args.join(' ')}`;
        const ex = await exec(cmd);
        let out = ex.stdout;
        out = out.slice(0, 1990);
        return client.createMessage(msg.channel.id, `\`\`\`sh\n${out}\`\`\``)
    },
    options: {
        description: 'Save the current process list.',
        limitedto: 'Bot Owners'
    }
})