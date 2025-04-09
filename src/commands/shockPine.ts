import { type CommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import addShock from "../lib/shocks";

export const data = new SlashCommandBuilder()
  .setName("shock")
  .setDescription("let pine know your thinking about her <3")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user to shock")
      .setRequired(true),
  );

export async function execute(interaction: CommandInteraction) {
  console.log(interaction.options);
  const targetUser = interaction.options.get("user", true); // Get the required user option

  if (!targetUser.user) {
    await interaction.reply({
      content: "You need to specify a user to shock.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }
  if (targetUser.user?.bot) {
    await interaction.reply({
      content: "You cannot shock bots.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  if (targetUser.user.id === "435518702499397632") {
    await interaction.reply({
      content: "https://tenor.com/view/seriously-laugh-laughing-you-serious-jk-simmons-gif-6107729\n",
      // flags: MessageFlags.Ephemeral,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await interaction.followUp({
      content: "cant touch this!\nhttps://tenor.com/view/wildchild-dragon-ball-gif-27072814",
    });
    addShock(interaction.user.id, 1, `${interaction.user.username} Shocked themselves`);

    return;
  }

  if (targetUser.user.id === interaction.user.id) {
    await interaction.reply({
      content: "You little masochist :3",
      flags: MessageFlags.Ephemeral
    });
  }

  addShock(targetUser.user.id, 1, `${interaction.user.username} Shocked ${targetUser.user.username}`);

  // addShock(interaction.user.id, 1, `${interaction.user.username} Shocked Pine`);

  await interaction.reply("https://i.waifu.pics/o71ra5G.gif\n" + interaction.user.username + " shocked " + targetUser.user.username);

  return;
}
