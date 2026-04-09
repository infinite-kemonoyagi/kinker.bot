// comando inspirado en ELALDA suscribanse a su canal xdxd

const { readdirSync } = require("fs");

module.exports = {
  async loadCommands(client) {
    for (const category of readdirSync("./source/commands").filter(file => file.split(".").length === 1)) {
      if (category === "placeholder") continue;
      for (const commandName of readdirSync(`./source/commands/${category}`).filter(file => file.endsWith(".js"))) {
        const command = require(`./${category}/${commandName}`);
        client.slashCommands.set(command.name, command);
      }
    }
    await client.application?.commands.set(client.slashCommands.map(x => x));
  },
};
