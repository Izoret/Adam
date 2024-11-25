module.exports = {
    name: 'helloThere',
    description: 'b0t -> obiwan',
    async execute(message) {
        if (message.author.id == message.client.user.id) return;

        const content = message.content.replace(/\s+/g, '').toLowerCase();

        if (content.includes('bot')) {
            const sentMessage = await message.channel.send('https://tenor.com/view/star-wars-hello-there-hello-obi-wan-kenobi-gif-13903117');
            setTimeout(() => {
                sentMessage.delete().catch(console.error);
            }, 3000);
        }
    }
};
