const Discord = require('discord.js');
const fetch = require("node-fetch");
const { prefix, version, couleur } = require('../config.json')


module.exports.run = async (client, message, args) => {
    let avatarTag = message.mentions.users.first() || message.author;


    const renard = await fetch("https://some-random-api.ml/img/fox")
        .then(res => res.json())
        .then(json => json.link);

    const embed = new Discord.MessageEmbed()
        .setImage(renard)
        .setColor(couleur)
        .setFooter(version)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())

    message.channel.send(embed);
}
module.exports.help = {
    name: "image-renard",
    aliases: ['image-renard'],
    category: 'image',
    description: "Affiche une image d'un renard.",
    cooldown: 10,
}