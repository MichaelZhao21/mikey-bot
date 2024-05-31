import {
	Client,
	ClientOptions,
	Collection,
} from "discord.js";
import { CustomCommand } from "./commands/commands";

interface CommandClient extends Client {
	commands: Collection<string, CustomCommand>;
}

class CommandClient extends Client {
	constructor(options: ClientOptions) {
		super(options);
		this.commands = new Collection();
	}
}

export default CommandClient;
