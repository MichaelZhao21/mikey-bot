require('dotenv').config();
const fs = require('fs');
const { Client, Intents, Collection, Message, MessageEmbed } = require('discord.js');
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

// Send message when ready
client.on('ready', () => console.log(`Ready! Logged in as ${client.user.tag}`));

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

// Listen for messages
client.on('messageCreate', async (message) => {
    // Don't process messages without prefix or not from author
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    // Split message into arguments
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);

    // Don't process empty messages
    if (args.length === 0) return;

    // Switch to determine command to use
    switch (args[0]) {
        case 'help':
        default:
            sendHelpMessage(message);
            break;
    }
});

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

// ================================== MESSAGE COMMANDS ==================================

/**
 * Sends help message to user
 *
 * @param {Message} message Discord message object
 * @param {string} [extra] Any extra text to send with the help message
 */
async function sendHelpMessage(message, extra = '') {
    const embed = new MessageEmbed()
        .setColor('#e5c914')
        .setTitle('Mikey 2.0 Bot Commands!')
        .setDescription(`${extra}`)
        .addField('**TEXT COMMANDS**', '==============')
        .addField(`${process.env.PREFIX}help`, 'Displays this message')
        .addField('**SLASH COMMANDS**', '===============')
        .addField('/addrec', 'Creates a new recommendation');

    await message.channel.send({ embeds: [embed] });
}
