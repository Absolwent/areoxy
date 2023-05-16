// BOT COLOR: #632952
const Discord = require('discord.js');
const config = require('./config.json')
const color = "#632952";
const client = new Discord.Client();
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = Discord;
const { MessageButton, MessageActionRow } = require('discord-buttons');
require('discord-buttons')(client);

// Banned words
const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `kurwa`, `chuj`, `jebany`, `debil`, `jebać`, `jebac`, `huj`, `dupe`, `dupa`, `kurwo`, `idioto`, `szmato`, `dziwko`, `rucham`, `ruchalem`, `ruchałem`, `discord gg /`]
// Banned words

const http = require("http");
const ms = require("ms");

// Auto kill
setInterval(() => {
  if (!client || !client.user) {
    console.log(datetime, "| Client not login, Process Kill")
    process.kill(1);
  }
}, ms("1m"));

// Pobieranie daty
var currentdate = new Date();
var datetime = "" + currentdate.getDate() + "/"
  + (currentdate.getMonth() + 1) + "/"
  + currentdate.getFullYear() + " "
  + currentdate.getHours() + ":"
  + currentdate.getMinutes();

client.once('ready', () => {
  console.log(datetime, "| BOT Started by https://replit.com")
  client.user.setActivity("Counter-Strike: Global Offensive", { type: "PLAYING" })
  http.createServer((_, res) => res.end("Moonsense | BOT Development site")).listen(8080)
  const P = ['\\', '|', '/', '-'];
  let x = 0;
  const loader = setInterval(() => {
    process.stdout.write(`\r${P[x++]}`);
    x %= P.length;
  }, 250);
});

// Weryfikacja
client.on("message", (message) => {
  if (message.content !== "/makemeverify") return;
  const embed = new Discord.MessageEmbed()
    .setTitle("Weryfikacja")
    .setDescription("Witaj! Zanim odkryjesz resztę naszego discorda, proszę zweryfikuj się, wymagamy pewności że aby napewno nie chcesz zaszkodzić naszemu serwerowi. Weryfikacja powstała w celu zabezpieczenia serwera przed wszelkimi botami i innymi skradzionymi kontami discord, głównie stanowi to zabezpieczenie przed spamem, nabijaniem reakcji i wiele innych czynników źle wpływających na nasz serwer, dla tego prosimy abyś się zweryfikował(a) w celu dalszej przygody na naszym serwerze. Z góry dziękujemy za zaufanie.")
    .setColor('#3d31a8')
  let verify = new MessageButton()
    .setLabel("Zweryfikuj mnie")
    .setStyle("blurple")
    .setEmoji("✅")
    .setID("Verify")
  message.channel.send({
    button: verify,
    embed: embed
  });
})

// Regulamin
client.on("message", (message) => {
  if (message.content !== "/makemerules") return;
  const embed = new Discord.MessageEmbed()
    .setTitle("**Regulamin serwera**")
    .setDescription("§ *Ogólnie panujące zakazy*\n\n**1.** Na serwerze zakazuje się umieszczania jakich kolwiek treści +18\n**2.** Zakazuje się nadużywania wzmianek (pingu) członków oraz rekrutów drużyny Moonsense\n**3.** Zakazuje się obrażanie jakich kolwiek uczestników serwera\n**4.** Zakazuje się zamieszczania treści religijnych\n**5.** Zakazuje się poruszania tematów wrażliwych m.i.n Wiara, Poglądy etc.\n**6.** Zakazuje się omijania jakich kolwiek blokad od BOTA Discord\n**7.** Zakazuje się wykorzystywanie błędów serwera discord\n**8.** Zakazuje się prowokowanie użytkowników discorda w celu rozpętania kłótni etc.\n**9.** Zakazuje się wysyłanie zaproszeń do innych discordów\n\n§ *Informacje ogólne*\n\n**1.** Osoba która łamie regulamin nagannie zostanie ukarana banem od 7 dni do nawet pernamętnego bana.\n**2.** Osoba która zaprasza użytkowników którzy wprowadzają zły przykład dla reszty użytkowników też ma prawo zostać ukarana\n**3.** Nie przestrzeganie regulaminu jest równe z tym że w każdej chwili możemy zostać ukarani BANEM/MUTEM/KICKIEM z brakiem możliwości odwołania się od kary\n**4.** Członek drużyny decyduje o twojej karze, jeśli stwierdzi że chce zdjąć Ci karę, ma prawo to zrobić. Nie masz prawa prosić go o to.\n\nRegulamin autorstwa autora bota. Nie przeczytanie regulaminu nie zwalnia z przestrzegania\n©️ Moonsense 2022-2023")
    .setColor("RED")
  message.channel.send({
    embed: embed
  });
})

client.on('clickButton', async (button) => {
  if (button.id !== "Verify") return;
  button.reply.send('Pomyślnie zostałeś(aś) zweryfikowany(a) Miłej zabawy!', true)
  const role = button.guild.roles.cache.get("1059541756342968361")
  const member = button.clicker.member
  await member.roles.add(role)
  const name = member.user.tag;
  console.log(datetime + " | " + name, "Zweryfikował się")
})

// Anti invite
client.on(`message`, async message => {
  try {
    if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
      if (message.author.id === message.guild.ownerID) return;
      await message.delete();
    }
  } catch (e) {
    console.log(e);
  }
});

client.login(process.env.TOKEN)