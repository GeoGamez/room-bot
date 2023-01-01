const {ChatInputCommandInteraction, EmbedBuilder, Guild} = require("discord.js")
const profileModel = require("../../models/profileSchema")
const item = require("../../events/item")


module.exports = {
    name: "buy",
    aliases: [],
    cooldown: 1,
    category: "economy",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args, profileData}) => {
        if(!args[0]) return message.reply('Please buy something')
        const wantBuy = args[0].toLowerCase()

        const validItem = !!item.find((val) => val.item.toLowerCase() === wantBuy)
        if(!validItem) return message.reply(`${wantBuy} doesn't exist!`)

        const itemPrice = item.find((val) => (val.item.toLowerCase()) === wantBuy).price

        const userBalance = await profileData.susoin
        if (!userBalance) return message.reply(`Please make an account!`)
        if(userBalance < itemPrice) return message.reply(`You are too poor! You need: ${itemPrice - userBalance} susoins`)

        const params = {
            serverID: message.guild.id,
            userid: message.author.id
        }
        profileModel.findOne(params, async(err, data) =>{
            if(data){
                const hasItem = Object.keys(data.inventory).includes(wantBuy)
                if(!hasItem){
                    data.inventory[wantBuy] = 1
                }else{
                    data.inventory[wantBuy]++
                }
                console.log(data);
                await profileModel.findOneAndUpdate(params, data)
            }else{
                return message.reply("Please create an account")
            }
            message.reply(`You have bought ${wantBuy}`)
        })

    }
}