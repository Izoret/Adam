const axios = require('axios');

module.exports = {
    name: '€',
    description: 'Generate stupid AI answer if daemon is loaded.',
    async execute(message, args) {
        const prompt = args.join(' ');

        let typingInterval;

        try {
            typingInterval = setInterval(() => {
                message.channel.sendTyping();
            }, 3000);

            const response = await axios.post('http://localhost:5000/generate', { 
                prompt: prompt, 
                login: message.author.username 
            });
            
            const generatedText = response.data.generated_text;

            if (generatedText) {
                await message.channel.send(generatedText);
            }
            else {
                await message.channel.send("TEXTE VIDE JSP POURQUOI");
            }
        } catch (error) {
            console.error(error);
            message.channel.send('Erreur lors de la génération du texte.');
        } finally {
            clearInterval(typingInterval);
        }
    }
};
