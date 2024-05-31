import { CommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hello")
		.setDescription("Greet the bot!"),
	async execute(interaction: CommandInteraction) {
		await interaction.reply("Hewwo!!");
	},
};
