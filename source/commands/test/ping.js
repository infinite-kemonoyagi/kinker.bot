const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "command ping",

  async execute(client, interaction) {
    let ping = Date.now() - interaction.createdTimestamp;

    const embed = new EmbedBuilder().setColor("Red").setDescription(`ping => ${ping}`);

    interaction.reply({ embeds: [embed] });
  },
};
