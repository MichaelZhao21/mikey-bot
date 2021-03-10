const { Message } = require('discord.js');
const { sendHelpMessage } = require('./help');

/**
 * Admin commands
 * @param {Message} message Discordjs message object
 * @param {string[]} args Argument list
 * @param {Client} client The Discordjs client object
 */
async function run(message, args, client) {
    if (args.length === 0) sendHelpMessage('admin', message, 'No admin command specified...');
}

module.exports = { run };
