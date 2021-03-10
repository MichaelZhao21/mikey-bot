const Discord = require('discord.js');
const admin = require('./commands/admin');
const help = require('./commands/help');
const client = new Discord.Client();
const config = require('./config');

client.on('ready', () => console.log(`Ready! Logged in as ${client.user.tag}`));

client.on('message', (message) => {
    // Don't process messages without prefix or not from author
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    // Split message into arguments
    const args = message.content.slice(config.prefix.length);

    // Don't process empty messages
    if (args.length === 0) return;

    // Switch to determine command to use
    switch (args[0]) {
        case 'help':
            help(message, args);
            break;
        case 'admin':
            admin(message, args);
            break;
        default:
            break;
    }
});

// Login using bot token
client.login(config.token);
