const pm2info = require('../functions/pm2info')
const { owners } = require('../../config')

module.exports = client => ({
    label: 'info',
    execute: async (msg, args) => {
        if (!owners.includes(msg.author.id)) {
            return;
        }
        if (!args[0]) {
            return client.createMessage(msg.channel.id, 'I need a process name or id.')
        }
        const data = await pm2info(args.join(' '));
        if (!data) {
            return client.createMessage(msg.channel.id, 'No process found!');
        }
        return client.createMessage(msg.channel.id, {
            embed: {
                title: 'PM2 Info',
                description: `**Name:** ${data.name} | **ID:** ${data.id}`,
                fields: [
                    {
                        name: 'Uptime',
                        value: !data.pid ? 'No uptime data' : (data.up ? data.up : 'No uptime provided')
                    },
                    {
                        name: 'App Version',
                        value: data.version,
                    },
                    {
                        name: 'Restarts',
                        value: data.restarts
                    },
                    {
                        name: 'Status',
                        value: data.status
                    },
                    {
                        name: 'Process ID',
                        value: data.pid ? data.pid : 'No process ID found!'
                    }
                ]
            }
        })
    },
    options: {
        description: 'Get a nice overview of a process',
        usage: 'info [process id or name]',
        example: 'info 1'
    }
})