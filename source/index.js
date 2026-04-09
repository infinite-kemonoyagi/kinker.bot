const Discord = require("discord.js");
const fs = require("fs");

const { Client, Collection } = require("discord.js");

const client = new Client({ intents: 53608447 });
const { loadCommands } = require("./commands/commandHelper");

require("dotenv").config();

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.slashCommands.get(interaction.commandName);
  if (!command) return;

  let args = [];

  for (const option of interaction.options.data) {
    if (option.type === 1) {
      if (option.name) args.push(option.name);

      option.options.forEach(x => {
        if (x.value) args.push(x.value);
      });
    } else if (option.value) args.push(option.value);
  }

  command.execute(client, interaction, args);
});

client.slashCommands = new Collection();

client.on("ready", async _ => {
  await loadCommands(client)
    .then(() => {
      console.log("Comandos cargados exitosamente :D");
    })
    .catch(err => {
      console.error(` ERROR al cargar comandos | ${err}`);
    });
  console.log("Esto esta encendido :3");
  console.log(`Usuario: ${client.user.tag}`);
});

client.login(process.env.TOKEN).catch(err => console.error(` ERROR | ${err}`));
