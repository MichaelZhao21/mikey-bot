const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * Adds a recommendation based on the interaction data
 *
 * @param {CommandInteraction} interaction Discord interaction object
 */
async function addRec(interaction) {
    const description = interaction.options.get('description').value;
    const comments = interaction.options.get('comments').value;

    const embed = new MessageEmbed()
        .setColor('#d3c202')
        .setTitle(
            `${interaction.options.get('title').value} (${interaction.options.get('media').value})`
        )
        .setDescription(
            `${description ? `**Description**:\n${description}\n\n` : ''}${
                comments ? `**Comments**:\n${comments}` : ''
            }`
        );
    interaction.reply({ embeds: [embed] });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrec')
        .setDescription('Creates a new recommendation and displays an embed')
        .addStringOption((option) =>
            option
                .setName('media')
                .setDescription('The medium (eg. anime, manga, etc.)')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('title').setDescription('The title').setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('description').setDescription('Description or synopsis')
        )
        .addStringOption((options) =>
            options
                .setName('comments')
                .setDescription('Comments about rec (eg. why you recommend it, etc)')
        ),
    async execute(interaction) {
        await addRec(interaction);
    },
};
