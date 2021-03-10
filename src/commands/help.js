const { Message, Client } = require('discord.js');
const helpMessages = require('../files/helpMessages.json');

/**
 * Help command
 *
 * @param {Message} message Discordjs message object
 * @param {string[]} args Argument list
 * @param {Client} client The Discordjs client object
 */
async function run(message, args, client) {
    // Get the help id or simply the base help message
    var base = args.length === 1;
    var id = base ? 'default' : args[1];
    var error = '';

    // Return defualt message if id invalid
    if (helpMessages[id] === undefined) {
        id = 'default';
        error = 'Invalid help path! Showing default help message:';
    }

    // Send the message!
    sendHelpMessage(id, message, error);
}

/**
 * Sends the correct help message to the user, using the ID
 *
 * @param {string} id The help menu id
 * @param {Message} message The Discordjs message object
 * @param {string} [error] An error message to display before the help message
 */
async function sendHelpMessage(id, message, error = '') {
    // Build the help message from the selected list
    var output = `\`\`\`ml\nCommands: '${id}'\n`;
    helpMessages[id].forEach((line, i) => {
        output += `${i + 1}. ${line}\n`;
    });
    output += '```';

    // Send the help message
    message.channel.send(`${error}\n${output}`);
}

module.exports = { run, sendHelpMessage };
