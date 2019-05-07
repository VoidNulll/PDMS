const pm2 = require('pm2')
/*const { promisify } = require('util')
const describe = promisify(pm2.describe)*/

async function describe(name) {
    return new Promise((resolve, reject) => {
        pm2.describe(name, (err, pd) => {
            if (err) return reject(err);
            return resolve(pd);
        })
    })
}

function format(milliseconds) {
    if(!milliseconds) return ' Error retrieving data';
    let secs = Math.floor(milliseconds/1000);
    let mins = Math.floor(secs/60);
    secs = secs % 60
    let hour = Math.floor(mins/60);
    mins = mins % 60;
    let day = hour/24;
    hour = Math.floor(hour) % 24;
    let month = Math.floor(day/30.41666666666666666666666666666666666667)
    day = Math.floor(day) % 30
    let year = Math.floor(month/12)
    month = month % 12
    return {
        short: `${year}yr ${month}mo ${day}d ${hour}h ${mins}m ${secs}s`,
        long: `${year} years, ${month} months, ${day} days, ${hour} hours, ${mins} minutes, ${secs} seconds`
    }
}

async function info(name) {
    let output = await describe(name);
    output = output[0]

    let end = { version: output.pm2_env.version, pid: output.pid || undefined, restarts: output.pm2_env.restart_time, cpu: output.monit.cpu, status: output.pm2_env.status, cwd: output.pm2_env.PWD, id: output.pm_id, name: output.name, up: format(new Date() - output.pm2_env.pm_uptime).short };
    return end
}

module.exports = info;
