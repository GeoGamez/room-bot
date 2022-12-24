module.exports = {
    name: "random",
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {

        const Arguments = args
        const randomstring = Arguments.sort( () => .5 - Math.random()).join(" ")
        if (Arguments.length === 0) {
            return
        }else{message.channel.send(randomstring)}
        
    }
}