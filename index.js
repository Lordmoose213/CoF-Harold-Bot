// Load up the discord.js library and all Prerequisites
require("dotenv").config();
const Discord = require("discord.js");
const { OpusEncoder } = require('@discordjs/opus');
const fs = require('fs');
const { Permissions } = require('discord.js');

//Load response files
const response = require("./response_files/response.json");
const emote = require("./response_files/emotes.json");
const flirt = require("./response_files/flirtingresponses.json");
const aflirt = require("./response_files/alanaflirtingresponses.json");
const agreedisagree = require("./response_files/agreedisagree.json");
const warnings = require("./response_files/warnings.json");

/*
 DISCORD.JS VERSION 12 CODE
*/

//Establish Client
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  //client.user.setActivity(`Manipulating ${client.guilds.cache.size} servers`);
    client.user.setActivity(`with your fate`);
    //gets the current date and sends it in a message in the bot channel
    var today = new Date();
    //Send logon message to Firnando
    client.channels.cache.get('676923663643312128').send('I have awoken now at ' + today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes());
    //Send logon message to UUCC
    client.channels.cache.get('773620818373902348').send('I have awoken now at ' + today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes());
    console.log('Bot activated at ' + today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes())
});

//Send a AFunny in Firnando if a new member joins
client.on("guildMemberAdd", async User => {
    var today = new Date();
    var serverNAME = message.guild.name
    var serverID = message.guild.id
    var today = new Date();
    if (serverID === "642203556312776714") {
        client.channels.cache.get('642203556841127958').send('https://www.youtube.com/watch?v=R2kovI6tpRE');
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' Sent A Funny due to ' + User + ' joining');
    }
});
//yeahhhhh
//Conversation Event listener
client.on("message", async message => {
    //This event will run on every message received.

    //Grab Server ID
    var serverNAME = message.guild.name
    var serverID = message.guild.id

    //Ignore messages in servers without response modules
    if ((serverID == 773618438135873558) || (serverID == 771122861460684870)) return

    //Ignore messages from bots
    if (message.author.bot) return;

    //Ignore messages with our prefix
    if (message.content.startsWith(config.prefix)) return;

    //Grab Message Author
    var senduserID = message.author.id

    //Sanitize Input
    const sanitized = message.content.replace(/[^\w\s]|_/g, "");
    
    //Convert message into array
    const words = sanitized.trim().split(/ +/g);

    //Convert array to lower case
    const lcwords = words.join('|').toLowerCase().split('|');

    /*
     Guaranteed responses
    */

    //Flirting Responses
    if (lcwords.includes("love") && lcwords.includes("harold")) {

        //Check if its Alana
        if (senduserID === "498335873637679117") {

            //Decide what to say
            r = Math.floor(Math.random() * 5)

            //Say it
            message.channel.send(aflirt[r])
            return
        }

        //Otherwise still flirt with them

        //Decide what to say
        r = Math.floor(Math.random() * 3)

        //Say it
        message.channel.send(flirt[r])
        return
    }

    //Good (Time of day) Responses
    if (lcwords.includes("good")) {

        //Check if they said good morning
        if (lcwords.includes("morning")) {
            //Repond
            message.channel.send("Morning has indeed broken, like the first morning, and the Blood God has spoken, like the first day.")
            return
        }

        //Check if they said good night
        if (lcwords.includes("night")) {
            //Respond
            message.channel.send("Good night, do not let me kill you in your sleep, that would be...too easy")
            return
        }

        //Check if they said good afternoon
        if (lcwords.includes("afternoon")) {
            //Respond
            message.channel.send("Good afternoon to you too. Idiot.")
            return
        }

        //Check if they said evening
        if (lcwords.includes("evening")) {
            //Respond
            message.channel.send("Go to bed, you really need to sleep appropriately if you are to fear me")
            return
        }
    }

    //hmm response
    if (lcwords.includes("hmm") && !lcwords[1]) {
        r = Math.floor(Math.random() * 3)

        //Say it
        message.channel.send(warnings[r])
        return
    }

    /*
     Reaction Reponses
    */

    //Decide whether to react to the message
    var r = Math.floor(Math.random() * 12);
    if (r === 6) {
        //Decide what to react with
        var r = Math.floor(Math.random() * (8));
        if (r >= 6) {
            var r = Math.floor(Math.random() * (7));
            message.react(emote[r])
            return
        } else {
            message.react('738061647683387432')
            return
        }
    }

    /*
     Optional Responses
    */

    //Hello responses
    if (lcwords.includes("hello")) {

        //Decide whether to respond
        var r = Math.floor(Math.random() * 5)
        if (r === 4) {

            //Decide what response to use
            var r = Math.floor(Math.random() * 2)
            //0, 1 are for hello response

            //Actually response
            message.channel.send(response[r])
            return
            }
    }

    //Agree/Disagree responses
    if (lcwords.includes("yes") || lcwords.includes("no") || lcwords.includes("disagree") || lcwords.includes("agree")) {

        //Decide whether to respond
        var r = Math.floor(Math.random() * 5)
        if (r === 4) {

            //Decide which response to use
            var r = Math.floor(Math.random() * 6)

            //Send the response
            message.channel.send(agreedisagree[r])
        }
    }

});

//Command Event Listener
client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    //Ignore messages from bots
    if (message.author.bot) return;

    //Ignore messages without prefix
    if (!message.content.startsWith(config.prefix)) return

    //Grab Server ID
    var serverNAME = message.guild.name
    var serverID = message.guild.id

    //Grab Message Author
    const senduserID = message.author.id

    //Get current time
    var today = new Date();

    //Parse commands and arguments
    const args = message.content.slice(2).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //Loop for Administrative Module
    if (serverID == 773618438135873558) {

        //Check for admin roles
        if (message.member.roles.cache.some(r => ["Admin", "Moderator", "Super Moderator", "Staff"].includes(r.name))) {

            //Moderator Help Command
            if (command === "help") {
                message.channel.send("You are viewing the moderator documentation for Harold-bot. \n Congragulations on expressing interesting in learning how to use me, Harold. \n I am here to help you moderate this server with ease and efficiency. Below I will list all of the commands only available to moderators of this server. \n These commands will allow you to do things such as vet users, mute users, and depending on your rank maybe even ban users. \n Since you are viewing this documentation I will assume that you have realized that you will adress my with f!. \n f!help displays this documentation as I am sure you know. \n f!vet (member) will give a member the 'member' role. \n f!mute (member) will mute a member until they are unmuted. \n f!unmute (member) will ummute a member. \n f!kick (member) (reason) will kick a member and alert the rest of the server as to the reason (you do not need one, i'll kick 'em all the same). \n This documentation is incomplete, someone will probably update it in the future, but who really knows.");
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A help command was run by ' + senduserID);
            }
            //Vet Command
            if (command === "vet") {
                //check if a member was mentioned
                let member = message.mentions.members.first();
                if (!member) {
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An empty vet command was run by " + senduserID)
                    return message.reply("Please mention a valid member of this server");
                }
                //give them the role
                var role = member.guild.roles.cache.find(role => role.name === "Member");
                member.roles.add(role);
                message.channel.send("Vetted them");
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A vet command was run by " + senduserID + " against " + member)
                return
            }

            //Mute Command
            if (command === "mute") {
                //check if a member was mentioned
                let member = message.mentions.members.first();
                if (!member) {
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An empty mute command was run by " + senduserID)
                    return message.reply("Please mention a valid member of this server");
                }
                //give them the role
                var role = member.guild.roles.cache.find(role => role.name === "Muted");
                member.roles.add(role);
                message.channel.send("Muted them");
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A mute command was run by " + senduserID + " against " + member)
                return
            }

            //Unmute Command
            if (command === "unmute") {
                //check if a member was mentioned
                let member = message.mentions.members.first();
                if (!member) {
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An empty unmute command was run by " + senduserID)
                    return message.reply("Please mention a valid member of this server");
                }
                //give them the role
                var role = member.guild.roles.cache.find(role => role.name === "Muted");
                member.roles.remove(role);
                message.channel.send("Unmuted them");
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An unmute command was run by " + senduserID + " against " + member)
                return
            }

            //Kick Command
            if (command === "kick") {
                //Check if a member was mentioned
                let member = message.mentions.members.first();
                if (!member) {
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An empty kick command was run by " + senduserID)
                    return message.reply("Please mention a valid member of this server");
                }
                //Check if Harold can kick the member
                if (!member.kickable) {
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A kick command was run against an invalid target by " + senduserID)
                    return message.reply("I cannot kick this user! Do they have a higher role?");
                }

                //Parse Reason for kicking
                let reason = args.slice(1).join(' ');
                if (!reason) {
                    reason = "No reason provided";
                }

                // Now, time for a swift kick in the nuts!
                await member.kick(reason)
                    .catch(error => message.reply(`Sorry ${message.author} I could not kick because of : ${error}`));
                message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An kick command was run by " + senduserID + " against " + member)
                return
            }

            //Ban Command
            if (command === "ban") {
                //Check if a member was mentioned
                let member = message.mentions.members.first();
                if (!member) {
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An empty ban command was run by " + senduserID)
                    return message.reply("Please mention a valid member of this server");
                }
                //Check if Harold can kick the member
                if (!member.bannable) {
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A ban command was run against an invalid target by " + senduserID)
                    return message.reply("I cannot ban this user! Do they have a higher role?");
                }

                //Parse Reason for kicking
                let reason = args.slice(1).join(' ');
                if (!reason) {
                    reason = "No reason provided";
                }

                // Now, time for a swift kick in the nuts!
                await member.ban()
                    .catch(error => message.reply(`Sorry ${message.author} I could not ban because of : ${error}`));
                message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An ban command was run by " + senduserID + " against " + member)
                return
            }

            //Roleadd Command
            if (command === "roleadd") {
                //check if a member was mentioned
                let member = message.mentions.members.first();
                if (!member) {
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An empty roleadd command was run by " + senduserID)
                    return message.reply("Please mention a valid member of this server");
                }

                //check if a role was mentioned
                var role = member.guild.roles.cache.find(role => role.name === args.slice(1).join(" "));
                if (!role) {
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An empty roleadd command was run by " + senduserID)
                    return message.reply("Please give a valid role in this server");
                }
                //give them the role
                member.roles.add(role);
                message.channel.send("Gave it to them");
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A roleadd command was run by " + senduserID + " against " + member + "for role" + role)
                return
            }

            //Roletake Command
            if (command === "roletake") {
                //check if a member was mentioned
                let member = message.mentions.members.first();
                if (!member) {
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An empty roletake command was run by " + senduserID)
                    return message.reply("Please mention a valid member of this server");
                }

                //check if a role was mentioned
                var role = member.guild.roles.cache.find(role => role.name === args.slice(1).join(" "));
                if (!role) {
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An empty roletake command was run by " + senduserID)
                    return message.reply("Please give a valid role in this server");
                }
                //give them the role
                member.roles.remove(role);
                message.channel.send("Took it from them");
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A roletake command was run by " + senduserID + " against " + member + "for role" + role)
                return
            }
        }

        //Return Value if Moderator Command Run by non-Moderator

        //Vet Return Command
        if (command === "vet") {
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A vet command was illegally run by " + senduserID);
            return message.reply("Sorry, you do not have permissions to use this!");
        }

        //Mute Return Command
        if (command === "mute") {
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A mute command was illegally run by " + senduserID);
            return message.reply("Sorry, you do not have permissions to use this!");
        }

        //Unmute Return Command
        if (command === "unmute") {
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An unmute command was illegally run by " + senduserID);
            return message.reply("Sorry, you do not have permissions to use this!");
        }

        //Kick Return Command
        if (command === "kick") {
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A kick command was illegally run by " + senduserID);
            return message.reply("Sorry, you do not have permissions to use this!");
        }

        //Roleadd Return Command
        if (command === "roleadd") {
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A roleadd command was illegally run by " + senduserID);
            return message.reply("Sorry, you do not have permissions to use this!");
        }

        //Roletake Return Command
        if (command === "roletake") {
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A roletake command was illegally run by " + senduserID);
            return message.reply("Sorry, you do not have permissions to use this!");
        }
    }

    //Loop for Firnando Module
    if ((serverID == 642203556312776714) || (serverID == 771122861460684870)) {

        //Say Command
        if (command === "say") {
            // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
            // To get the "message" itself we join the `args` back into a string with spaces: 
            const sayMessage = args.join(" ");
            //check if there is content in the message to be said
            if (!sayMessage) {
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An empty f!say command was run by " + senduserID)
                return message.channel.send("Please include a string after f!say for me to say")
            }
            // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
            message.delete().catch(O_o => { });
            // And we get the bot to say the thing: 
            message.channel.send(sayMessage);
            // log this in the console
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' An f!say command was run by ' + senduserID);
            return
        }

        //HailAbsolute Command
        if (command === "hailabsolute") {
            client.channels.cache.get('642204078100709406').send('Hail Firnando!');
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A HailAbsolute command was run by ' + senduserID);
            return
        }

        //Hail Firnando Command
        if (command === "hail") {
            message.channel.send("HAIL FIRNANDO!");
            message.delete().catch();
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A Hail command was run by ' + senduserID);
            return
        }

        //Hymn Command
        if (command === "hymn") {
            var hymnnum = args.join(" ");
            if (hymnnum == "1") {
                const connection = await message.member.voice.channel.join();
                connection.play("Mark's_Poem.mp3");
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " hymn number " + hymnnum + " was played by " + senduserID)
                return
            } else if (hymnnum == "2") {
                const connection = await message.member.voice.channel.join();
                connection.play("FirnandoHymn2.mp3");
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " hymn number " + hymnnum + " was played by " + senduserID)
                return
            } else if (hymnnum == "3") {
                const connection = await message.member.voice.channel.join();
                connection.play("Alana's_Hymn.mp3");
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " hymn number " + hymnnum + " was played by " + senduserID)
                return
            } else {
                message.channel.send('that is not a valid hymn');
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " invalid hymn number " + hymnnum + " was attempted to be played by " + senduserID);
                return
            }
        }

        //Hymnlist Command
        if (command === "hymnlist") {
            message.channel.send("Here are your hymn options: \n    1. The Holy Church \n    2. Untitled \n    3. The Cleaved One's Prayer");
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A hymnlist command was run by " + senduserID);
            return
        }

        //TTS
        if (command === "speak") {
            if (senduserID === "500363547994357770" || senduserID === "498335873637679117") {
                var messageindex = args.join(" ");
                if (messageindex == "1") {
                    const connection = await message.member.voice.channel.join();
                    connection.play("./speech_files/speak-hello.wav");
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " message index number " + messageindex + " was played by " + senduserID)
                    return
                } else if (messageindex == "2") {
                    const connection = await message.member.voice.channel.join();
                    connection.play("./speech_files/speak-affirmative.wav");
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " message index number " + messageindex + " was played by " + senduserID)
                    return
                } else if (messageindex == "3") {
                    const connection = await message.member.voice.channel.join();
                    connection.play("./speech_files/speak-not-life.wav");
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " message index number " + messageindex + " was played by " + senduserID)
                    return
                } else if (messageindex == "4") {
                    const connection = await message.member.voice.channel.join();
                    connection.play("./speech_files/speak-no.wav");
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " message index number " + messageindex + " was played by " + senduserID)
                    return
                } else if (messageindex == "5") {
                    const connection = await message.member.voice.channel.join();
                    connection.play("./speech_files/speak-salutations.wav");
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " message index number " + messageindex + " was played by " + senduserID)
                    return
                } else if (messageindex == "6") {
                    const connection = await message.member.voice.channel.join();
                    connection.play("./speech_files/speak-threaten-russian.wav");
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " message index number " + messageindex + " was played by " + senduserID)
                    return
                } else if (messageindex == "7") {
                    const connection = await message.member.voice.channel.join();
                    connection.play("./speech_files/speak-vows.wav");
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " message index number " + messageindex + " was played by " + senduserID)
                    return
                } else if (messageindex == "8") {
                    const connection = await message.member.voice.channel.join();
                    connection.play("./speech_files/speak-i-do.wav");
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " message index number " + messageindex + " was played by " + senduserID)
                    return
                } else if (messageindex == "9") {
                    const connection = await message.member.voice.channel.join();
                    connection.play("./speech_files/speak-reception.wav");
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " message index number " + messageindex + " was played by " + senduserID)
                    return
                } else if (messageindex == "10") {
                    const connection = await message.member.voice.channel.join();
                    connection.play("./speech_files/speak-ribcage.wav");
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " message index number " + messageindex + " was played by " + senduserID)
                    return
                } else {
                    message.channel.send('that is not a valid message');
                    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " an invalid message index number " + messageindex + " was called by " + senduserID)
                    return
                }
            }
            message.channel.send("You do not have permission to run that command")
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " " + senduserID + " attempted to run a f!speak command")
            return
        }

        //Heresy Command
        if (command === "heresy") {
            message.delete().catch();
            message.channel.send("https://cdn.discordapp.com/attachments/520767802806632448/746165091782885397/959665d8cef104afee8d5ad7a71a8d50.jpg");
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A heresy command was run by " + senduserID);
            return
        }

        //Appreciate
        if (command === "appreciate") {
            message.channel.send("Why thank you for appreciating me, I shall now procede to submit my claim on your soul to the devil.")
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A appreciate command was run by " + senduserID);
            return
        }

        //Laminate Command
        if (command === "laminate") {
            message.channel.send("light wood laminate")
            for (let i = 0; i < 10; i++) {
                setTimeout(function () { message.channel.send("light wood laminate"); }, 2500);
            }
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A laminate command was run by " + senduserID);
            return
        }
    }

        //General Commands

        //Ping Command
        if (command === "ping") {
            // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
            // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
            const m = await message.channel.send("Ping?");
            m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A ping command was run by ' + senduserID)
            return
        }

        //Hello Command
        if (command === "hello") {
            message.channel.send("hello! nice to meet you");
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A hello command was run by ' + senduserID);
            setTimeout(function () { message.channel.send("although I do not really know why you are talking to a bot tbh"); }, 2000);
            return
        }

        //ThisChannel Command
        if (command === "thischannel") {
            //get the channel ID
            const channelID = message.channel
            //send it into the channel
            message.channel.send("This channel has an ID of: " + channelID);
            // log this in the console
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A ThisChannel command was run by ' + senduserID);
            return
        }

        //ThisServer Command
        if (command === "thisserver") {
            message.channel.send("This server, " + serverNAME + " has an ID of: " + serverID);
            // log this in the console
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A ThisServer command was run by ' + senduserID);
            return
        }

        //ID Command
        if (command === "id") {
            //this returns the user ID of the message author
            // And we get the bot to say the thing: 
            message.channel.send("Your user ID: " + senduserID);
            // log this in the console
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' An ID command was run by ' + senduserID);
            return
        }

        //VC Join Command
        if (command === "join") {
            if (message.member.voice.channel) {
                message.member.voice.channel.join();
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A join command was successfully run by " + senduserID);
                return
            } else {
                message.channel.send("You must be in a voice channel to preform this operation.");
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A join command was improperly run by " + senduserID);
                return
            }
        }

        //VC Leave Command
        if (command === "leave") {
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                connection.disconnect();
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A leave command was successfully run by " + senduserID);
                return
            } else {
                message.channel.send("You must be in a voice channel to preform this operation");
                console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A leave command was improperly run by " + senduserID);
                return
            }
        }

        //Day Command
        if (command === "day") {
            //this will return the day, with 0 being sunday and 6 being saturday
            message.channel.send('today is ' + today.getDay());
            message.channel.send('today is also ' + today.toDateString());
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A day command was run by ' + senduserID);
            return
        }

        //Whatis Command
        if (command === "whatis") {
            const it1 = Number(args[0])
            const it2 = Number(args[2])
            if (args[1] === "x") {
                var result = (it1 * it2)
                message.channel.send(result);
            } else if (args[1] === "/") {
                var result = (it1 / it2)
                message.channel.send(result);
            } else if (args[1] === "+") {
                var result = (it1 + it2)
                message.channel.send(result);
            } else if (args[1] === "-") {
                var result = (it1 - it2)
                message.channel.send(result);
            } else {
                message.channel.send("please use the format (first number) (operator) (second number)")
            }
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A whatis command was run by " + senduserID)
            return
        }

        //Random Command
        if (command === "random") {
            const min = Number(args[0])
            const max = Number(args[1])
            if (!min) {
                message.channel.send("Please use the format (lowest number) (highest number) and I will return a number between those values inclusivly")
                return
            }
            if (!max) {
                message.channel.send("Please use the format (lowest number) (highest number) and I will return a number between those values inclusivly")
                return
            }
            var random = Math.floor(Math.random() * (max + 1 - min)) + min;
            message.channel.send("Your number is " + random)
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A random command was run by " + senduserID)
            return
        }

    // Dice Command
    if (command === "dice") {
        //Declare dtotal
        var dtotal = 0;
        //Get the argument
        var argument = args[0];

        // Fail out if no argument given
        if (!argument) {
            message.channel.send("Please specify the number of sides on the dice you would like to roll, as well as the number of dice and the modifier");
            return
        }

        //Determine the number of dice to roll
        var dnum = argument.split("d");

        //Parse dnum and initial rest of message as dside
        if (!dnum[1]) {
            var dside = dnum[0]
            var dnum = 1
        } else {
            var dside = dnum[1]
            var dnum = dnum[0]
        }

        //Correct dnum if it has no value
        if (!dnum[0]) var dnum = 1;

        //Determine sides of the dice if a modifier was given
        var dside = dside.split("+");

        //Parse dside
        if (!dside[1]) {
            var dside = dside[0].split("-"); //causes an error

            if (!dside[1]) {
                var dmod = 0
                var dside = dside[0]
            } else {
                var dmod = -1 * dside[1]
                var dside = dside [0]
            }
        } else {
            var dmod = dside[1]
            var dside = dside[0]
        }

        //Ensure that dnum is not too large
        if (dnum > 1000) {
            message.channel.send("I refuse")
            return
        }
        //Save the number of dice roles to a separate variable
        var dnumsave = dnum;
        //Preform the dice roles
        while (dnum > 0) {
            var random = Math.floor(Math.random() * (dside)) + 1; // Generate the random number
            var dtotal = dtotal + random; // Add the number to the total
            var dnum = dnum - 1; // Decrease dnum by 1 
        }

        var dtotalINT = parseInt(dtotal, 10);
        var dmodINT = parseInt(dmod, 10);
        //Add the modifier
        var dtotal = dtotalINT + dmodINT

        //Print the output
        message.channel.send("Rolling a " + dside + "-sided dice " + dnumsave + " times and then adding a modifier of " + dmod + ", I got " + dtotal);
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A dice command was run by " + senduserID)
        return
        // message.channel.send("dnum[0]= " + dnum[0] + "\ndnum[1]= " + dnum[1] + "\ndside[0]= " + dside[0] + "\ndside[1]= " + dside[1] + "\ndmod=" + dmod + "\ndtotalINT= " + dtotalINT + "\ndmodINT= " + dmodINT); //Prints all important variables
    }
});

client.login(process.env.BOT_TOKEN);