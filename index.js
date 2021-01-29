////_    _        __ _ _
///| |  | |      / _| (_)
///| |__| | __ _| |_| |_ _ __   __ _  ___ _ __
// |  __  |/ _` |  _| | | '_ \ / _` |/ _ \ '__|
// | |  | | (_| | | | | | | | | (_| |  __/ |
// |_|  |_|\__,_|_| |_|_|_| |_|\__, |\___|_|
//                              __/ |
//

const Discord = require('discord.js');
const  client = new Discord.Client();

const { prefix, token} = require('./config.json')

const fs = require('fs');

client.login(token);

client.commands = new Discord.Collection();

fs.readdir("./commandes/", (error, f) =>{
    if(error) console.log(error);
    console.log(error);
    console.log(`${f.length} commandes en chargement`);

    let commandes = f.filter(f => f.split(".").pop() ==="js");
    if(commandes.length <= 0) return console.log('aucune commande trouvée !');

    commandes.forEach((f) => {
        let commande = require(`./commandes/${f}`);
        console.log(`${f} commandes chargée !`);

        client.commands.set(commande.help.name, commande)
    });
});

fs.readdir("./event/", (error, f) => {
    if(error) console.log(error);
    console.log(error);
    console.log(`${f.length} event en chargement`);

    f.forEach((f) => {
        const events = require(`./event/${f}`);
        const event = f.split(".")[0];

        client.on(event, events.bind(null, client));
        console.log(`${f} event chargée !`);
    });
});
