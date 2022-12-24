module.exports = {
    name: "balance",
    aliases: ['bal', 'bc', 'balcheck'],
    cooldown: 1,
    category: "economy",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args, profileData}) => {
        {message.channel.send( `User: ${message.author} Wallet: ${profileData.susoin}, Bank: ${profileData.bank}`)}
        
    }
}