/**
 * Player Sleep Plugin - Enables 50% or 1 Player to sleep for everyone!
 *       Github: @BRadHoc/bdsx-sleep  Discord: @Brad (BDSX)
 */

"use strict";

let OnePlayerSleep = false;


Object.defineProperty(exports, "__esModule", { value: true });
const { bedrockServer } = require("bdsx/launcher");
const { events } = require("bdsx/event");
const { ServerPlayer } = require("bdsx");
const { procHacker } = require("bdsx/bds/proc");
const { void_t, bool_t } = require("bdsx/nativetype");
const command = require("bdsx/commandresult");

console.log('[@BRadHoc/bdsx-sleep] Successfully loaded plugin');
events.serverOpen.on(() => {
    console.log('[@BRadHoc/bdsx-sleep] ' + (OnePlayerSleep ? "Setting: One Player Sleep (Enabled)" : "Setting: 50% of online players are required to sleep"));
});

let sleepRemind = true;
let wakeUp = procHacker.js('?stopSleepInBed@ServerPlayer@@UEAAX_N0@Z', void_t, {this: ServerPlayer}, bool_t, bool_t);
events.playerSleepInBed.on((ev) => {
    setTimeout(() => {
        if (ev.player.isSleeping()) {

            const players = bedrockServer.level.getPlayers();
            const sleepingPlayers = players.filter((player) => player.isSleeping()).length;

            if (sleepRemind) {
                sleepRemind = false;
                if (!OnePlayerSleep) {
                    bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§bThere are ${sleepingPlayers}/${players.length} players in-bed."}]}`, () => { });
                    bedrockServer.executeCommand('tellraw @a {"rawtext":[{"text":"§b' + (!OnePlayerSleep ? "50% of the players online are required to sleep." : ev.player.getNameTag().toString() + " just slept for everyone...") + '"}]}', () => { });
                }
                setTimeout(() => { sleepRemind = true; }, 30000);
            }

            setTimeout(() => {
                if (sleepingPlayers >= players.length / 2 || OnePlayerSleep) {
                    if (ev.player.isSleeping()) {
                        for (let x = 0; x < players.length; x++) {
                            if (players[x].isPlayer()) {
                                if (players[x].isSleeping()) {
                                    wakeUp.call(players[x], true, true);
                                }
                                let reset = players[x].save();
                                reset.SleepTimer._value = 0;
                                players[x].load(reset);
                            }
                        }

                        const com = bedrockServer.executeCommand("time query daytime", command.CommandResultType.OutputAndData);
                        const time = parseInt(com.data.statusMessage.substring(11));
                        const t_offset = (23999-time);
                        bedrockServer.executeCommand(`time add ${t_offset}`);

                        if (OnePlayerSleep) bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§b${ev.player.getNameTag()} just slept for everyone!"}]}`, () => { });
                        bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§aGood Morning!"}]}`, () => { });
                    }
                }
            }, 2000);
        }
    }, 2000);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUFvQztBQUVwQyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFFNUMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRSxFQUFFO0lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUMsQ0FBQztBQUVILGNBQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUUsRUFBRTtJQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFDLENBQUMifQ==