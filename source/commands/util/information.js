const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "information",
  description: "obten la informacion de Kinker Aspher",

  async execute(client, interaction) {
    const embed = new EmbedBuilder().setColor("Aqua");
    const message = fs.readFileSync("source/commands/util/information.md", "utf8");
    embed.setDescription(message);

    interaction.reply({ embeds: [embed] });
  },
};
