const mongoose = require("mongoose");
const profileSchema = require("../../models/profileSchema");



module.exports = {
    name: "createprof",
    category: "economy",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        const Arguments = args   
        console.log(message.author.id);
        await profileSchema.findOneAndUpdate({
            userid: message.author.id
        },{
            userid: message.author.id,
            serverID: message.guild.id,
            susoin: 1000,
            bank: 0
        } ,{
            upsert: true
        })
        message.channel.send(`Profile Created/Reset for ${message.author}`)
        
    }
}