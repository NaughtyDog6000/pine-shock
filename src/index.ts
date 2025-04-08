import { Client } from "discord.js";
import { deployCommands } from "./scripts/deploy-commands";
import { commands } from "./commands";
import { config } from "./config";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", () => {
    console.log("Discord bot is starting...");
        
    console.log("Discord bot is ready! 🤖");
});

client.on("guildCreate", async (guild) => {
await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
        commands[commandName as keyof typeof commands].execute(interaction);
    }
});

console.log("Invite link: https://discord.com/api/oauth2/authorize?client_id=" + config.DISCORD_CLIENT_ID + "&permissions=139788143680&scope=bot%20applications.commands");
deployCommands({ guildId: config.TEST_GUILD_ID! });

client.login(config.DISCORD_TOKEN);