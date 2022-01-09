const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * Sends help message to user
 *
 * @param {CommandInteraction} interaction Discord message object
 */
async function sendHelpMessage(interaction) {
    const embed = new MessageEmbed()
        .setColor('#e5c914')
        .setTitle('Mikey 2.0 Bot Commands!')
        .setDescription('Type "/" to see all the commands I have!')
        .addField(`/help`, 'Displays this message')
        .addField('/addrec', 'Creates a new recommendation');

    interaction.reply({ embeds: [embed] });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows a list of all commands avaliable from this bot!'),
    async execute(interaction) {
        await sendHelpMessage(interaction);
    },
};
