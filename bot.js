// Create the configuration
var config = {
  channels: ["#openhatch"],
  server: "irc.freenode.net",
  botName: "nightlightbot",
  message: "We're sorry, we seem to have all fallen asleep. We like you a\
  lot. Can you try again in a few hours?",
  state: "OFF"
};

// Get the irc library
var irc = require("irc");

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
  channels: config.channels
});

// Listen for any message
bot.addListener("message", function (from, to, text, message) {
  if (text.indexOf(config.botName) === 0) {
    var command = text.split(' ')[1].toUpperCase();
    if ((command === "ON") || (command === "OFF")) {
      config.state = command;
    }
    return;
  }
  if (config.state === "ON") {
    bot.say(config.channels[0], config.message);
  }
});