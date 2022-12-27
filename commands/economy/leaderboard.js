const { EmbedBuilder, Guild} = require("discord.js")
const profileModel = require("../../models/profileSchema")

module.exports = {
    name: "leaderboard",
    aliases: ['baltop', 'bt', 'lb','susointop'],
    cooldown: 1,
    category: "economy",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args, profileData}) => {
        try{
            let data = await profileModel.find({})
            let members = []
            for(let obj of data) {
               if (message.guild.members.cache.map((member) => member.id).includes(obj.userid)){
                members.push(obj)
               }
               }
               const embed = new EmbedBuilder().setTitle("Leaderboard").setColor("#00ff00").setFooter({text: "You are not on the board!"})

               members = members.sort(function (b,a){
                return a.susoin - b.susoin
               })

               members = members.filter(function possibleCheck(value){
                return value.susoin > 0
               })

               let pos = 0
               for(let obj of members){
                pos++
                if(obj.userid == message.member.id){
                    embed.setFooter({text: `Your position is ${pos} on the leaderboard` })
                    
                }
            }
            members = members.slice(0,10)
            let desc = ""

            for(let i = 0; i< members.length; i++){
                let user = message.guild.members.cache.get(members[i].userid)
                if(!user) return
                let bal = members[i].susoin
                desc += `${i + 1}. <@${user.id}> - ${bal}\n`
            }

            embed.setDescription(desc)
            message.reply({ embeds: [ embed ]})
        }catch(e){
            console.log(e)
            return message.reply("Something went wrong...")
        }
        
    }
}