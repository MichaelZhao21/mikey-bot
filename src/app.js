require('dotenv').config();
const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
// const mongoose = require('mongoose');

// Create client object
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

// Attach collection of commands to client object to use in other files
client.commands = new Collection();

// Send message and change presence message when ready
client.on('ready', () => {
    client.user.setPresence({ activities: [{ name: '/help', type: 'LISTENING' }] });
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

// Login using bot token
client.login(process.env.TOKEN);

// // Connect mongoose to server
// const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/data?retryWrites=true&w=majority`;
// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // Callbacks for db connections
// const db = mongoose.connection;
// db.on('error', (error) => {
//     console.error(error);
//     process.exit(1);
// });
// db.once('open', async () => {
//     console.log('Connected to mongodb database!');
// });

// Load in command files
const commandFiles = fs.readdirSync('src/commands').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// Listen for commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
        });
    }
});
