const { readdirSync } = require("fs");

module.exports = {
  async loadEvents(client) {
    for (const category of readdirSync("./source/events").filter(file => file.split(".").length === 1)) {
      for (const eventName of readdirSync(`./source/events/${category}`).filter(file => file.endsWith(".js"))) {
        const event = require(`./${category}/${eventName}`);
        if (event.once) client.once(event.name, (...args) => event.execute(...args));
        else client.on(event.name, (...args) => event.execute(...args));
      }
    }
  },
};
