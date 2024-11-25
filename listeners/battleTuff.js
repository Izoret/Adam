module.exports = {
    name: 'battleTuff',
    description: 'Engage battle with a wild TuffBot.',
    execute(message) {
        if (message.author.id != '1291470436114235483') return;

        message.channel.send('Wild Tuff spotted !');
        message.channel.send('Entering battle.');
    }
};
