module.exports = {
    name: 'moyai',
    description: 'moyai',
    async execute(message) {
        if (!(message.author.id == '432610292342587392')) return;

        try {
            await message.react('🗿');

            //await new Promise(resolve => setTimeout(resolve, 10000));

            //await message.delete();
        } catch (error) {
            console.error('Error reacting or deleting the message:', error);
        }
    }
};
