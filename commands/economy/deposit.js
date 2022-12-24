const profileModel = require("../../models/profileSchema")

module.exports = {
    name: "deposit",
    aliases: ['dep'],
    cooldown: 1,
    category: "economy",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args, profileData}) => {
        const amount = args[0];
        const curwallet = profileData.susoin
        if(amount === "all"){
            await profileModel.findOneAndUpdate({
                userid: message.author.id
            }, {
                $inc: {
                    bank: curwallet,
                    susoin: -curwallet, 
                }
            })
            return message.channel.send(`You stored `+ curwallet+  ` susoins.`)
        }
        if(amount % 1 != 0 || amount <= 0) return message.channel.send('Deposit amount must be a natural number')
        try{
            if(amount > profileData.susoin) return message.channel.send(`You are poor, be real and check your balance.`)
            await profileModel.findOneAndUpdate({
                userid: message.author.id
            }, {
                $inc: {
                    susoin: -amount,
                    bank: amount,
                }
            })
            return message.channel.send(`You gave the bank ${amount} susoins`)
        }catch(err){
            console.log(err)
        }
        
    }
}