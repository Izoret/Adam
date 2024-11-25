module.exports = {
    name: 'ping',
    description: '->pong (test)',
    execute(message, args) {
        message.channel.send('PONG');
    }
};

