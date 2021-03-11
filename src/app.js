const Discord = require('discord.js');
const Admin = require('./commands/admin');
const Help = require('./commands/help');
const Links = require('./commands/links');
const config = require('./config');

// Create client object
const client = new Discord.Client();

// Send message when ready
client.on('ready', () => console.log(`Ready! Logged in as ${client.user.tag}`));

// Listen for messages
client.on('message', async (message) => {
    // Don't process messages without prefix or not from author
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    // Split message into arguments
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

    // Don't process empty messages
    if (args.length === 0) return;

    // Switch to determine command to use
    switch (args[0]) {
        case 'help':
            Help.run(message, args, client);
            break;
        case 'admin':
            Admin.run(message, args, client);
            break;
        case 'links':
            Links.run(message, args, client);
        default:
            Help.sendHelpMessage('default', message, 'Invalid command!');
            break;
    }
});

// Login using bot token
client.login(config.token);
