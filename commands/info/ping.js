module.exports = {
    name: "ping",
    aliases: ['pg'],
    cooldown: 1,
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        message.channel.send("Pong")
    }
}