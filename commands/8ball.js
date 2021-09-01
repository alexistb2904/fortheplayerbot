module.exports = {
    name: "8ball",
    enabled: true,
    guildOnly: false,
    aliases: ["eight-ball", "eightball"],
    nsfw: false,
    ownerOnly: false,
    execute(message, args) {
        const Discord = require('discord.js');
        const client = new Discord.Client();
        if (!args[0] || !message.content.endsWith("?")) {
            return message.channel.send("Ceci n'est pas une question.");
        }

        const answerNO = parseInt(Math.floor(Math.random() * 10), 10);
        if (answerNO + 1 === 1) {
            var answer = (' :8ball: Je suis sur de ça.')
        } else if (answerNO + 1 === 2) {
            var answer = (' :8ball: c\'est définitivement sûr.')
        } else if (answerNO + 1 === 3) {
            var answer = (' :8ball: oui, définitivement.')
        } else if (answerNO + 1 === 4) {
            var answer = (' :8ball: mieux vaut ne pas vous le dire maintenant.')
        } else if (answerNO + 1 === 5) {
            var answer = (' :8ball: demandez plus tard.')
        } else if (answerNO + 1 === 6) {
            var answer = (' :8ball: ne comptez pas là-dessus.')
        } else if (answerNO + 1 === 7) {
            var answer = (' :8ball: Je ne pense pas.')
        } else if (answerNO + 1 === 8) {
            var answer = (' :8ball: mes sources me disent que non.')
        } else if (answerNO + 1 === 9) {
            var answer = (' :8ball: non.')
        } else if (answerNO + 1 === 10) {
            var answer = (' :8ball: oui.')
        }

        message.reply(`${answer}`);
    }
}