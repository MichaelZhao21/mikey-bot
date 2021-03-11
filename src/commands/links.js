const { Message, Client } = require('discord.js');
const { sendHelpMessage } = require('./help');
const links = require('../files/links.json');

/**
 * Links command
 *
 * @param {Message} message Discordjs message object
 * @param {string[]} args Argument list
 * @param {Client} client The Discordjs client object
 */
async function run(message, args, client) {
    // Max of 2 arguments for the links command
    if (args.length > 2) {
        sendHelpMessage('links', message, 'Too many arguments!');
        return;
    }

    // List all links if no other arguments
    if (args.length === 1) {
        message.channel.send(listLinks());
        return;
    }

    // Invalid link id
    if (links[args[1]] === undefined) {
        sendHelpMessage(
            'links',
            message,
            'Invalid link list! Use the command `links` to see a list of all links.'
        );
        return;
    }

    // Send link to user
    message.channel.send(links[args[1]]);
}

function listLinks() {
    const linkNames = Object.keys(links);
    return linkNames.map((l, i) => `${i + 1}. ${l}`).join('\n');
}

module.exports = { run };
