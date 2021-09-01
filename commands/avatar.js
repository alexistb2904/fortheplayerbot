module.exports = {
    name: "avatar",
    enabled: true,
    guildOnly: false,
    aliases: ["Avatar", "AVATAR", "AvAtAr"],
    nsfw: false,
    ownerOnly: false,
    execute(message, args) {
        const Discord = require('discord.js');
        const client = new Discord.Client();
        if (!message.mentions.users.size) {
            message.channel.send('Tu n\'as mentionner personne');
            return;
        } else {
            let user = message.mentions.users.first() || message.author;
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username} Voici l\'avatar de ${user.tag}`)
                .setColor(0x348fcd)
                .setTitle('')
                .setImage(`${user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 })}`)
                .setFooter('𝙵̲𝙾̲𝚁̲ ̲𝚃̲𝙷̲𝙴̲ ̲𝙿̲𝙻̲𝙰̲𝚈̲𝙴̲𝚁̲')
                .setTimestamp()
            message.channel.send({ embed });
        }
    },
};