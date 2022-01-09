require('dotenv').config();
const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const argv = process.argv.slice(2);

client.on('ready', () => {
    if (argv.length === 0) {
        // Clear all global commands
        client.application.commands.set([]);
        console.log(`Removed all commands GLOBALLY for ${client.user.username}`);
    }
    else {
        // Get guild to clear guild-level commands
        const guildId = argv[0];
        const guild = client.guilds.cache.find(guild => guild.id === guildId);
        if (guild) {
            guild.commands.set([]);
            console.log(`Removed all commands for ${client.user.username} in ${guild.name}`);
        }
        else {
            console.error('Invalid guild ID!');
        }
    }
    process.exit(0);
});

// Login using bot token
client.login(process.env.TOKEN);