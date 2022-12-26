const profileModel = require("../../models/profileSchema")


module.exports = {
    name: "investigate",
    aliases: ['invest', 'inv'],
    cooldown: 5,
    category: "economy",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args, profileData}) => {
        
        const location = ["car", 
        "truck", 
        "house", 
        "video game",
         "box", 
         "bush", 
         "garden",
         "drawer",
           "???", 
           "ahZ/fzwe5e43Vp"]


        const chosenLocations = location.sort(() => Math.random() - Math.random()).slice(0, 3);

        const filter = ({ author, content }) => message.author.id === message.author.id && chosenLocations.some((location) => location.toLowerCase() == content.toLowerCase());

        const collector = message.channel.createMessageCollector( {filter, max: 1, time: 25000 });

        const earnings = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

        


        collector.on('collect', async (m) => {
            message.channel.send(`You found ${earnings} coins!`);

            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: earnings,
                    },
                }
            );
        });

        collector.on('end', (collected, reason) => {
            if (reason == "time") {
                message.channel.send('You ran out of time!');
            }
        });


        message.channel.send(`<@${message.author.id}> Which location would you like to search?\n Type the location in this channel\n \`${chosenLocations.join('` `')}\``);
    }
}