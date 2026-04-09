const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "numservidores",
  description: "Numero de servidores que esta el bot",
  defaultMemberPermissions: PermissionFlagsBits.Administrator,
  requiredRoles: ["Granjeros"],

  async execute(client, interaction) {
    const page = interaction.options.getInteger("Pagina") || 1;
    const perPage = 10;

    const guilds = client.guilds.cache.map(guild => ({
      id: guild.id,
      name: guild.name,
      description: guild.description || "",
      memberCount: guild.memberCount,
    }));

    const totalPages = Math.ceil(guilds.length / perPage);
    if (page > totalPages || page < 1) {
      return interaction.reply({ content: "⚠️", ephemeral: true });
    }

    let currentPage = page - 1;

    const createEmbed = () => {
      const start = currentPage * perPage;
      const currentGuilds = guilds.slice(start, start + perPage);

      return new EmbedBuilder()
        .setTitle("Lista de servidores")
        .setColor("DarkButNotBlack")
        .setDescription(
          currentGuilds
            .map(
              (guild, index) =>
                `**${start + index + 1}.** __${guild.name}__ (${guild.id})\nMiembros: ${guild.memberCount}\nDescripcion:${guild.description}`,
            )
            .join(`\n\n`),
        )
        .setFooter({ text: `Pagina: ${currentPage + 1} / ${totalPages}` });
    };

    const createButtons = () => {
      return (
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("Previous")
            .setLabel("< Anterior")
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(currentPage === 0),
        ),
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("Next")
            .setLabel("> Siguiente")
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(currentPage === totalPages - 1),
        )
      );
    };

    const message = await interaction.reply({ embeds: [createEmbed()], components: [createButtons()] });
    const collector = message.createMessageComponentCollector({ time: 60_000 });

    collector.on("collect", async buttonInteraction => {
      if (buttonInteraction.user.id !== interaction.user.id) {
        return buttonInteraction.reply({ content: "⚠️ no puedes interactuar con esta lista", ephemeral: true });
      }

      const customID = buttonInteraction.customID;

      if (customID === "previous") {
        currentPage = Math.max(currentPage - 1, 0);
      } else if (customID == "next") {
        currentPage = Math.min(currentPage + 1, totalPages - 1);
      }

      await buttonInteraction.update({ embeds: [createEmbed()], components: [createButtons()] });
    });

    collector.on("end", async () => {
      await interaction.editReply({ components: [] });
    });
  },
};
