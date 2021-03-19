const { Message } = require('discord.js');
const { sendHelpMessage } = require('./help');
const responses = require('../files/responses.json');
const { randInt } = require('../util');

/**
 * Admin commands
 *
 * @param {Message} message Discordjs message object
 * @param {string[]} args Argument list
 * @param {Client} client The Discordjs client object
 */
async function run(message, args, client) {
    if (args.length < 1) {
        message.channel.send(
            `No message specified. Here is a list of things you can say:\n\`\`\`
            ${Object.keys(responses).join(', ')}
            \n\`\`\``
        );
        return;
    }

    const query = args[1].toLowerCase();
    if (!Object.keys(responses).includes(query)) {
        message.channel.send(
            `I cannot answer that :(\nBUT you can say these things to me:\n\`\`\`
            ${Object.keys(responses).join(', ')}
            \n\`\`\``
        );
    } else {
        const index = randInt(0, responses[query].length);
        message.channel.send(responses[query][index]);
    }
}

module.exports = { run };
