const Discord = require("discord.js");
const mongoose = require("mongoose");
require("dotenv").config()

const { Client, GatewayIntentBits } = require('discord.js');


const client = new Discord.Client({
     intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
     })


  
let bot = {
    client, 
    prefix: ".w ", 
    owners: ["360132402598903818"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()


client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)


client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot
// client.on("ready", () => {
//     console.log(`Logged in as ${client.user.tag}`)
// })

// client.on("messageCreate", (message) => {
//     if (message.content == "hi"){
//         message.reply("Hello World!")
//     }
// })
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_SRV).then(() =>{
    console.log("Connected to DB")
}).catch((err) =>{
    console.log(err)
})


 client.login(process.env.TOKEN)