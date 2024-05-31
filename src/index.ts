import { Events, GatewayIntentBits } from "discord.js";
import path from "node:path";
import fs from "fs";
import "dotenv/config";
import CommandClient from "./CommandClient";
import { CustomCommand } from "./commands/commands";

// Create client interface
const client = new CommandClient({ intents: [GatewayIntentBits.Guilds] });

// Run once
client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Load all da commands
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath) as CustomCommand;
	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(
			`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
		);
	}
}

// Execute command on call
client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = (interaction.client as CommandClient).commands.get(
		interaction.commandName
	);
	if (!command) {
		console.error(
			`No command matching ${interaction.commandName} was found.`
		);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	}
});

// Login!
client.login(process.env.TOKEN as string);
