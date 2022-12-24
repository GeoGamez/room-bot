module.exports = {
    name: "balance",
    category: "economy",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args, profileData}) => {
        {message.channel.send( `User: ${message.author} Wallet: ${profileData.susoin}, Bank: ${profileData.bank}`)}
        
    }
}