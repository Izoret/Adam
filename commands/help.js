module.exports = {
    name: 'help',
    description: 'Lists all available commands and listeners',
    execute(message, args) {
        let response = '**Available Commands:**\n';

        message.client.commands.forEach(command => {
            response += `\n**${command.name}**: ${command.description}`;
        });

        response += `\n\n**Listeners:**\n`;

        message.client.listeners.forEach(listener => {
            response += `\n**${listener.name}**: ${listener.description}`;
        });

        message.channel.send(response);
    }
};
