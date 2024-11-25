module.exports = {
    name: 'ratio',
    description: 'pour le harcèlement ça principalement',
    async execute(message, args) {
        if (!message.reference || message.author.id == message.client.user.id) return;

        const repliedMessage = await message.channel.messages.fetch(message.reference.messageId);

        repliedMessage.reply('RATIO');
    }
};
