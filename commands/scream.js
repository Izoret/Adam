module.exports = {
    name: 'scream',
    description: 'Screams alongside you',
    execute(message, args) {
        if (args.length > 0) {
	    const chan = message.channel;
            const textToScream = args.join(' ');
            chan.send(textToScream.toUpperCase());
        } else {
            message.channel.send("WDYM I CAN'T SCREAM NOTHING");
        }
    }
};
