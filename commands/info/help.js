module.exports = {
    name: "help",
    aliases: ['h'],
    cooldown: 1,
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        message.channel.send("\`ping\` pong \n \`random\` Jumbles up your message")
        message.channel.send("\`withdraw\` take money out of your bank \n \`investigate\` not search :) \
        \n \`deposit\` put money into bank \n \`createprof\` start your adventure \n \`beg\` beg like a poor person \n \`balance\` check your balance \n")
    }
}