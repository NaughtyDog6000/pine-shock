// --- Score Management ---

import { TextChannel } from "discord.js";
import { client, userShocks } from "..";
import { config } from "../config";
import { tryCatch } from "./try-catch";

/**
 * Updates a user's score by a given amount.
 * @param userId - The ID of the user to update.
 * @param amount - The amount of shocks add to the user (can be negative).
 * @param reason - A description for the score modification hook.
 * @returns The new score.
 */
export default async function addShock(userId: string, amount: number, reason: string): Promise<number> {
    const currentScore = userShocks.get(userId) ?? 0;
    const newScore = currentScore + amount;

    const userOnline: boolean = true;
    if (userOnline) {
        const res = await tryCatch<{ success: boolean }>(async () => {
            // Simulate a network request or some async operation
            const res = await fetch("https://api.openshock.app/2/shockers/control", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "OpenShockToken": config.OPENSHOCK_KEY!,
                },
                body: JSON.stringify({
                  "shocks": [
                    {
                        "id": "bf721915-a685-4d09-be83-627cf11b8939", // !TODO!: replace hard coded shock id
                        "type": "Shock",
                        "intensity": "10",
                        "duration": "300",
                        "exclusive": true
                    }
                ],
                "customName": "RobCo Shocks"
                }),
              })
              if (!res.ok) {
                throw new Error("Failed to shock user");
              }
              const data = await res.json();

            return data;
        }, "Shock User")

        if (res.error) {
            onShockFail(userId, newScore, reason);
        }

        if (res.data) {
            onShockSuccess(userId, newScore, reason);
        }
    }
    // try and shock
    
    const newShocks = currentScore + amount;
    userShocks.set(userId, newShocks);
    return newShocks;
}

/**
 * This function is called every time a user is shocked.
 * Add your custom logic here (e.g., logging, database updates, sending messages).
 * @param userId - The ID of the user whose score was modified.
 * @param newShock - The new score of the user.
 * @param reason - A short description of why the score changed.
 */
function onShockFail(userId: string, newShock: number, reason: string): void {
    console.log(
      `[FAILED] Shock attempted for user ${userId}.`,
    );
    const logChannel = client.channels.cache.get(config.LOG_CHANNEL_ID!) as TextChannel;
    if (logChannel?.isTextBased()) {
      logChannel.send(`[FAILED] shock attempted for User <@${userId}> (${reason})\nnow adding to queue`);
    }

    console.log("TODO: Check if the ")

  }

  /**
 * This function is called every time a user is shocked.
 * Add your custom logic here (e.g., logging, database updates, sending messages).
 * @param userId - The ID of the user whose score was modified.
 * @param newShock - The new score of the user.
 * @param reason - A short description of why the score changed.
 */
function onShockSuccess(userId: string, newShock: number, reason: string): void {
    console.log(
      `Shocks updated for user ${userId}. New count: ${newShock}. Reason: ${reason}`,
    );
    const logChannel = client.channels.cache.get(config.LOG_CHANNEL_ID!) as TextChannel;
    if (logChannel?.isTextBased()) {
      logChannel.send(`User <@${userId}> score is now ${newShock} (${reason})`);
    }

    console.log("TODO: Check if the ")

  }