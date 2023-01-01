const {ChatInputCommandInteraction, EmbedBuilder, Guild} = require("discord.js")
const profileModel = require("../../models/profileSchema")
const ShopItems = require("../../events/item")

module.exports = {
    name: "inventory",
    aliases: ['inv', 'invent'],
    cooldown: 1,
    category: "economy",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args, profileData}) => {

        const { user} = message
        const params = {
            serverID: message.guild.id,
            userid: message.author.id
        }
        const Data = await profileModel.findOne(params)
        if(!Data) return message.reply('Please create an accout using .s createprof')
        if(!Data.inventory || Object.keys(Data.inventory).length === 0) return message.reply("Empty")



        const inventory = Object.keys(Data.inventory).sort()

        const MappedData = inventory.map((a) => {
             const Item = ShopItems.find(val => val.value === a)

             return `**${a} -** ${Data.inventory[a]}`
        }).join("\n")

        const embed = new EmbedBuilder().setColor("#00ff00").setAuthor({ name: `${message.author.username}'s Inventory`}).setDescription(`${MappedData}`)

        message.channel.send({embeds: [embed]})
    }}