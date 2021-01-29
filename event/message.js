const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;


module.exports = async (bot, message) => {
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commande = args.shift()

    const cmd = bot.commands.get(commande);

    if(!cmd) return;

    cmd.run(bot, message, args);

    const salonLogs = bot.channels.cache.get(config.salonLogsID) // on get le salon avec son id stocké dans config.json
    if(!salonLogs) return; // si on ne trouves pas le salon, on arrête

    let embed = new Discord.MessageEmbed()
        .setAuthor(`Commande exécutée par ${message.author.tag}`, message.guild.iconURL({dynamic: true}))
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`Commande **${cmd.help.name}**`)
        .addField("Lieu d'exécution de commande", message.guild.id)
        .addField("ID d'utilisateur", message.author.id)
        .addField("Lien vers la commande", `https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
        .setColor(config.couleur)
        .setTimestamp()
        .setFooter(config.version, bot.user.displayAvatarURL())

    salonLogs.send(embed)
}