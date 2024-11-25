module.exports = {
    name: 'Aerosmith',
    description: 'Je vais dream on',
    async execute(message) {
        const link = 'https://tenor.com/view/github-git-commit-git-merge-dream-on-gif-14161671595212747890';

        if (message.author.id == message.client.user.id && message.content == link) return;

        const content = message.content.replace(/\s+/g, '').toLowerCase();

        if (content.includes('git') || content.includes('commit') || content.includes('push') || content.includes('pull') || content.includes('merge')) {
            const sentMessage = await message.channel.send(link);
            setTimeout(() => {
                sentMessage.delete().catch(console.error);
            }, 5000);
        }
    }
};
