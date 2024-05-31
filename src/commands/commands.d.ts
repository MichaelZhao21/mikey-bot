import { CommandInteraction, SlashCommandBuilder } from "discord.js";

interface CustomCommand {
	data: SlashCommandBuilder;
	execute: (CommandInteraction) => Promise<void>;
}
