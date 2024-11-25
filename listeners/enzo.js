module.exports = {
    name: 'Anti-Reply',
    description: 'requête de enzo jsp',
    
    execute: async (message) => {
        if (!message.reference || message.author.id == message.client.user.id) return;

        try {
            const repliedMessage = await message.channel.messages.fetch(message.reference.messageId);

            if (repliedMessage.author.id === message.client.user.id) {
                message.reply("who asked");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du message référencé:", error);
        }  
    }
};
