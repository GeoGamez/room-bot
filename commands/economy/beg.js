const profileModel = require("../../models/profileSchema")

module.exports = {
    name: "beg",
    aliases: [],
    cooldown: 10,
    category: "economy",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args, profileData}) => {
        const randomNumber = Math.floor(Math.random()*500) + 1;
        const response = await profileModel.findOneAndUpdate({
            userid: message.author.id,
        }, {
            $inc: {susoin: randomNumber,}
        })
        return message.channel.send( `Wow moge gave you ${randomNumber} susoins`)
        
    }
}