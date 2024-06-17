# Mikey Bot :DDD

This is my personal Discord bot. It's currently a work in progress, but there are many things that I want it to do :333

## Things it *can* do right now

- `/hello` - simple hello response :3

## Setup

Go to the [Discord Developer Portal](https://discord.com/developers) and create a project with a bot. You will need to add this bot to your server and copy the bot token. Also create a mongodb cluster and get the URL, username, and password.

Create a file in the root directory called `.env` with the following content:

```js
TOKEN="[The Discord bot token]"
CLIENT_ID="[Discord application ID (client ID)]"
GUILD_ID="[Optional ID of server to use to deploy test commands]"
MONGO_URI="[MongoDB connection string]"
```

Run `npm install` to install everything.

## Execution

Before running the bot, you need to install the commands, which can be done simply with `npm deploy:guild`. This will deploy your commands to that **specific guild**. To get your guild ID, follow the tip on [this page](https://discordjs.guide/creating-your-bot/creating-commands.html#command-deployment-script). For production, you may simply run `npm deploy`. This will deploy the command on **globally**, but might take up to an hour to propogate (tho normally only a few mins).

To run the dev server, `npm run dev`.

To build for prod, `npm run build` - all output files will be emitted to `build` and can be run with `npm run start`.

If you would like to clear all commands globally or in a certain guild, run `npm clean` or `npm clean:guild`. Remember that the global level command can take up to an hour to take effect.
