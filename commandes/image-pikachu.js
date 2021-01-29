const Discord = require('discord.js');
const fetch = require("node-fetch");
const { prefix, version, couleur } = require('../config.json')


module.exports.run = async (client, message, args) => {
    let avatarTag = message.mentions.users.first() || message.author;


    const pikachu = await fetch("https://some-random-api.ml/img/pikachu")
        .then(res => res.json())
        .then(json => json.link);

    const embed = new Discord.MessageEmbed()
        .setImage(pikachu)
        .setColor(couleur)
        .setFooter(version)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())

    message.channel.send(embed);
}
module.exports.help = {
    name: "image-pikachu",
    aliases: ['image-pikachu'],
    category: 'image',
    description: "Affiche une image d'un pikachu.",
    cooldown: 10,
}