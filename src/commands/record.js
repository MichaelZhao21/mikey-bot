const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const {
    joinVoiceChannel,
    entersState,
    VoiceConnectionStatus,
    EndBehaviorType,
} = require('@discordjs/voice');
const { pipeline } = require('stream');
const prism = require('prism-media');

// Create map for getting how long a recording is going on for
const recordTimes = new Map();
const connections = new Map();
const streams = new Map();

/**
 * Creates a voice recording from a user in a voice channel
 *
 * @param {CommandInteraction} interaction Discord interaction object
 */
async function record(interaction) {
    // Make sure user is connected to a voice channel
    const channel = interaction.member.voice.channel;
    if (!channel) {
        const embed = new MessageEmbed()
            .setColor('#f40723')
            .setTitle('ERROR: *Please join a voice channel*');

        await interaction.reply({ embeds: [embed] });
        interaction.followUp('hi');
        return;
    }

    // Get user id for maps
    // and channel in case too long
    const userId = interaction.user.id;

    // Join the user voice channel
    const connection = await connectToChannel(channel);
    connections.set(userId, connection);

    // Record audio
    const opusStream = connection.receiver.subscribe(userId, {
        end: { behavior: EndBehaviorType.Manual },
    });
    streams.set(userId, opusStream);

    const oggStream = new prism.opus.OggLogicalBitstream({
        opusHead: new prism.opus.OpusHead({
            channelCount: 2,
            sampleRate: 48000,
        }),
        pageSizeControl: {
            maxPackets: 10,
        },
    });

    const oggDemuxer = new prism.opus.OggDemuxer();

    const decoder = new prism.opus.Decoder({ rate: 48000, channels: 2, frameSize: 960 });

    const out = fs.createWriteStream(userId);

    pipeline(opusStream, oggStream, oggDemuxer, decoder, out, (err) => {
        if (err) {
            const embed = new MessageEmbed()
                .setColor('#f40723')
                .setTitle('ERROR: *Recording Unable to Save :(*');
            interaction.followUp({ embeds: [embed] });
        } else {
            const recordTime = (new Date().valueOf() - recordTimes.get(userId)) / 1000;
            console.log(`Recorded ${userId} for ${recordTime} seconds`);
        }
    });

    // Start timer
    recordTimes.set(userId, new Date().valueOf());
    console.log(recordTimes);

    // Send info to user
    const embed = new MessageEmbed().setColor('#f9c039').setTitle('Recording Started...');
    const message = interaction.reply({ embeds: [embed] });

    // If user does not stop within 10 mins, stop them
    setTimeout(() => {
        if (connections.has(userId)) {
            streams.get(userId).destroy();
            connections.get(userId).destroy();
            const embed = new MessageEmbed()
                .setColor('#39f946')
                .setTitle('WARNING: *Recording too long! Saving...*');
            interaction.followUp({ embeds: [embed] });
        }
    }, 600000); // 10 mins

    // REMOVE LATER; TEST STOP
    // Stop after 15 seconds of recording
    setTimeout(() => {
        if (connections.has(userId)) {
            streams.get(userId).destroy();
            connections.get(userId).destroy();
            const embed = new MessageEmbed()
                .setColor('#39f946')
                .setTitle('Recording done! Saving...');
            interaction.followUp({ embeds: [embed] });
        }
    }, 15000); // 15 secs
}

async function connectToChannel(channel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        selfDeaf: false,
        selfMute: true,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    try {
        await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
        return connection;
    } catch (error) {
        connection.destroy();
        throw error;
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('record')
        .setDescription('Creates voice recordings using a voice channel'),
    async execute(interaction) {
        await record(interaction);
    },
};
