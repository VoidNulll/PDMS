# PDMS

`PDMS` stands for `PM2 Discord Manager Solution`.
PDMS is a discord bot designed to make monitoring and acting upon PM2 processes very easy within Discord.

# Config keys

The layout: `key (JavaScript/JSON type) [Required or Optional] - description`
Let us start, shall we?

- `token` (String) [Required] - The token powers the discord bot. Without this, the bot cannot function at all and the app is useless, it will also not work.
- `owners` (Array) [Required] - A array of IDs you wan't to be viewed as bot owner; These IDs can utilize all of the bots command.
- `prefix` (String) [Optional] - The prefix you want the bot to have.
- `checkup` (Boolean) [Optional] - Whether or not to checkup on your pm2 apps after 30 minutes.
- `whID` (String) [Optional] - The webhook ID of the webhook you want your status to be sent to.
- `whToken` (String) [Optional] - The webhook token of the webhook you want your status to be sent to.

# Limits

Yes, the app has its limits.

Checkup limits: Sends at most 5 embeds containing 1 app per embed; It sends checkups every thirty minutes, this is not changeable.

Command Limits: There are a very limited selection of commands you can execute on this bot.

# Checkup

### Requirements

It required config.whID and config.whToken in order to function. If neither of these are present, you WILL get a lot of errors.

# Webhooks

Since the checkup feature requires webhooks, lets go over the layout.

To find a webhook ID & token you will need to figure these out yourself.

Layout: `https://discordapp.com/api/webhooks/{ID}/{TOKEN}`

`{TOKEN}` Is your token, while `{ID}` is your webhook ID.

For more information then what i provide go to the link below

https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks

# Start PDMS

## Install dependencies

Run either `npm install` or `yarn install`. You will need NodeJS for this. You can also check out how to install yarn or npm/node if you do not have it.

## Set up config

Set up your config by using the config keys above.

## Run PDMS

I recommend running it with node beforehand just to resolve any and all errors.

After all errors are resolved, run it with either node or pm2.

Note: You can use yarn install of npm for this too

Node: `npm start` or `node src/main.js`

PM2: `npm run pm2start` or `pm2 start --name "YOUR NAME HERE" src/main.js`

PDMS Should now be running!

# PDMS

PDMS is not officially made nor maintained by pm2, it is not a pm2 module, it is its own stand-alone process.

There is no support for this.

PDMS is made by Null#0515, and is under the MIT License.