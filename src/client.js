const Eris = require('eris');

const config = require('../config');

if (!config.token || !config.owners) {
    console.log('Invalid configuration!');
    process.exit();
}

let pfx = config.prefix || 'pm2 ';

const client = new Eris.CommandClient(config.token, {
    defaultImageFormat: 'png',
    defaultImageSize: 512
}, {
    prefix: [pfx, '@mention '],
    defaultHelpCommand: false
});

module.exports = client;