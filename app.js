require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

let client;

init();
main();

function main() {
    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('messageCreate', (message) => {
        client.listeners.forEach(listener => {
            listener.execute(message);
        });

        handleCommand(message);
    });

    client.login(process.env.DISCORD_TOKEN);
}

function init() {
    client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ]
    });

    client.commands = new Collection();
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        
        client.commands.set(command.name, command);
    }

    client.listeners = [];
    const listenersPath = path.join(__dirname, 'listeners');
    const listenerFiles = fs.readdirSync(listenersPath).filter(file => file.endsWith('.js'));
    for (const file of listenerFiles) {
        const filePath = path.join(listenersPath, file);
        const listener = require(filePath);
        client.listeners.push(listener);
    }
}

function handleCommand(message) {
    const args = message.content.trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.find(cmd => commandName.startsWith(cmd.name));

    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.channel.send('There was an error executing that command!');
    }
}
