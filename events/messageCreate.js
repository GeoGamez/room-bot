const Discord = require("discord.js")
const profileModel = require("../models/profileSchema")

const cooldowns = new Map();


module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message){
        const {client, prefix, owners} = bot

        if (!message.guild) return
        if (message.author.bot) return

        let profileData;
        try {
            profileData = await profileModel.findOne({
                userid: message.author.id
            });
            if (!profileData){
                let profile = await profileModel.create({
                    userid: message.author.id,
                    serverID: message.guild.id,
                    susoin: 1000,
                    bank: 0,
                    inventory: []
                });
                profile.save();
            }
        } catch (err) {
            console.log(err)
        }

        if (!message.content.startsWith(prefix))
         return

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmdstr = args.shift().toLowerCase()

        //Command/Aliase Check: 

        let command = client.commands.get(cmdstr) || client.commands.find(a => a.aliases && a.aliases.includes(cmdstr));
        if(!command) return;


        // Cooldown code:

        if(!cooldowns.has(command.name)){
            cooldowns.set(command.name, new Discord.Collection()) 
        }
        const current_time = Date.now();
        const time_stamps = cooldowns.get(command.name);
        const cooldown_amount = (command.cooldown) * 1000;

        if(time_stamps.has(message.author.id)){
            const exp_time = time_stamps.get(message.author.id) + cooldown_amount
            if(current_time < exp_time){
                const time_left = (exp_time - current_time) /1000

                return message.reply(`${command.name} needs ${time_left.toFixed(1)} seconds to rejuvenate`)
            }
        }

        time_stamps.set(message.author.id, current_time)
        setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount)


        let member = message.member

        if(command.devOnly &&  !owners.includes(member.id)){
            return message.reply("Admin only. sus....")
        }


        //Perms Check:

        if(command.permissions && member.permissions.missing(command.permissions).length !== 0){
            var missing = member.permissions.missing(command.permissions)
            message.reply("Missing Perms:")
            missing.forEach(function(entry) {
                message.reply(entry)
            })
            
            return 
        }

        try {
            await command.run({...bot,message, args, profileData})
        }
        catch (err) {
            let errMsg = err.toString()

            if (errMsg.startsWith("?")){
                errMsg= errMsg.slice(1)
                await message.reply(errMsg)
            }
            else
                console.error(err)
        }
    }
}