import { REST, Routes } from "discord.js";
import "dotenv/config";

const rest = new REST().setToken(process.env.TOKEN as string);

const isGuild = process.argv.length > 2 && process.argv[2] === "guild";

const route = isGuild
	? Routes.applicationGuildCommands(
			process.env.CLIENT_ID as string,
			process.env.GUILD_ID as string
	  )
	: Routes.applicationCommands(process.env.CLIENT_ID as string);

rest.put(route, { body: [] })
	.then(() => console.log(`Successfully deleted all ${isGuild && "guild "}application commands`))
	.catch(console.error);
