const Discord = require("discord.js");
const fs = require("fs");

const { Client } = require("discord.js");

const client = new Client({ intents: 53608447 });

client.on("ready", _ => {
  console.log("Esto esta encendido :3");
  console.log(`Usuario: ${client.user.tag}`);
});

const token = fs.readFileSync("ignore/token.txt", "utf8").trim();
client.login(token);
