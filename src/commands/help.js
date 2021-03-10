const { Message, Client } = require('discord.js');
const helpMessages = require('../files/helpMessages.json');

/**
 * Help command
 * @param {Message} message Discordjs message object
 * @param {string[]} args Argument list
 * @param {Client} client The Discordjs client object
 */
module.exports = async (message, args, client) => {
    // Get the help id or simply the base help message
    var base = args.length === 1;
    var id = base ? 'default' : args[1];
    var error = '';

    // Return defualt message if id invalid
    if (helpMessages[id] === undefined) {
        id = 'default';
        error = 'Invalid help path! Showing default help message:\n';
    }

    // Build the help message from the selected list
    var output = `\`\`\`ml\nCommands: '${id}'\n`;
    helpMessages[id].forEach((line, i) => {
        output += `${i + 1}. ${line}\n`;
    });
    output += '```';

    // Send the help message
    message.channel.send(`${error}${output}`);
};
