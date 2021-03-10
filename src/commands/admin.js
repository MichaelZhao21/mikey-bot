const { Message } = require('discord.js');
const { sendHelpMessage } = require('./help');

/**
 * Admin commands
 * @param {Message} message Discordjs message object
 * @param {string[]} args Argument list
 * @param {Client} client The Discordjs client object
 */
async function run(message, args, client) {
    // Check if the message sender is an admin
    // If not, deny them access
    if (!message.member.permissions.has('ADMINISTRATOR')) {
        const adminMessage = `${message.author.toString()} You need to be an administrator to use these commands!`;
        message.channel.send(adminMessage);
        return;
    }

    // Send help message if no admin command specifified
    if (args.length === 1) {
        sendHelpMessage('admin', message, 'No admin command specified...');
        return;
    }

    // Switch for admin commands
    switch (args[1]) {
        case 'eradicate':
            clearTextChannel(message);
            break;
        default:
            sendHelpMessage('admin', message, 'Invalid admin command...');
            break;
    }
}

/**
 * Deletes all messsages in an entire text channel by removing it and re-adding it
 *
 * @param {Message} message Discordjs message object
 * @param {Client} client The Discordjs client object
 */
async function clearTextChannel(message) {
    // Get the parent and channel name
    const parent = message.channel.parent;
    const name = message.channel.name;

    // Delete the channel
    await message.channel.delete();

    // Create the new channel and send a confirmation message
    const newChannel = await message.guild.channels.create(name, { type: 'text', parent });
    newChannel.send('Cleared all messages!');
}

module.exports = { run };
