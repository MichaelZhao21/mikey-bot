const { Message } = require("discord.js");

/**
 * Help command
 * @param {Message} message Discordjs message object
 * @param {string[]} args Argument list
 */
module.exports = (message, args) => {
    message.channel.send('Hewwo!');
}