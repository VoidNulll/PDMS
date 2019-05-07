module.exports = client => ({
    label: 'ping',
    execute: async (msg) => {
        const date = new Date();

        const mess = await client.createMessage(msg.channel.id, 'Pong!');

        mess.edit(`Pong! \`${new Date() - date}\`ms`)
    },
    options: {
        description: 'Ping the bot'
    }
})