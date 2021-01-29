const Discord = require('discord.js');
const fetch = require("node-fetch");
const { prefix, version, couleur } = require('../config.json')


module.exports.run = async (client, message, args) => {
    let avatarTag = message.mentions.users.first() || message.author;


    const panda = await fetch("https://some-random-api.ml/img/panda")
        .then(res => res.json())
        .then(json => json.link);

    const embed = new Discord.MessageEmbed()
        .setImage(panda)
        .setColor(couleur)
        .setFooter(version)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())

    message.channel.send(embed);
}
module.exports.help = {
    name: "image-panda",
    aliases: ['image-panda'],
    category: 'image',
    description: "Affiche une image d'un panda.",
    cooldown: 10,
}