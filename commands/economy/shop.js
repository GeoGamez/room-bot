const {ChatInputCommandInteraction, EmbedBuilder, Guild} = require("discord.js")
const profileModel = require("../../models/profileSchema")
const ShopItems = require("../../events/item")

module.exports = {
    name: "shop",
    aliases: ['sp', 's'],
    cooldown: 1,
    category: "economy",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args, profileData}) => {

        const {} = message
        const Sorted = ShopItems.sort((a,b) => a.price - b.price)

        const MappedData = Sorted.map(value => ` **${value.item}** - ${value.price}`).join("\n")

        const embed = new EmbedBuilder().setColor("#00ff00").setTitle("Shop Items").setDescription(`${MappedData}`)

        message.channel.send({embeds: [embed]})
    }}