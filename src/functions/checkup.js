const client = require('../client');
const config = require('../../config')
const info = require('./pm2info')

const util = require('util')
const child = require('child_process')
const exec = util.promisify(child.exec)

async function getList() {
    let ex = await exec('pm2 jlist');
    ex = JSON.parse(ex.stdout);

    let i = 0

    let arr = [];


    for (let data of ex) {
        let end = await info(data.name);
        arr.push(end);
        i++;
        if (i >= 5) {
            break;
        }
    }

    return arr;
}


async function checkup() {
    let list = await getList();
    let arrOfEmbeds = []
    for (const data of list) {
        let embed = {
            title: 'PM2 Info',
            description: `**Name:** ${data.name} | **ID:** ${data.id}`,
            fields: [
                {
                    name: 'Uptime',
                    value: !data.pid ? 'No uptime data' : (data.up ? data.up : 'No uptime provided')
                },
                {
                    name: 'App Version',
                    value: data.version || 'No version info is provided',
                },
                {
                    name: 'Restarts',
                    value: data.restarts || 'Restart info is not provided'
                },
                {
                    name: 'Status',
                    value: data.status || 'No status given'
                },
                {
                    name: 'Process ID',
                    value: data.pid ? data.pid : 'No process ID found!'
                },
                {
                    name: 'CPU Usage (percent)',
                    value: data.cpu.toString() || 'No CPU usage given'
                }
            ]
        }

        arrOfEmbeds.push(embed)
    }

    client.executeWebhook(config.whID, config.whToken, {
        content: 'Checkup Time!',
        embeds: arrOfEmbeds
    })
}

module.exports = checkup;
