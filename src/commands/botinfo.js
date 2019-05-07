module.exports = client => ({
    label: 'botinfo',
    execute: (msg) => {
        client.createMessage(msg.channel.id, {
            embed: {
                title: 'Info about me',
                description: `Hi! Let me answer a few questions you may have!`,
                fields: [
                    {
                        name: 'What am i?',
                        value: 'I am a discord bot designed to help monitor and act upon NodeJS processes while making it so the user does not have to leave Discord.'
                    },
                    {
                        name: 'Why do i exist?',
                        value: 'I exist for ease of use with PM2'
                    },
                    {
                        name: 'Anything you should know?',
                        value: `Well, yes actually. This bot is open source. You can host it yourself. Also \`${msg.prefix}info\` looks better than the standard exec command any day.`
                    }
                ]
            }
        })
    },
    options: {
        description: 'Gives some information on the purpose of the bot'
    }
})