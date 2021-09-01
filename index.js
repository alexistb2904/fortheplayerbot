const fs = require('fs');
const config = require('./config.json');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.login(process.env.token)

client.on('debug', (info) => {
    console.log(info);
});

client.on('ready', () => {
    client.user.setPresence({
        activity: {
            name: '𝙵̲𝙾̲𝚁̲ ̲𝚃̲𝙷̲𝙴̲ ̲𝙿̲𝙻̲𝙰̲𝚈̲𝙴̲𝚁̲',
            type: 'WATCHING'
        },
        status: 'Online'
    })
    console.log('Pret!');
});

client.on("message", (message) => {
    if (!message.content.endsWith("Quoi") || message.author.bot) return;
      message.channel.send("feur !");
  });

client.on("message", (message) => {
    if (!message.content.endsWith("Quoi ?") || message.author.bot) return;
      message.channel.send("feur !");
  });

client.on("message", (message) => {
    if (!message.content.endsWith("Quoi?") || message.author.bot) return;
      message.channel.send("feur !");
  });

client.on("message", (message) => {
    if (!message.content.endsWith("quoi") || message.author.bot) return;
      message.channel.send("feur !");
  });

client.on("message", (message) => {
    if (!message.content.endsWith("quoi ?") || message.author.bot) return;
      message.channel.send("feur !");
  });

client.on("message", (message) => {
    if (!message.content.endsWith("quoi?") || message.author.bot) return;
      message.channel.send("feur !");
  });

client.on("message", (message) => {
    if (!message.content.endsWith("Kwa?") || message.author.bot) return;
      message.channel.send("feur !");
  });

client.on("message", (message) => {
    if (!message.content.endsWith("kwa") || message.author.bot) return;
      message.channel.send("feur !");
  });

client.on("message", (message) => {
    if (!message.content.endsWith("kwa ?") || message.author.bot) return;
      message.channel.send("feur !");
  });

client.on("message", (message) => {
    if (!message.content.endsWith("kwa?") || message.author.bot) return;
      message.channel.send("feur !");
  });
  
const init = async() => {
    const languages = require("./helpers/languages");
    client.translations = await languages();
}

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // If command exist
    if (!command) return;

    // Check if command can be executed in DM
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('Cette commande ne peut pas fonctionné dans les DM!');
    }

    // Check if args are required
    if (command.args && !args.length) {
        let reply = `Tu n'as fournis aucun argument, ${message.author}!`;

        if (command.usage) {
            reply += `\nL'usage correct est: \`${config.prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // Check if user is in cooldown
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            // If user is in cooldown
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Tu dois attendre ${timeLeft.toFixed(1)} secondes pour utiliser de nouveau la commande \`${command.name}\` .`);
        }
    } else {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        // Execute command
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Une erreur ses produite lors de l\'execution de la commande, contacte un administateur!');
        }
    }
});
