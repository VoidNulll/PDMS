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
                },
                {
                    name: 'CPU Usage (percent)',
                    value: data.cpu.toString()
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
