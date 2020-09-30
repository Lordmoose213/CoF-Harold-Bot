// Load up the discord.js library
require("dotenv").config();
const Discord = require("discord.js");
const { OpusEncoder } = require('@discordjs/opus');
const fs = require('fs');
const { Permissions } = require('discord.js');

/*
 DISCORD.JS VERSION 12 CODE
*/

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
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
    client.channels.cache.get('676923663643312128').send('I have awoken now at ' + today.getHours() + ":" + (today.getMinutes()<10?'0':'')+today.getMinutes());
    console.log('Bot activated at ' + today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes())
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("guildMemberAdd", async User => {
    var today = new Date();
    client.channels.cache.get('642203556841127958').send('https://www.youtube.com/watch?v=R2kovI6tpRE');
    console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' Sent A Funny due to ' + User + ' joining');
});


client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;

    // Also good practice to ignore any message that does not start with our prefix, 
    // which is set in the configuration file.
    if (!message.content.startsWith(config.prefix)) return;

    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Let's go with a few common example commands! Feel free to delete or change those.

    if (command === "help") {
        const senduserID = message.author
        var today = new Date();
        message.channel.send("You are viewing the documentation for Harold-bot. If you are reading this you presumable know that f! is how you shall adress me. \n    f!help displays this message, as I hope you know. \n    f!ping will display the ping information for my host server. \n    f!say (text) will force me to say whatever it is you just said, so be responsible. Oh, it also deletes the command. \n    f!hello will trigger me to be polite and respond. \n    f!thischannel will return the channel ID of the current channel. \n    f!hailabsolute will send an appropriate message into the #hail-firnando chat. \n    f!hail will send an appropriate message into the current chat and delete the command message. \n    f!id will return your user ID. \n    f!day will list current day. \n    f!join will cause me to join the voice channel you are in. \n    f!leave will cause me to leave my voice channel (you must be in a voice channel for this command to work). \n    f!hymn # will cause me to play the hymn with whatever number was specified. \n    f!hymnlist will list all available hymns. \n    f!mute will allow admins to mute a member. \n    f!unmute will allow admins to unmute a member. \n    f!whatis (number) (operator) (number) this command will cause me to add, subtract, multiply, or divide the two given numbers. \n    f!random (number) (number) will cause me to return a random number between those two numbers inclusivly. \nThat is all the functionality I have right now, but expect more in the future.");
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A help command was run by ' + senduserID);
    }

    if (command === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const senduserID = message.author
        var today = new Date();
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A ping command was run by ' + senduserID)
    }


    if (command === "say") {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
        // To get the "message" itself we join the `args` back into a string with spaces: 
        const sayMessage = args.join(" ");
        //this returns the user ID of the message author
        const senduserID = message.author
        var today = new Date();
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
    }

    if (command === "hello") {
        const senduserID = message.author
        var today = new Date();
        message.channel.send("hello! nice to meet you");
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A hello command was run by ' + senduserID);
        setTimeout(function () {message.channel.send("although I dont really know why you are talking to a bot tbh"); }, 2000);
    }

    if (command === "channels") {
        //this command really doesn't do anything yet, although later I would like it to tell the number of channels
        const senduserID = message.author
        var today = new Date();
        message.channel.send("they exist");
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A channel command was run by ' + senduserID);
    }

    if (command === "thischannel") {
        //get the channel ID
        const channelID = message.channel
        const senduserID = message.author
        var today = new Date();
        //send it into the channel
        message.channel.send("This channel has an ID of: " + channelID);
        // log this in the console
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A ThisChannel command was run by ' + senduserID);
    }

    if (command === "hailabsolute") {
        const senduserID = message.author
        var today = new Date();
        client.channels.cache.get('642204078100709406').send('Hail Firnando!');
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A HailAbsolute command was run by ' + senduserID);
    }

    if (command === "hail") {
        const senduserID = message.author
        var today = new Date();
        message.delete().catch();
        message.channel.send("HAIL FIRNANDO!");
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A Hail command was run by ' + senduserID);
    }

    if (command === "id") {
        //this returns the user ID of the message author
        const senduserID = message.author
        var today = new Date();
        // And we get the bot to say the thing: 
        message.channel.send("Your user ID: " + senduserID);
        // log this in the console
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' An ID command was run by ' + senduserID);
    }

    if (command === "join") {
        const senduserID = message.author
        var today = new Date();
        if (message.member.voice.channel) {
            message.member.voice.channel.join();
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A join command was successfully run by " + senduserID);
        } else {
            message.channel.send("You must be in a voice channel to preform this operation.");
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A join command was improperly run by " + senduserID);
        }
    }

if (command === "leave") {
    const senduserID = message.author
    var today = new Date();
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            connection.disconnect();
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A leave command was successfully run by " + senduserID);
        } else {
            message.channel.send("You must be in a voice channel to preform this operation");
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A leave command was improperly run by " + senduserID);
        }
    }

    if (command === "day") {
        //this will return the day, with 0 being sunday and 6 being saturday
        const senduserID = message.author
        var today = new Date();
        message.channel.send('today is ' + today.getDay());
        message.channel.send('today is also ' + today.toDateString());
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ' A day command was run by ' + senduserID);
    }

    if (command === "hymn") {  
        const senduserID = message.author
        var today = new Date();
        var hymnnum = args.join(" ");
        if (hymnnum == "1") {
            const connection = await message.member.voice.channel.join();
            connection.play("Mark's_Poem.mp3");
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " hymn number " + hymnnum + " was played by " + senduserID)
        } else if (hymnnum == "2") {
            const connection = await message.member.voice.channel.join();
            connection.play("FirnandoHymn2.mp3");
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " hymn number " + hymnnum + " was played by " + senduserID)
        } else if (hymnnum == "3") {
            const connection = await message.member.voice.channel.join();
            connection.play("Alana's_Hymn.mp3");
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " hymn number " + hymnnum + " was played by " + senduserID)
        } else {
            message.channel.send('that is not a valid hymn');
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " invalid hymn number " + hymnnum + " was attempted to be played by " + senduserID);
        }
    }

    if (command === "hymnlist") {
        const senduserID = message.author
        var today = new Date();
        message.channel.send("Here are your hymn options: \n    1. The Holy Church \n    2. Untitled \n    3. The Cleaved One's Prayer");
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A hymnlist command was run by " + senduserID);
    }

    if (command === "mute") {
        const senduserID = message.author
        var today = new Date();
        //Check if the command executer has permission to run this
        if (!message.member.roles.cache.some(r => ["Admin"].includes(r.name))) {
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A mute command was illegally run by " + senduserID);
            return message.reply("Sorry, you don't have permissions to use this!");
        }
        //check if a member was mentioned
        let member = message.mentions.members.first();
        if (!member) {
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An empty mute command was run by " + senduserID)
            return message.reply("Please mention a valid member of this server");
        }
        var role = member.guild.roles.cache.find(role => role.name === "Muted");
        member.roles.add(role);
        message.channel.send("Muted them");
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A mute command was run by" + senduserID + " against " + member)
    }

    if (command === "unmute") {
        const senduserID = message.author
        var today = new Date();
        //Check if the command executer has permission to run this
        if (!message.member.roles.cache.some(r => ["Admin"].includes(r.name))) {
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An unmute command was illegally run by " + senduserID);
            return message.reply("Sorry, you don't have permissions to use this!");
        }
        //check if a member was mentioned
        let member = message.mentions.members.first();
        if (!member) {
            console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An empty mute command was run by " + senduserID)
            return message.reply("Please mention a valid member of this server");
        }
        var role = member.guild.roles.cache.find(role => role.name === "Muted");
        member.roles.remove(role);
        message.channel.send("Unmuted them");
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " An unmute command was run by" + senduserID + " against " + member)
    }

    if (command === "heresy") {
        const senduserID = message.author
        var today = new Date();
        message.delete().catch();
        message.channel.send("https://cdn.discordapp.com/attachments/520767802806632448/746165091782885397/959665d8cef104afee8d5ad7a71a8d50.jpg");
        console.log(today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + " A heresy command was run by " + senduserID);
    }

    if (command === "whatis") {
        const senduserID = message.author
        var today = new Date();
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
    }

    if (command === "random") {
        const senduserID = message.author
        var today = new Date();
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
    }


/*
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.cache.some(r=>["Administrator", "Moderator"].includes(r.name)))
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.cache.some(r=>["Administrator"].includes(r.name)))
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.messages.fetch({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
    */
});

client.login(process.env.BOT_TOKEN);