import { REST, Routes } from "discord.js";
import "dotenv/config";

const rest = new REST().setToken(process.env.TOKEN as string);

// const route = Routes.applicationCommands(process.env.CLIENT_ID as string);
const route = Routes.applicationGuildCommands(
	process.env.CLIENT_ID as string,
	process.env.GUILD_ID as string
);

rest.put(route, { body: [] })
	.then(() => console.log("Successfully deleted all application commands"))
	.catch(console.error);
