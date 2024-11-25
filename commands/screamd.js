module.exports = {
    name: 'screamd',
    description: 'Screams in your place',
    execute(message, args) {
        if (args.length > 0) {
	    const chan = message.channel;
	    message.delete();

            const textToScream = args.join(' ');
            chan.send(textToScream.toUpperCase());
        } else {
            message.channel.send("WDYM I CAN'T SCREAM NOTHING");
        }
    }
};
