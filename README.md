# Mikey Bot :DDD

This is my personal Discord bot. It's currently a work in progress, but there are many things that I want it to do :333

## Things it *can* do right now

- `/addrec`: Adds recommendations based on 

## Setup

Go to the [Discord Developer Portal](https://discord.com/developers) and create a project with a bot. You will need to add this bot to your server and copy the bot token. Also create a mongodb cluster and get the URL, username, and password.

Create a file in the root directory called `.env` with the following content:

```js
TOKEN="[The Discord bot token]"
CLIENT_ID="[Discord application ID (client ID)]"
PREFIX="[The prefix for the bot to use (eg. ~)]"
MONGO_USER="[MongoDB Username]"
MONGO_PASS="[MongoDB Password]"
MONGO_URL="[MongoDB URL]"
```

Simply run `yarn install` to install the libraries!

## Execution

Before running the bot, you need to install the commands, which can be done simply with `yarn deploy <GUILD ID>`. This will deploy your commands to that **specific guild**. To get your guild ID, follow the tip on [this page](https://discordjs.guide/creating-your-bot/creating-commands.html#command-deployment-script). For production, you may simply run `yarn deploy`. This will deploy the command on **globally**, but might take up to an hour to propogate.

To run the bot, simply type `yarn start` and the bot should run!

To allow for hot reloading using nodemon, run the bot using `yarn dev`.

If you would like to clear all commands globally or in a certain guild, run `yarn clean` or `yarn clean <GUILD ID>`. Remember that the global level command can take up to an hour to take effect.
