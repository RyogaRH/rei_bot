const { Client } = require("discord.js");
const client = new Client();
const Discord = require("discord.js");
const ms = require("ms");
const moment = require("moment");
const marsnpm = require("marsnpm");
const akaneko = require("akaneko");
const star = require("star-labs");
const clientN = require("nekos.life")
const neko = new clientN();
const { Util } = require("discord.js");

client.on("ready", () => {
    console.log(`El bot ${client.user.tag} esta prendido`)
});


client.on("ready", () => {
  setInterval(function () {
      let names = ["re¡help", `Un total de ${client.guilds.cache.size} servidores`, `Todo regresara a la nada`, "re¡invite", "re¡bugreport para reportar bugs", "Denme un poco de atencion"]
      let random = Math.floor((Math.random() * names.length))
      let stats = names[random]
      client.user.setActivity({
          name: `${stats}`, 
          type: "WATCHING"
      })
  }, 10000
      )
})



function formatDia(template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}

var prefix = "re¡" 
client.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;
    if(!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    if( command === "calculate"){
        let signos = ["*", "/", "+", "-", "x", "~"];
        if(!args[0]) return message.channel.send("Que quieres que calcule?")
        if(isNaN(args[0])) return message.channel.send(`Solo se ponen números,a exepcion de los signos que son los siguentes \`+\`, \`*\`, \`-\`, \`/\`, \`x\`, \`~\``)
        if(!signos.some(x => x.toLowerCase(message.content))) return message.channel.send(`Debes de colocar alguno de los siguientes signos \`+\`, \`*\`, \`-\`, \`/\`, \`x\`, \`~\``)
        if(!args[2]) return message.channel.send('No pusiste segundo numero o el simbolo')
        if(isNaN(args[2])) return message.channel.send('Solo se ponen números, a exepcion de los signos que son los siguientes \`+\`, \`*\`, \`-\`, \`/\`, \`x\`, \`~\`')
        let signo = args[1];
        if(signo === "x"){
        signo = '*'
      }
      if(signo === '~'){
        signo = '/'
      }
      try {
        const resultado = eval(args[0]+signo+args[2]);
        const calcula = new Discord.MessageEmbed()
      .setTitle('Resultado del calculo')
      .setColor('RANDOM')
      .addField("Calculo", '```js\n'+args[0]+' '+signo+' '+args[2]+'```')
      .addField('Resultado', '```js\n'+await resultado+'```')

      return message.channel.send(calcula); 
      } catch (e) { 
      const err = new Discord.MessageEmbed()
      .setDescription('Ocurrido un error al hacer el calculo\n\n`'+e.message+'`') 
      .setColor('RANDOM')
      return message.channel.send(err); 
    }
    }   else if(command === "hackban"){
        let permisos = message.member.hasPermission("BAN_MEMBERS")
      if (!permisos) {
        const sinperm = new Discord.MessageEmbed()
        .setTitle("No tienes permisos")
        .setDescription("Requieres \`BAN_MEMBERS\`")
        .setColor("RED")
        return message.channel.send(sinperm)
      }

      let permisosbot = message.guild.me.hasPermission("BAN_MEMBERS") 
      if (!permisosbot) {
        const sinper = new Discord.MessageEmbed()
        .setTitle("No tengo permisos")
        .setDescription("Requiero \`BAN_MEMBERS\`")
        .setColor("RED")
        return message.channel.send(sinper)
      }
     let id = args.join(" ")
     if (!id) {
       const sinid = new Discord.MessageEmbed()
       .setDescription("Proporciona una id valida")
       .setColor("RED")
       return message.channel.send(sinid)
     }

     let member = await client.users.fetch(id)
      message.guild.members.ban(member.id) 
      const banead = new Discord.MessageEmbed()
      .setTitle("Baneo exitoso")
      .setDescription("El usuario \`"+member.username+"\` fue baneado de este servidor")
      .setColor("GREEN")
      .setTimestamp()
      message.channel.send(banead)
     } else if(command === "cooldown"){
        if (!message.member.permissions.has(["ADMINISTRATOR", "MANAGE_CHANNELS"])) {
          const noper = new Discord.MessageEmbed()
          .setTitle("No tienes permisos")
          .setDescription("Requieres \`ADMINISTRATOR\` o \`MANAGE_CHANNELS\`")
          .setColor("RANDOM")
          .setTimestamp()
          return message.channel.send(noper)
        }
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
          const sinperm = new Discord.MessageEmbed()
          .setTitle("No tengo permisos")
          .setDescription("Requiero \`MANAGE_CHANNELS\`")
          .setColor("RED")
          .setTimestamp()
          return message.channel.send(sinperm)
        }
        let canal = message.mentions.channels.first(),
        tiempo = args.slice(1).join(" ");
        if(!canal) tiempo = args.join(" "), canal = message.channel; 
        if ( args[0] === "off") {
          canal.setRateLimitPerUser(0);
          const apagado = new Discord.MessageEmbed()
          .setTitle("Listo")
          .setDescription(`Desactive el cooldown en el canal <#${canal.id}>`)
          .setColor("GREEN")
          .setTimestamp()
          return message.channel.send(apagado)
        }
        if (!tiempo) {
          const sint = new Discord.MessageEmbed()
          .setTitle("Falta algo")
          .setDescription("Incluye el tiempo en horas y/o minutos")
          .setColor("RANDOM")
          .setTimestamp()
          return message.channel.send(sint)
        }

        let convercion = ms(tiempo);
        let segundos = Math.floor(convercion / 1000);
        if (segundos > 21600) {
          const exede = new Discord.MessageEmbed()
          .setDescription("El cooldown debe de ser menor a 6h")
          .setColor("RANDOM")
          return message.channel.send(exede)
        }
        else if(segundos < 1) {
          const mas = new Discord.MessageEmbed()
          .setDescription("El cooldown debe ser mayor o igual a 1s")
          .setColor("RANDOM")
          return message.channel.send(mas)
        }
        await canal.setRateLimitPerUser(segundos);
        const ya = new Discord.MessageEmbed()
        .setTitle("Listo")
        .setDescription(`El canal <#${canal.id}> tiene un cooldow de \`${ms(ms(tiempo), {long: true})}\` `)
        .setColor("GREEN")
        .setTimestamp()
        return message.channel.send(ya)
    } else if(command === "infouser"){
        const member = message.mentions.members.first() || message.member;
        function formatDate (template, date) {
          var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
          date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
          return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
            return template.split(specs[i]).join(item)
          }, template)
        }
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM") 
        .setDescription("*__INFORMACIÓN DEL USUARIO:__*") 
        .addField("**Nombre**:", "\` " + `${member.user.tag}` + "\`")
        .addField("*ID*:", ` \`${member.user.id}\` ` )
        .addField("*Apodo del usuario*:", `${member.nickname !== null ? `${member.nickname}` : 'No tiene apodo en este servidor'}`, true) 
        .addField("*Fecha de Ingreso al Servidor:*", formatDate('DD/MM/YYYY, a las HH:mm:ss', member.joinedAt))
        .addField("*Cuenta Creada:*", formatDate('DD/MM/YYYY, a las HH:mm:ss', member.user.createdAt))
        .addField("*Roles:*", member.roles.cache.map(roles => `\`${roles.name}\``).join(' // '))
        .addField("*Boostea?*:", member.premiumSince ? '**Esta boosteando **' : '*No esta boosteando*')
        .setThumbnail (member.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
        .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL({dynamic: true})}`)
      message.channel.send(embed)
    } else if(command === "infochannel"){
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
        if(!channel) return message.channel.send("Menciona el canal que quieres que te proporcione la informacion")

        const cha = new Discord.MessageEmbed()
        .addField(`Nombre:`, `${Discord.Util.escapeMarkdown(channel.name)}`)
        .addField(`ID:`, ` ${channel.id}`)
        .addField(`Tipo`, ` ${channel.type}`)
        .addField(`Es NSFW?`, `${channel.nsfw}`)
        .setColor("RANDOM")
        .setTimestamp()
        message.channel.send(cha)
     } else if(command === "avatar"){
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author; 
        const avatar = new Discord.MessageEmbed()
        .setDescription(`[Descargar avatar](${user.displayAvatarURL({
            format: `png`,
            dynamic: true
        })})`)
        .setImage(user.displayAvatarURL({format: `png`, dynamic: true, size: 4096}))
        .setColor("RANDOM")
        .setFooter(`Pedido por: ${message.member.displayName}`);
        const embedos = new Discord.MessageEmbed()
            .setTitle("Icono del servidor")
            .setColor("RANDOM")
            .setImage(message.guild.iconURL({size : 2048, dynamic: true}))
            .setTimestamp() 
            if(message.content.endsWith('--s')) return message.channel.send(embedos)
        message.channel.send(avatar)
     } else if(command === "roleinfo"){
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        const mal = new Discord.MessageEmbed()
       .setAuthor("Error")
       .setDescription("Debes de mencionar o poner la id de un rol valido")
       .setColor("RED")
       .setTimestamp()
        if(!role) return message.channel.send(mal)
        const rol = new Discord.MessageEmbed()
        .setDescription("Informacion sobre el rol")
        .addField("Nombre", `${role.name}`)
        .addField("ID:", `${role.id}`)
        .addField("Pocision:", `${role.rawPosition}`)
        .addField("Codijo Hex:", `${role.hexColor}`)
        .addField("El rol esta elevado?", `${role.hoist}`)
        .setColor("RANDOM")
        message.channel.send(rol)
     } else if(command === "love" || command === "ship"){
        let users =  message.mentions.users.first();
        if (!users) return message.reply("Menciona a alguien porfavor!") 
        if (users === message.author) return message.channel.send("Amigo valorate");
        if (users === client.user) return message.channel.send("*No puedo calcular eso conmigo!*")
     
        const random = Math.floor(Math.random() * 100);
        let heard = "";
    
         if(random < 50){
           heard=':broken_heart:';
   
       }else if(random < 80){
           heard=':sparkling_heart: '; 
   
       }else if(random < 101){
           heard=':heart:';
       }
       
       
   let resp = [`Yo creo que ${message.author.username} & ${users.username} se aman:`,` yo creo que ${message.author.username} & ${users.username} es un sip con el :`]
     
     let msg = resp[Math.floor(Math.random() * resp.length)]    
     const embed = new Discord.MessageEmbed()
       .setAuthor(`${msg}`)
       .setDescription(`${heard} ${random} %${heard}`)  
       .setColor(0xff4d4d)
   message.channel.send(embed)
     } else if(command === "ppt"){
        const moves = { piedra: 0, papel: 1, tijera: 2};
        function wrapIndex(i, i_max) {
            return ((i % i_max) + i_max) % i_max;
  }
  function determine_win(inputs) {
    let i = moves[inputs[0]],
      j = moves[inputs[1]];

    return wrapIndex(i + -j, 3); 
  }
  function uppercase_first(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  if (!args[0]) return message.channel.send("Elige una de las opciones \`piedra\` \`papel\` o \`tijeras\`")
  if (!args[0] in moves)
  return message.repy("Elige una opcion valida");
  let machineInput = Object.keys(moves)[Math.floor(Math.random() * 3)];
  let winner = determine_win([args[0], machineInput]);
  const embed = new Discord.MessageEmbed()
    .setTitle("Piedra, papel o tijera.")
    .addFields(
      {
        name: `Elegiste `,
        value: uppercase_first(args[0]),
        inline: true
      },
      {
        name: "Yo elegi",
        value: uppercase_first(machineInput), 
        inline: true
      }
    )
    .setColor("RANDOM");
    if (winner == 0) {
        embed.setDescription("Empatamos")
        embed.setImage("https://imgur.com/gndavXl.gif");
        return message.channel.send({ embed });
      } else if (winner == 1) {
        embed.setDescription("Ganaste, felicidades")
        embed.setImage("https://i.imgur.com/jeyFxWz.gif");
        return message.channel.send({ embed });
      } else if (winner == 2) {
        embed.setDescription("Gane, te deseo suerte para la proxima")
        embed.setImage(`https://i.imgur.com/9Z2ZvtS.gif`)
        return message.channel.send({ embed });
      }
     } else if(command === "addrole"){
        if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
            return message.channel.send(`No tengo los permisos necesarios \`MANAGE_ROLES\``)
          }
          
          if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.channel.send('No tienes los permisos necesarios para hacer esto')
          }
          
          let persona = message.mentions.members.first() || 
            message.guild.members.resolve(args[0]) 
            
          if (!persona) return message.channel.send(`No especificaste a quien le pondre el rol`)
          
          if(!args[1]){
            return message.channel.send(`No especificaste que rol le agregare a el usuario`)
          }
          
          let rol = message.mentions.roles.first() || 
            message.guild.roles.resolve(args[1]) || 
            message.guild.roles.cache.find(r => r.name == args.slice(1).join(' ')) 
          
          if (!rol) {
            return message.channel.send(`No encontre ese rol en este servidor`)
          } else if (!rol.editable) {
            return message.channel.send(`No puedo darle ese rol a nadie debido a que es superior al mio`)
          } else if (rol.comparePositionTo(message.member.roles.highest) > 0) {
            return message.channel.send(`No puedes darle ese rol a nadie porque es superior al tuyo`)
          }
          
          persona.roles.add(rol)
            .catch(e => message.reply('Ocurrio un **error**'))
            .then(() => {
              message.channel.send(`Le agrege el rol \`${rol.name}\` a \`${persona.user.username}\``)
    
            })
     } else if(command === "removerole"){ //removerole
        if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
            return message.channel.send(`No tengo los permisos necesarios \`MANAGE_ROLES\``)
          }
          
          if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.channel.send('No tienes los permisos necesarios para hacer esto')
          }
          
          let persona = message.mentions.members.first() || 
            message.guild.members.resolve(args[0]) 
            
          if (!persona) return message.channel.send(`No especificaste a quien le quitare el rol`)
          
          if(!args[1]){
            return message.channel.send(`No especificaste que rol le quitare a el usuario`)
          }
          
          let rol = message.mentions.roles.first() || 
            message.guild.roles.resolve(args[1]) || 
            message.guild.roles.cache.find(r => r.name == args.slice(1).join(' ')) 
          
          if (!rol) {
            return message.channel.send(`No encontre ese rol en este servidor`)
          } else if (!rol.editable) {
            return message.channel.send(`No puedo quitarle ese rol a nadie debido a que es superior al mio`)
          } else if (rol.comparePositionTo(message.member.roles.highest) > 0) {
            return message.channel.send(`No puedes quitarle ese rol a nadie porque es superior al tuyo`)
          }
          if(cooldow.has(message.author.id)){
            message.channel.send(message.author.username+ `Puedes utilizar este comando de nuevo dentro de 10 segundos`);
            return;
        }
          persona.roles.remove(rol)
            .catch(e => message.reply('Ocurrio un **error**'))
            .then(() => {
              message.channel.send(`Le removi el rol \`${rol.name}\` a \`${persona.user.username}\``)
              
            })
     } else if(command === "vkick"){
           let permi = message.member.hasPermission('MOVE_MEMBERS');
           if (!permi) return message.channel.send('No tienes suficientes permisos');
      
           let permibot = message.guild.me.hasPermission('MOVE_MEMBERS');
           if(!permibot) return message.channel.send('No tengo permiso `MOVE_MEMBERS` ');
      
           let kickuser= message.mentions.members.first() || message.guild.members.cache.get(args[0])
           if(!kickuser) return message.channel.send('No espesificaste a quien sacare del canal de voz');
      
           if (kickuser.id == message.author.id) return message.channel.send(`No te expulsare del canal de voz, tu puedea hacerlo por tu cuenta`);
      
           if (!kickuser.voice.channel) return message.channel.send(`Ese usuario no está en un canal de voz`);
              
           kickuser.voice.kick()
           message.channel.send(`kicke a \`${kickuser.user.tag}\` del canal de voz`)
     } else if(command === "eval"){
        if(message.author.id !== '690337991629209695') return message.channel.send("No tienes permiso para hacer esto")
        let limit = 1950;
          try{ 
              let code = args.join(' ');
              let evalued = eval(code);
              if (typeof evalued !== "string")
              evalued = require("util").inspect(evalued);
              let txt = "" + evalued;
              if (txt.length > limit) {
                  const embedA = new Discord.MessageEmbed()
                  .setAuthor("Evaluacion completada", client.user.displayAvatarURL)
                  .addField("Entrada", `\`\`\`js\n${args}\n\`\`\``)
                  .addField("Salida", `\`\`\`js\n ${txt.slice(0, limit)}\n\`\`\``)
                  .setColor("RANDOM")
               message.channel.send(embedA);
              } else {
                  const embedB = new Discord.MessageEmbed()
                .setAuthor("Evaluacion completada", client.user.displayAvatarURL)
                .addField("Entrada", `\`\`\`js\n${args}\n\`\`\``)
                .addField("Salida", `\`\`\`js\n ${txt}\n\`\`\``)
                .setColor("RANDOM")
                message.channel.send(embedB);
              }
          } catch (err) {
              const embed = new Discord.MessageEmbed()
              .setAuthor("Falla en la evaluacion", client.user.avatarURL)
              .addField("Entrada", `\`\`\`js\n${args}\n\`\`\``)
              .addField("Salida", `\`\`\`js\n${err}\n\`\`\``)
              .setColor("RANDOM")
            message.channel.send(embed);
              }
     } else if(command === "sleep"){
        let author = message.author.username; 
        let sleep = await marsnpm.sleep();
        const slep = new Discord.MessageEmbed()
            .setDescription(`${author} tiene sueño`)
            .setColor("RANDOM")
            .setImage(sleep)
        message.channel.send(slep)    
     } else if(command === "kill"){
            let url = await marsnpm.kill(); 
      let users =  message.mentions.users.first();
      let author = message.author.username; 
      if (!users) return message.channel.send("No puedes matar algo que no existe") 
      if (users === message.author) return message.channel.send("El suicidarse es un acto que no debes de hacer, no pienses solo en ti");
      if (users === client.user) return message.channel.send("No permitire que me mates")
       //serverinfo
        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${author} asesino a ` + users.username + ``)
        .setImage(url)
        message.channel.send(embed) 
     } else if(command === "kiss"){
        let url = await marsnpm.kiss(); 
        let users =  message.mentions.users.first();
            let author = message.author.username; 
       if (!users) return message.reply("No puedes besar al aire") 
        if (users === message.author) return message.channel.send("No te puedes besar a ti mismo, menciona a alguien mas");
          if (users === client.user) return message.channel.send("Perdon pero no puedo aceptar tu beso")
        
          let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`${author} beso a ` + users.username + ``)
          .setImage(url)
          message.channel.send(embed) 
     } else if(command === "like"){
         let like = await marsnpm.like();
         let author = message.author.username;
         let likes = new Discord.MessageEmbed()
         .setColor("RANDOM")
         .setDescription(`A ${author} le gusta eso`)
         .setImage(like)
         message.channel.send(likes)
     } else if(command === "cry"){
         let cry = await marsnpm.cry();
         let author = message.author.username; 
         let llora = new Discord.MessageEmbed()
         .setColor("RANDOM")
         .setDescription(`${author} no aguanta la ganas de llorar`)
         .setImage(cry)
         message.channel.send(llora)
     } else if(command === "wallpaper"){
        let wallpaper = await akaneko.mobileWallpapers()
        const embed = new Discord.MessageEmbed()
        .setImage(wallpaper)
        .setTimestamp()
        .setColor("RANDOM")
        message.channel.send(embed)
     } else if(command === "wallpaperpc"){
        let wallpaper = await akaneko.wallpapers()
        const embed = new Discord.MessageEmbed()
        .setImage(wallpaper)
        .setTimestamp()
        .setColor("RANDOM")
        message.channel.send(embed)
     } else if(command === "slap"){
        let mention = message.mentions.members.first();
        let author = message.author.username;
     if (!mention) return message.reply("No puedes cachetear al aire") 
     if (mention === message.author) return message.channel.send("No se debe que hacer daño a si mismo");
     if (mention === client.user) return message.channel.send("Perdon pero no permetire que me hagas daño")
         
     neko.sfw.slap().then(neko => { 
         const embed = new Discord.MessageEmbed()
         .setColor("RED")
         .setDescription(`${author} cacheteo a ${mention.displayName}`)
         .setImage(neko.url) 
         message.channel.send(embed) 
        })
     } else if(command === "baka"){ //baka 
        let mention = message.mentions.members.first();
        let author = message.author.username;
        if (!mention) return message.channel.send("Quien es un baka?")
        neko.sfw.baka().then(neko => {
            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`${author} le dice baka a ${mention.displayName}`)
            .setImage(neko.url) 
            message.channel.send(embed) 
           })
     } else if(command === "invite"){ //invite 
       const invite = new Discord.MessageEmbed()
       .setColor("BLUE")
       .setAuthor(client.user.username, client.user.avatarURL())
       .setDescription("[Invitame](https://discord.com/api/oauth2/authorize?client_id=787114153374122036&permissions=8&scope=bot)")
       .addField("Gracias", "Muchas gracias por usar este bot")
       message.channel.send(invite);
     } else if(command === "neko"){ //neko 
      let neko = await akaneko.neko();
      if(!message.channel.nsfw) { return message.channel.send("Este no es un comando nsfw, pero se debe que usar en uno, agunas veses sale contenido inapropiado") }
      const embed = new Discord.MessageEmbed()
      .setImage(neko)
      .setColor("RANDOM")
      .setTimestamp()
      message.channel.send(embed)
     } else if(command === "ping"){ //ping xD
      message.channel.send("Calculando <a:cargando:777593165959397396>")
      .then(m => {
          m.edit(` Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\``);
      });
     }  else if(command === "fade"){ //fade
      let userm = message.mentions.users.first() || message.author; 

      let avatar = userm.displayAvatarURL({dynamic: false, format: 'png', size: 2048}) 
      
      let imagen = await marsnpm.fade(avatar); 
      
      let fade = new Discord.MessageAttachment(imagen, "fade.png") 
      
      message.channel.send(fade);
     } else if(command === "thisis"){ //thisis
      let user = message.mentions.users.first() || message.author; 

      let avatar = user.displayAvatarURL({dynamic: false, format: 'png', size: 2048}) 
      
      let imagen = await marsnpm.thisis(avatar); 
      
      let thisis = new Discord.MessageAttachment(imagen, "thisis.png") 
      
      message.channel.send(thisis);
     } else if(command === "wasted"){ //wasted
      let userm = message.mentions.users.first() || message.author; 

      let avatar = userm.displayAvatarURL({dynamic: false, format: 'png', size: 2048}) 
      
      let imagen = await marsnpm.wasted(avatar); 
      
      let wasted = new Discord.MessageAttachment(imagen, "wasted.png") 
      
      message.channel.send(wasted); 
     } else if(command === "rip"){ //rip
       let userm = message.mentions.users.first() || message.author; 
       let avatar = userm.displayAvatarURL({dynamic: false, format: `png`, size: 2048})
       let rip = await marsnpm.rip(avatar);
       let ripi = new Discord.MessageAttachment(rip, "rip.png")
       message.channel.send(ripi)
     } else if(command === "grey"){ //grey
       let userm = message.mentions.users.first() || message.author;
       let avatar = userm.displayAvatarURL({format: `png`, dynamic: false, size: 2048})
       let grey = await marsnpm.grey(avatar)
       let gre = new Discord.MessageAttachment(grey)
       message.channel.send(gre)
     } else if(command === "sniper"){ //sniper
       let userm = message.mentions.users.first() || message.author;
       let avatar = userm.displayAvatarURL({dynamic: false, format: `png`, size: 2048})
       let sniper = await marsnpm.sniper(avatar);
       let snipe = new Discord.MessageAttachment(sniper, `sniper${userm}.png`)
       message.channel.send(snipe)
     } else if(command === "susto"){ //trash
       let userm = message.mentions.users.first() || message.author;
       let avatar = userm.displayAvatarURL({dynamic: false, format: `png`})
       let sus = await marsnpm.susto(avatar)
       let susto = new Discord.MessageAttachment(sus, `rainbow.png`)
       message.channel.send(susto)
     } else if(command === "trash"){
       let userm = message.mentions.users.first() || message.author;
       let avatar = userm.displayAvatarURL({format: `png`, dynamic: false})
       let tra = await marsnpm.basura(avatar);
       let trash = new Discord.MessageAttachment(tra, `trash.png`)
       message.channel.send(trash)
     } else if(command === "bugreport"){ //bugreport
      let channel = client.channels.cache.get('775505367404511254');
      let user = message.author;
      let reporte = args.join(' ');
      if(!reporte) return message.channel.send(`No puedes mandar un reporte basio`) 
      const embed = new Discord.MessageEmbed()
       .setTitle('Nuevo reporte o sugerencia')
       .setDescription('`Gracias por ayudar a este bot`')
       .setDescription(reporte)
       .setThumbnail(`https://cdn.discordapp.com/attachments/763879628451610664/791393404276834334/111890.gif`)
       .setColor("RANDOM")
       .setFooter('Reporte enviado por '+ message.author.username)
    
      channel.send(embed)
      message.channel.send("Reporte o sugerencia enviado con exito")
      message.channel.send(embed).then(m => m.delete({ timeout: 10000 }))
     } else if(command === "hug"){ //hug
       let mencion = message.mentions.users.first()
       if(!mencion) return message.channel.send("A quien quieres abrazar?")
       if(mencion === message.author) return message.channel.send("No te puedes abrazar a ti mismo si quieres me puedes abrazar")
       let author = message.author.username;
       let respuestas = ["abraza con ternura a", "abrazo a", "consuela en sus brazos a"]
       let selector = respuestas[Math.floor(respuestas.length * Math.random())];
       const hug = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setImage(star.hug())
       .setDescription(`${author} ${selector} ${mencion.tag}`)
       message.channel.send(hug)
     } else if(command === "lick"){ //lick
      let mention = message.mentions.members.first();
      let author = message.author.username;
     if (!mention) return message.reply("A quien quieres lamer") 
     if (mention === message.author) return message.channel.send("No es un gato pala lamerse solo");
     if (mention === client.user) return message.channel.send("No me babies")
     let random = ["Lambio a", "babio a"]
     let select = random[Math.floor(random.length * Math.random())];
     const lick = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setImage(star.lick())
     .setDescription(`${author} ${select} ${mention}`)
     message.channel.send(lick)
     } else if(command === "confused"){ //confused
       let random = ["No entiende que pasa", "Esta confundido", "No tiene ni la mas minima idea"]
       let select = random[Math.floor(random.length * Math.random())];
       const author = message.author.username;
       const embed = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setImage(star.confused())
       .setDescription(`${author} ${select}`)
       message.channel.send(embed)
     } else if(command === "blush"){ //blush 
       const autor = message.author.username;
       const blush = new Discord.MessageEmbed()
       .setDescription(`${autor} se ha sonrojado`)
       .setColor("RANDOM")
       .setImage(star.blush())
       message.channel.send(blush)
     } else if(command === "8ball"){ //8ball
       const ball = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setDescription("Debes que poner una pregunta o contenido")
       .setFooter(client.user.tag, client.user.displayAvatarURL())
       .setTimestamp();
       if(!args.join(" ")) return message.channel.send(ball)
       let respuestas = ["Si", "No", "Probablemente", "No creo", "Creo que si", "Tal vez", "Puede ser"]
       let selector = respuestas[Math.floor(respuestas.length * Math.random())];
       const ocho = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .addField("Su pregunta", `${args.join(" ")}`)
       .addField("Mi respuesta", `${selector}`) 
       .setFooter(client.user.tag, client.user.displayAvatarURL())
       .setTimestamp();
       message.channel.send(ocho)
     } else if(command === "botinfo"){ //botinfo
       let seconds = Math.floor(message.client.uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

       seconds %= 60;
       minutes %= 60;
       hours %= 24;
      const boti = new Discord.MessageEmbed()
      .setAuthor("Rei", client.user.avatarURL())
      .setColor("BLUE")
      .setThumbnail("https://media.tenor.com/images/fa5772fcf992d074374b7c83ad8825dc/tenor.gif")
      .addField("Desarollador", "أنا أɐƃoʎɹحب#2829")
      .addField("Prefix", `${prefix}`)
      .addField("Servidores", `${client.guilds.cache.size}`)
      .addField("Usuarios", `${client.users.cache.size}`)
      .addField("Uptime", `${days} dias, ${hours} horas, ${minutes} minutos, ${seconds} segundos `)
      .addField("RAM", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
      .addField("Lenguaje", "JavaScript")
      .addField("Libreria", "Discord.js v12.5.1")
      .setTimestamp()
      message.channel.send(boti)
     } else if(command === "help"){ //help
       const helpn = new Discord.MessageEmbed()
       .setAuthor("Rei", client.user.avatarURL())
       .setColor("BLUE")
       .setThumbnail("https://i.imgur.com/9Z2ZvtS.gif")
       .setDescription(`Estas son las categorias que tengo puedes usar \`${prefix}help [categoria]\` para poder ver los comandos de cada categoria`)
       .addField("imagenes", "comandos de manipulacion de imagenes o de edicion de los avatar de los usuarios")
       .addField("reaccion", "comandos de reaccion y/o interracion")
       .addField("informacion", "comandos que proporcionan la informacion de canales, roles, etc.")
       .addField("otros", "Otros comandos que no ce en que categoria poner")
       .addField("admin", "Comandos de moderacio/administracion")
       .addField("bot", "Comandos de informacion del bot")
       .setTimestamp()
       .setFooter("por: أنا أɐƃoʎɹحب#1416")
       const reaccion = new Discord.MessageEmbed()
       .setAuthor("Rei", client.user.avatarURL())
       .setColor("BLUE")
       .setThumbnail("https://i.imgur.com/jeyFxWz.gif")
       .setDescription("Estos son los comandos de reaccion con los que cuento")
       .addField("hug", "Abraza a alguien")
       .addField("kiss", "Besa al usuario mencionado")
       .addField("slap", "Abofetea a alguien")
       .addField("blush", "Demuestra que estas sonrojad@")
       .addField("confused", "Demuestra que estas confundid@")
       .addField("love", "Mide el amor entre tu y otro usuario")
       .addField("kill", "Mata a alguien")
       .addField("lick", "Lambe a alguien")
       .setTimestamp()
       .setFooter("Los embed todabia no se an terminado por completo")
       const Imagenes = new Discord.MessageEmbed()
       .setAuthor("Rei", client.user.avatarURL())
       .setColor("BLUE")
       .setThumbnail("https://i.imgur.com/mi09FYg.gif")
       .setDescription("Estos son los comandos de imagenes con los que cuento")
       .addField("wallpaper", "Muestra un wallpaper para movil")
       .addField("wallpaperpc", "Muestra un wallpaper para pc")
       .addField("neko", "Muestra una imagen de una neko")
       .addField("wasted", "Muestra tu avatar o el de otro usuaro con la palabra wasted")
       .addField("thisis", "Mh pues, esto es")
       .addField("fade", "dale un efecto a tu avatar")
       .addField("sniper", "Muestra tu avatar o el de otro user atraves de una mira")
       .setTimestamp()
       .setFooter("Los embed todabia no se an terminado por completo")
       const info = new Discord.MessageEmbed()
       .setAuthor("Rei", client.user.avatarURL())
       .setColor("BLUE")
       .setThumbnail("https://i.imgur.com/BkoXxHa.gif")
       .setDescription("Estos son los comandos de informacion que tengo")
       .addField("avatar", `Muestra el avatar de un usuarioo el de usted, puedes usar \`${prefix}avatar --s\` para ver el icono del servidor`)
       .addField("ping", "Ve el ping que tiene el bot")
       .addField("infouser", "Muestra la informacion de un usuario o la de useted")
       .addField("inforole", "Muestra la informacion de un rol por medio de mencion o id del rol")
       .addField("infochannel", "Muestra la informacion de un canal mencionado")
       .setTimestamp()
       const otros = new Discord.MessageEmbed()
       .setAuthor("Rei", client.user.avatarURL())
       .setColor("BLUE")
       .setThumbnail("https://i.imgur.com/tLavxTj.jpg")
       .setDescription("Estos son los comandos variados con los que cuento")
       .addField("ppt", "Juega piedra papel o tijeras contra el bot")
       .addField("calculate", "Calcula algo, puedes sumar, restar, multiplicar y dividir")
       .addField("emoji", "muestra la informacion de un emoji y el emoji")
       .setTimestamp()
       const admin = new Discord.MessageEmbed()
       .setAuthor("Rei", client.user.avatarURL())
       .setColor("BLUE")
       .setThumbnail("https://i.imgur.com/AbD48FH.gif")
       .setDescription("Estos son los comandos de administracion con los que cuento")
       .addField("addrole", "Da un rol a usuario que este debajo de mi jerarquia mas alta")
       .addField("removerole", "Quitale un rol a un usuario que esta debajo de mi jerarquia mas alta")
       .addField("cooldown", "Pon el modo pausado  en un chat")
       .addField("vkick", "Desconecta a un usuario de un canal de voz")
       .setTimestamp()
       const ownebot = new Discord.MessageEmbed()
       .setAuthor("Rei", client.user.avatarURL())
       .setColor("BLUE")
       .setThumbnail("https://i.imgur.com/AbD48FH.gif")
       .setDescription("Estos son los comandos que solo mi creador puede usar")
       .addField("eval", "Evalua un comando en js")
       .addField("botavatar", "Cambia el avatar del bot")
       .addField("test", "testea un comando, sug, mute, etc")
       .setTimestamp()
       const botem = new Discord.MessageEmbed()
       .setAuthor("Rei", client.user.avatarURL())
       .setColor("RANDOM")
       .setThumbnail("https://i.imgur.com/AbD48FH.gif")
       .addFields(
         {
           name: "botinfo",
           value: "Muestra la informacion de el bot",
           inline: true
         },
         {
           name: "bugreport",
           value: "Reporta un bug en el bot o comandos del mismo",
           inline: true
         }
       )
       .setTimestamp()
     if(args[0] === "reaccion") return message.channel.send(reaccion)
     if(args[0] === "imagenes") return message.channel.send(Imagenes)
     if(args[0] === "informacion") return message.channel.send(info)
     if(args[0] === "admin") return message.channel.send(admin)
     if(args[0] === "otros") return message.channel.send(otros)
     if(args[0] === "bot") return message.channel.send(botem)
     if(args[0] === "owner") {
        if (message.author.id !== '690337991629209695') {
          return message.channel.send("No tienes permiso para esto")
        }
      return message.channel.send(ownebot)
      }
     message.channel.send(helpn)
    } else if (command === "buscaminas") { //buscamina
      const choices = ["||:zero:||", "||:one:||", "||:two:||", "||:three:||", "||:four:||", "||:five:||", "||:six:||", "||:seven:||", "||:eight:||","||:bomb:||"];
   const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
   const bomb = 9; 
   let bombas = 16; 
   
   let row = number[Math.floor(Math.random() * number.length)]; 
   let column = number[Math.floor(Math.random() * number.length)]; 
   
   var buscaminas=new Array(10); 
 
   for (let i = 0; i < 10; i++){
     buscaminas[i]=new Array(10); 
   }
 
   for (let i = 0; i<10; i++){
     for (let j = 0; j<10 ;j++){
       buscaminas[i][j] = 0;		
     }
   }
   while (bombas != 0) { 
     while(buscaminas[row][column]==9){ 
         row = number[Math.floor(Math.random() * number.length)]; 
         column = number[Math.floor(Math.random() * number.length)];
     }
       bombas = bombas-1;
       buscaminas[row][column] = 9;
     
      let iteri = 3; 
 
     for (let i = 0; i < iteri; i++) {
       let iterj = 3; 
       if (row == 0 && i == 0)
         i++; 
       if (row == 10 - 1 && i == 0)
         iteri--; 
       for (let j = 0; j < iterj; j++) {
         if (column == 0 && j == 0)
           j++; 
         if (column == 10 - 1 && j == 0)
           iterj--;
         if (i != 1 || j != 1)
           if (buscaminas[row + i - 1][column - 1 + j] != bomb) 
             buscaminas[row + i - 1][column - 1 + j]++; 
       }
     }
       
     }
   
   for (let i = 0; i<10; i++){
     for (let j = 0; j<10;j++){
         buscaminas[i][j] = choices[buscaminas[i][j]];
     }
   }
   
   return message.channel.send(buscaminas);
 } else if (command === "emoji") {
  let emojiProvided = args[0];
  if (!emojiProvided) {
    const noemoji = new Discord.MessageEmbed()
    .setDescription("Pon algun emoji")
    .setColor("BLUE")
      return message.channel.send(noemoji)
  }
  const match = emojiProvided.match(/<:[a-zA-Z0-9_-]+:(\d{18})>/) || emojiProvided.match(/<a:[a-zA-Z0-9_-]+:(\d{18})>/);
  if (!match || !match[1]) {
    const ivemoji = new Discord.MessageEmbed()
    .setDescription("Pon un emoji valido")
    .setColor("RANDOM")
    return message.channel.send(ivemoji)
  }
  let emoji = message.guild.emojis.cache.get(match[1]);
  if (!emoji) {
    const nremoji = new Discord.MessageEmbed()
    .setDescription("No pude reconoser el emoji")
    .setColor("RED")
    return message.channel.send(nremoji)
  }
  const iemoji = new Discord.MessageEmbed()
  .setTitle("Informacion sobre el emoji")
  .addField(`Nombre`, `${emoji.name} : <:${emoji.identifier}:>`)
  .addField("ID", emoji.id)
  .addField("Es animado?", emoji.animated ? "Si" : "No")
  .setImage(emoji.url)
  .addField("Creado el", formatDia('DD/MM/YYYY, a las HH:mm:ss', emoji.createdAt))
  .setColor("RANDOM")
  .setTimestamp()
  message.channel.send(iemoji)
} else if(command === "ban") {
  const embed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL({format: "png", dynamic: true}))
  .setFooter(message.guild.name, message.guild.iconURL())
  if(!message.member.hasPermission("BAN_MEMBERS")){
    embed.setDescription("No tienes permisos")
    embed.setColor("RED")
    return message.channel.send(embed)
  }
  if(!args[0]) {
    embed.setDescription("Debes que mencionar o espesificar algun usuario")
    embed.setColor("RED")
    return message.channel.send(embed)
  }
  let member = message.mentions.members.first() || message.guild.members.resolve(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0]) || await client.users.fetch(args[0])
  if(!member || member.id === message.author.id) { 
    embed.setDescription("Espesifica un usuario que no seas tu")
    embed.setColor("RED")
    return message.channel.send(embed)
  }
  if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    embed.setDescription("No tengo permisos requiero \`BAN_MEMBERS\`")
    embed.setColor("RED")
    return message.channel.send(embed)
  }
  if (message.guild.members.resolve(member.id)) {
    if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
      embed.setDescription("No puedes banea a alguien con un rol mas alto que tu")
      embed.setColor("RED")
      return message.channel.send(embed)
    }
    if (!member.bannable) {
      embed.setDescription("No puedo banear a ese usario, revisa mi jerarquia")
      embed.setColor("RED")
      return message.channel.send(embed)
    }
  }
  let razon = args.slice(1).join(" ") ? args.slice(1).join(" ") : "No se dio alguna razon"
  message.guild.members.ban(member.id, { reason: razon })
  embed 
  .setAuthor(message.guild.name, message.guild.iconURL())
  .setThumbnail(!!member.user ? member.user.displayAvatarURL({dynamic: true}) : member.displayAvatarURL({dynamic: true}))
  .setTitle("Usuario baneado con exito")
  .addField("> Usuario baneado:", !!member.user ? member.user.tag : member.tag)
  .addField("> Razon:", razon)
  .setColor("BLUE")
  .setTimestamp()
  if (!!member.user) member.user.send(embed).catch(e => e);
  message.channel.send(embed)
}  else if (command === "pack") {
  message.channel.send(`${message.author} chupela`)
} else  if (command === "cum") {
  let gifs = ["https://i.imgur.com/qmPmOZ3.gif","https://i.imgur.com/OcZZSLQ.gif","https://i.imgur.com/W7OGCiA.gif","https://i.imgur.com/UGkeAO9.gif","https://i.imgur.com/brYSEFk.gif","https://i.imgur.com/8aZhHvz.gif","https://i.imgur.com/RJGGWmR.gif"]
  let img = gifs[Math.floor(gifs.length * Math.random())]
  let users = message.mentions.users.first();
  let author = message.author;
  if(!message.channel.nsfw) return message.channel.send("Usa este comando en una sala NSFW")
  if(users === client.user) return message.channel.send("No lo hagas en mi")
  if(users === message.author) return message.channel.send("No te puedes venir en ti mismo")
  if (!users) {
      const cump = new Discord.MessageEmbed()
      .setDescription(`${author} se a venido`)
      .setColor("RANDOM")
      .setImage(img)
      return message.channel.send(cump)
  }
  const cum = new Discord.MessageEmbed()
  .setDescription(`${author} se vino en ${users}`)
  .setColor("RANDOM")
  .setImage(img)
  message.channel.send(cum)
 } else if(command === "sorteo") {
  if(!message.guild) return;
  var time = ``;
  var time2 = ``;
  var time3 = ``;
  const embedf = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("Error")
  if(!message.member.hasPermission(["ADMINISTRATOR", "KICK_MEMBERS", "MANAGE_MESSAGES"]))  {
      embedf.setDescription("No tienes permisos para hacer esto")
      return message.channel.send(embedf)
  }
  if (message.content === `${prefix}sorteo`) {
      embedf.setDescription("Pon la duracion y objeto a sortear")
      return message.channel.send(embedf)
  }
  if (message.content !== `${prefix}sorteo`) {
      const stated_duration_hours = message.content.split(' ')[1];
      const stated_duration_hours2 = stated_duration_hours.toLowerCase();
      if (stated_duration_hours2.includes('s')) {
          var time = 's';
      }
      if (stated_duration_hours2.includes('m')) {
          var time = 'm';
      }
      if (stated_duration_hours2.includes('h')) {
          var time = 'h';
      }
      if (stated_duration_hours2.includes('d')) {
          var time = 'd';
      }
      const stated_duration_hours3 = stated_duration_hours2.replace(time, '');
      if (stated_duration_hours3 === '0') {
          message.channel.send(`El tiepo debe que ser mayor o igual a 1s`);
      }
      if (isNaN(stated_duration_hours3)) {
          message.channel.send(`La duración debe ser una variable de tiempo válida`);
      }
      if (stated_duration_hours3 > 1) {
          var time3 = 's';
      }
      if (time === 's') {
          var actual_duration_hours = stated_duration_hours3 * 1000;
          var time2 = 'segundo';
      }
      if (time === 'm') {
          var actual_duration_hours = stated_duration_hours3 * 60000;
          var time2 = 'minuto';
      }
      if (time === 'h') {
          var actual_duration_hours = stated_duration_hours3 * 3600000;
          var time2 = 'hora(s)';
      }
      if (time === 'd') {
          var actual_duration_hours = stated_duration_hours3 * 86400000;
          var time2 = 'dia(s)';
      }
      if (!isNaN(stated_duration_hours3)) {
          const prize = message.content.split(' ').slice(2).join(' ');
          if (prize === '') return message.channel.send(`Ingresa un premio`);
          if (stated_duration_hours3 !== '0') {
              const embed = new Discord.MessageEmbed()
              .setTitle(`${prize}`)
              .setColor('RANDOM')
              .setDescription(`Reacciona para participar!\nDuracion: **${stated_duration_hours3}** ${time2}${time3}\nSorteado por: ${message.author}`)
              .setTimestamp(Date.now() + (actual_duration_hours))
              .setFooter('Termina a las')
              let msg = await message.channel.send(':tada: **SORTEO** :tada:', embed)
              await msg.react('🎉')
              setTimeout(() => {
                  msg.reactions.cache.get('🎉').users.remove(client.user.id)
                  setTimeout(() => {
                      let winner = msg.reactions.cache.get('🎉').users.cache.random();
                      if (msg.reactions.cache.get('🎉').users.cache.size < 1) {
                          const winner_embed = new Discord.MessageEmbed()
                          .setTitle(`${prize}`)
                          .setColor('RANDOM')
                          .setDescription(`Ganador:\nNadie entro al sorteo :(\nSorteado por: ${message.author}`)
                          .setTimestamp()
                          .setFooter('Terminó a las')
                          msg.edit(':tada: **SORTEO FINALIZADO** :tada:', winner_embed);
                      }
                      if (!msg.reactions.cache.get('🎉').users.cache.size < 1) {
                          const winner_embed = new Discord.MessageEmbed()
                          .setTitle(`${prize}`)
                          .setColor('GREEN')
                          .setDescription(`Ganador:\n${winner}\nSorteado por: ${message.author}`)
                          .setTimestamp()
                          .setFooter('Terminó a las')
                          msg.edit(':tada: **SORTEO FINALIZADO** :tada:', winner_embed);
                      }
                  }, 1000);
              }, actual_duration_hours);
          }
      }
  }
} else if(command === "infoserver") {
  const servidor = message.guild
  const inff =new Discord.MessageEmbed()
  .setTitle("Informacion del servidor")
  .setColor("RANDOM")
  .setDescription(`**${servidor.name}** (${servidor.id})`)
  .addFields(
      {
          name: "Creador",
          value: `${servidor.owner}(${servidor.ownerID})`,
          inline: false
      },
      {
          name: "Creado",
          value: formatDia("DD/MM/YYYY, a las HH:mm:ss", servidor.createdAt),
          inline: true
      },
      {
          name: "Canal afk",
          value: `${servidor.afkChannel ? `${servidor.afkChannel} (${servidor.afkChannelID})` : "No tiene un canal"}`,
          inline: true
      },
      {
        name: "Tiempo de espera",
        value: `${servidor.afkTimeout} segundos`,
        inline: true
      },
      {
          name: "Miembros",
          value: `${servidor.memberCount}`,
          inline: true
      },
      {
        name: "Maximo de miembros",
        value: `${servidor.maximumMembers}`,
        inline: true
      },
      {
          name: "Escaneo de contenido",
          value: servidor.explicitContentFilter,
          inline: true
      },
      {
          name: "Mejoras",
          value: servidor.premiumSubscriptionCount,
          inline: true
      }, 
      {
        name: "Nivel del servidor", 
        value: servidor.premiumTier,
        inline: true
      },
      {
          name: "Region",
          value: `${servidor.region}`, 
          inline: true
      },
      {
          name: "Roles",
          value: servidor.roles.cache.size, 
          inline: true
      },
      {
        name: "Canales",
        value: servidor.channels.cache.size,
        inline: true
      },
      {
        name: "Canal de reglas",
        value: servidor.rulesChannel ? `${servidor.rulesChannel}\n (${servidor.rulesChannelID})` : "No tiene canal",
        inline: true
      },
      {
          name: "Descripcion",
          value: `${servidor.description ? `${servidor.description}` : "No tiene alguna"}`,
          inline: false
      }
  ) 
  .setFooter(`${message.author.tag}`, servidor.iconURL({dynamic: true}))
  .setTimestamp()
  if(servidor.banner){
    inff.setImage(servidor.bannerURL({ format: "png", dynamic: true, size: 2048}))
  }
  if(servidor.splashURL){
    inff.setThumbnail(servidor.splashURL({format: "png", dynamic: true, size: 1024}))
  } 
  message.channel.send(inff)
} else {
   if(!command) return
   const noregister = new Discord.MessageEmbed()
   .setDescription(`El comando \`${command}\` no lo tengo registrado`)
   .setFooter(`Puedes usar ${prefix}help para ver todos mis comandos`)
   return message.channel.send(noregister)
 }
})


client.login(""); 
