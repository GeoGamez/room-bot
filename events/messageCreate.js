const Discord = require("discord.js")

module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message){
        const {client, prefix, owners} = bot

        if (!message.guild) return
        if (message.author.bot) return

        if (!message.content.startsWith(prefix))
         return

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmdstr = args.shift().toLowerCase()

        let command = client.commands.get(cmdstr)
        if(!command) return


        let member = message.member

        if(command.devOnly &&  !owners.includes(member.id)){
            return message.reply("Admin only. sus....")
        }

        if(command.permissions && member.permissions.missing(command.permissions).length !== 0){
            var missing = member.permissions.missing(command.permissions)
            message.reply("Missing Perms:")
            missing.forEach(function(entry) {
                message.reply(entry)
            })
            
            return 
        }

        try {
            await command.run({...bot,message, args})
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