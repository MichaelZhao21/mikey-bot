require('dotenv').config();
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Get command files
const commands = [];
const commandFiles = fs.readdirSync('src/commands').filter((file) => file.endsWith('.js'));

// Load all data from command files
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Create rest instance
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

// Get arguments
const argv = process.argv.slice(2);

// If the guild ID is NOT present, run the global-level deploy (this will take up to an hour to propogate and is for production deploy)
// This will also remove all previously added commands
if (argv.length === 0) {
    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
        .then(() =>
            console.log(
                'Successfully registered GLOBAL application commands. (Please wait for up to an hour for changes to propogate)'
            )
        )
        .catch(console.error);
    return;
}

// Otherwise, run the guild-level deploy (this is instantaneous and good for testing)
rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.argv.slice(2)), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
