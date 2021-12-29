# Mikey Bot :DDD

This is my personal Discord bot. It's currently a work in progress, but there are many things that I want it to do :333

## Things it *can* do right now

- Nothing!

## Setup

Go to the [Discord Developer Portal](https://discord.com/developers) and create a project with a bot. You will need to add this bot to your server and copy the bot token. Also create a mongodb cluster and get the URL, username, and password.

Create a file in the root directory called `.env` with the following content:

```js
TOKEN="[The Discord bot token]"
CLIENT_ID="[Discord application ID (client ID)]"
GUILD_ID="[Discord server ID to deploy to (make sure to change this before doing yarn deploy)]"
PREFIX="[The prefix for the bot to use (eg. ~)]"
MONGO_USER="[MongoDB Username]"
MONGO_PASS="[MongoDB Password]"
MONGO_URL="[MongoDB URL]"
```

Simply run `yarn install` to install the libraries!

## Execution

Before running the bot, you need to install the commands, which can be done simply with `yarn deploy`. Make sure to update the `GUILD_ID` environmental variable before doing this!

To run the bot, simply type `yarn start` and the bot should run!

To allow for hot reloading using nodemon, run the bot using `yarn dev`.