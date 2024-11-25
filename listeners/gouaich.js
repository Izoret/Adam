const { AttachmentBuilder } = require('discord.js');
const sharp = require('sharp');
const path = require('path');

module.exports = {
    name: 'gouai.sh',
    description: 'Ptite animation pas piquée des hannetons',
    
    execute: async (message) => {
        const keywords = ['réseau', 'gouaich', 'travail'];
        const imagePath = path.join(__dirname, '../resources/skygouaich.webp');
        const initialSize = 500;
        const decrement = 30;
        const shrinkCount = 15;

        const content = message.content.toLowerCase();
        
        if (!keywords.some(keyword => content.includes(keyword))) return;

        try {
            const initialImageBuffer = await sharp(imagePath)
                .resize(initialSize, initialSize)
                .toBuffer();

            const attachment = new AttachmentBuilder(initialImageBuffer, { name: 'image.webp' });
            const sentMessage = await message.channel.send({ files: [attachment] });

            for (let i = 0; i < shrinkCount; i++) {
                const newSize = initialSize - (decrement * (i + 1));
                if (newSize <= 0) break;

                await new Promise(resolve => setTimeout(resolve, 200));

                try {
                    const borderSize = i * 5;
                    const resizedImageBuffer = await sharp(imagePath)
                        .resize(newSize, newSize)
                        .extend({
                            top: borderSize,
                            bottom: borderSize,
                            left: borderSize,
                            right: borderSize,
                            background: { r: 0, g: 0, b: 0, alpha: 1 }
                        })
                        .toBuffer();

                    const editedAttachment = new AttachmentBuilder(resizedImageBuffer, { name: `image_${i}.webp` });
                    await sentMessage.edit({ files: [editedAttachment] });
                } catch (error) {
                    console.error('Error editing the image:', error);
                }
            }
            sentMessage.delete();
        } catch (error) {
            console.error('Error sending or editing the image:', error);
        }
    }
};
