import { type CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("shock")
  .setDescription("let pine know your thinking about her <3");

export async function execute(interaction: CommandInteraction) {
  return interaction.reply("https://i.waifu.pics/o71ra5G.gif");
}

